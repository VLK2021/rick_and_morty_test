import React, {FC, Suspense, useState} from 'react';
import {Outlet} from 'react-router-dom';

import './LayoutStyle.css';
import {FabComponent, Footer, Header, Spinner} from "../components";


interface LayoutProps {

}


const Layout: FC<LayoutProps> = () => {
    const [visibleFabMenu, setVisibleFabMenu] = useState<boolean>(true);


    return (
        <div className={'layout width flex-direction'}>
            <Suspense fallback={<div><Spinner/></div>}>
                <Header/>

                <div className={'layout-outlet width'}>
                    <Outlet/>
                </div>

                {visibleFabMenu && <div className={'menu'}>

                </div>}

                <FabComponent visibleFabMenu={visibleFabMenu} setVisibleFabMenu={setVisibleFabMenu}/>

                <Footer/>
            </Suspense>
        </div>
    );
};

export {Layout};