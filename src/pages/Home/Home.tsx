import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import './HomeStyle.css';
import {RootState} from '../../store';
import {Character, Pagination, Search} from "../../components";
import {fetchCharacters} from "../../store/slices/character.slice";


const Home: FC = () => {
    const {results, page, inputCurrent, word, checkboxName} = useSelector((store: RootState) => store.characters);
    const dispatch = useDispatch();


    useEffect(() => {
        if (inputCurrent) {
            dispatch(fetchCharacters({page, inputCurrent}));
        } else if (word) {
            dispatch(fetchCharacters({page, word, checkboxName}));
        } else {
            dispatch(fetchCharacters({page}));
        }
    }, [dispatch, inputCurrent, page, word]);


    return (
        <div className={'home width'}>
            <div className={'home-search'}>
                <Search/>
            </div>

            <div className={'home-characters-block width'}>
                {results && results.map(obj => <Character key={obj.id} char={obj}/>)}
            </div>

            <div className={'home-pagination flex'}>
                <Pagination/>
            </div>
        </div>
    );
};

export {Home};