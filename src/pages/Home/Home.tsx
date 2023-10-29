import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import './HomeStyle.css';
import {getAllCharacters} from "../../store/slices/character.slice";
import {RootState} from '../../store';
import {Character, Pagination, Search} from "../../components";


const Home: FC = () => {
    const {results, page} = useSelector((store: RootState) => store.characters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCharacters({page}));
    }, [page]);



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