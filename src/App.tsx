import React from 'react';
import {Route, Routes} from 'react-router-dom';

import './App.css';
import {Layout} from "./layout";
import {Home, SingleCharacter} from "./pages";
import {NotFoundPage} from "./components";


function App() {

    return (
        <div className="app width">
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path={':id'} element={<SingleCharacter/>}/>
                    <Route path={'*'} element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export {App};
