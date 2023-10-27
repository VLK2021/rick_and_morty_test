import React, {FC, useEffect} from 'react';

import './HomeStyle.css';
import {useDispatch} from "react-redux";
import {getAllCharacters} from "../../store/slices/character.slice";


const Home: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(getAllCharacters());
    }, []);



    return (
        <div className={'home width'}>
            Home
        </div>
    );
};

export {Home};