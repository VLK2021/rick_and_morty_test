import React, {FC, Suspense, useState} from 'react';
import {Outlet} from 'react-router-dom';

import './LayoutStyle.css';
import {FabComponent, Footer, Header, HistoryComponent, HistoryListComponent, Spinner} from "../components";


interface LayoutProps {

}


const Layout: FC<LayoutProps> = () => {
    const [visibleFabMenu, setVisibleFabMenu] = useState<boolean>(false);
    const [visibleHistoryMenu, setVisibleHistoryMenu] = useState<boolean>(false);


    return (
        <div className={'layout width flex-direction'}>
            <Suspense fallback={<div><Spinner/></div>}>
                <Header/>

                <div className={'layout-outlet width'}>
                    <Outlet/>
                </div>

                {visibleHistoryMenu && <div className={'layout-history'}>
                    <HistoryListComponent setVisibleHistoryMenu={setVisibleHistoryMenu}
                                          />
                </div>}

                {visibleFabMenu && <div className={'menu'}>
                    <HistoryComponent setVisibleHistoryMenu={setVisibleHistoryMenu}
                                      setVisibleFabMenu={setVisibleFabMenu}
                    />
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