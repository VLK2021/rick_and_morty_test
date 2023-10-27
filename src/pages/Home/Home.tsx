import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import './HomeStyle.css';
import {getAllCharacters} from "../../store/slices/character.slice";
import {RootState} from '../../store';
import {Character} from "../../components";


const Home: FC = () => {
    const {results, info, count, pages, next, prev} = useSelector((store: RootState) => store.characters);

    console.log(results);
    console.log(info);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCharacters());
    }, []);


    return (
        <div className={'home width'}>
            <div className={'home-characters-block width'}>
                {results && results.map(obj => <Character key={obj.id} char={obj}/>)}
            </div>

            <div className={'home-pagination flex'}>
                PAGINATION
            </div>
        </div>
    );
};

export {Home};