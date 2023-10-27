import React from 'react';
import {Route, Routes } from 'react-router-dom';

import './App.css';
import {Layout} from "./layout";
import {Home} from "./pages";


function App() {

  return (
    <div className="app width">
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<Home/>}/>
            </Route>
        </Routes>
    </div>
  );
}

export {App};
