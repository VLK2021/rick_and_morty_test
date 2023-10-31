import React, {FC, Suspense} from 'react';
import {Outlet} from 'react-router-dom';

import './LayoutStyle.css';
import {Footer, Header, Spinner} from "../components";


const Layout: FC = () => {
    return (
        <div className={'layout width flex-direction'}>
            <Header/>

            <div className={'layout-outlet width'}>
                <Suspense fallback={<div><Spinner/></div>}>
                    <Outlet/>
                </Suspense>
            </div>

            <Footer/>
        </div>
    );
};

export {Layout};