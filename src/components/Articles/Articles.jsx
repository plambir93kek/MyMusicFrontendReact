import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import './articles.css';

let int;
//Component render the article`s slider on the main page and  full article with text
const Articles = () => {
    //define current article, to be shown in articles`s slider
    const [current, setCurrent] = useState(0);

    const articles = useSelector(state => state.articles.articles);
    const isLoadingArt = useSelector(state => state.articles.isLoading);
    const isLoadingTr = useSelector(state => state.tracks.isLoading)

    //define whether to show the full article
    const [show, setshow] = useState(false)

    //set the next article in articles`s slider
    const setNext = () => {
        clearInterval(int)
        if (current === articles.length - 1) {
            setCurrent(0)
        } else {
            setCurrent(current + 1)
        }
        
    };

    //set to show article and stops slider
    const showArticle = () => {
        clearInterval(int)
        if (!show) {
            setshow(!show)
        } else {
            setNext()
            setshow(!show)
        }
        
    };


    //sets interval of articles slider
    useEffect(() => {
        int = setInterval(() => {
            setNext()
        }, 4000);
        return ()=>{
            clearInterval(int)
        }
    }, [current, articles])

    return (
        <div className='articleBox'>
            {isLoadingArt && isLoadingTr ?
                ''
                :
                <div>
                <div className='articleSlide'>
                    {articles?.map((article, index) =>
                        <CSSTransition key={index} classNames='slide' in={index === current}  timeout={500}>
                            <div className='article' style={index!==current? {opacity:'0'} : {opacity:'1'}} >
                                < img className='imgSlider' src={`https://mymusicbackendnest.herokuapp.com/image/${article?.picture}`} />
                                <div className='articleAbout'>
                                    <p>{article?.band}</p>
                                </div>
                            </div>
                        </CSSTransition>
                    )}
                </div>
            <div className='link'>
            <p className='more' onClick={showArticle}>Read more</p>
            </div>
            <CSSTransition classNames='fullArt' in={show} timeout={500} mountOnEnter unmountOnExit>
                <div className='fullArticle'>
                    <p onClick={() => { setshow(false); setNext() }} style={{ textAlign: 'right', marginTop: '0', marginBottom: '2px', cursor: 'pointer' }}>X</p>
                    <p className='textArticle'><img className='imgFull' src={`https://mymusicbackendnest.herokuapp.com/image/${articles[current]?.picture}`} />{articles[current]?.text}</p>
                </div>
            </CSSTransition>
            </div> }
        </div>
    )
};

export default Articles