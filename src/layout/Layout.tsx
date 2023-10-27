import React, {FC} from 'react';
import { Outlet } from 'react-router-dom';

import './LayoutStyle.css';
import {Footer, Header} from "../components";


const Layout: FC = () => {
    return (
        <div className={'layout width flex-direction'}>
            <Header/>

            <div className={'layout-outlet width'}>
                <Outlet/>
            </div>

            <Footer/>
        </div>
    );
};

export {Layout};