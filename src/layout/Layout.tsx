import React, {FC, Suspense, useState} from 'react';
import {Outlet} from 'react-router-dom';

import './LayoutStyle.css';
import {FabComponent, Footer, Header, HistoryComponent, Spinner} from "../components";


interface LayoutProps {

}


const Layout: FC<LayoutProps> = () => {
    const [visibleFabMenu, setVisibleFabMenu] = useState<boolean>(true);
    const [visibleHistoryMenu, setVisibleHistoryMenu] = useState<boolean>(true);


    return (
        <div className={'layout width flex-direction'}>
            <Suspense fallback={<div><Spinner/></div>}>
                <Header/>

                <div className={'layout-outlet width'}>
                    <Outlet/>
                </div>

                {visibleHistoryMenu && <div className={'layout-history'}>

                </div>}

                {visibleFabMenu && <div className={'menu'}>
                    <HistoryComponent visibleHistoryMenu={visibleHistoryMenu} setVisibleHistoryMenu={setVisibleHistoryMenu}/>
                </div>}

                <FabComponent visibleFabMenu={visibleFabMenu}
                              setVisibleFabMenu={setVisibleFabMenu}
                              setVisibleHistoryMenu={setVisibleHistoryMenu}
                />

                <Footer/>
            </Suspense>
        </div>
    );
};

export {Layout};