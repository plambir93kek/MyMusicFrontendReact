import './about.css';
import React from 'react';

const About = () => {
    return (
        <div className='about'>
            <div className='frontend'>
            <h1>
                Frontend:
            </h1>
            <ul>
                <li>React</li>
                <li>Redux, Redux-thunk</li>
                <li>SCSS</li>
                <li>Input elements - Material UI</li>
                <li>React Testing Library</li>
                <p className='git'>Git - <a href='https://github.com/plambir93kek/MyMusicFrontendReact'>
                    https://github.com/plambir93kek/MyMusicFrontendReact</a></p>
            </ul>
            </div>
            <div className='backend'>
                <h1>Backend:</h1>
                <ul>
                    <li>Nest.js</li>
                    <li>MongoDB</li>
                    <p className='git'>Git - <a href='https://github.com/plambir93kek/NestBackendMyMusic'>
                    https://github.com/plambir93kek/NestBackendMyMusic</a></p>
                </ul>
            </div>
        </div>
    )
};

export default About;