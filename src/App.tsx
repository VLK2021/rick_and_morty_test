import React from 'react';
import {Route, Routes } from 'react-router-dom';

import './App.css';
import {Layout} from "./layout";


function App() {

  return (
    <div className="app width">
        <Routes>
            <Route path={'/'} element={<Layout/>}>

            </Route>
        </Routes>
    </div>
  );
}

export {App};
