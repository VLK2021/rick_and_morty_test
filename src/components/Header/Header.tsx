import React, {FC} from 'react';

import './HeaderStyle.css';
import logo from '../../images/logotip.jpg';


const Header: FC = () => {
    return (
        <div className={'header width flex-direction'}>
            <div className={'header-img width flex'}>
                <img src={logo} alt="logo"/>
            </div>

            <p className={'width flex'}>The Rick and Morty API</p>
        </div>
    );
};

export {Header};