import React from 'react';

import './FooterStyle.css';
import logoFooter from '../../images/logofooter.png';
import git from '../../images/git.png';
import twitter from '../../images/twitter.png';


const Footer = () => {
    return (
        <div className={'footer width flex-direction'}>
            <div className={'footer-text width  flex-direction'}>
                <p>performed as part of test</p>
                <p>case for the company</p>
            </div>

            <div className={'footer-logo width flex'}>
                <img src={logoFooter} alt="logo"/>
            </div>

            <div className={'footer-links width flex'}>
                <div>
                    <a href={'https://github.com/'} target={'_blank'}>
                        <img src={git} alt="link"/>
                    </a>
                </div>

                <div className={'footer-links-twitter'}>
                    <a href={'https://github.com/'} target={'_blank'}>
                        <img src={twitter} alt="link"/>
                    </a>
                </div>

                <div>
                    <a href={'https://github.com/'} target={'_blank'}>
                        <img src={git} alt="link"/>
                    </a>
                </div>
            </div>

            <div className={'footer-year width flex'}>
                <p>2023</p>
            </div>
        </div>
    );
};

export {Footer};