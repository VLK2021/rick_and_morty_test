import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import './HomeStyle.css';
import {getAllCharacters} from "../../store/slices/character.slice";
import {RootState} from '../../store';
import {Character, Pagination} from "../../components";


const Home: FC = () => {
    const {results, info, count, pages, page} = useSelector((store: RootState) => store.characters);
    console.log(results);
    console.log(info);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCharacters({page}));
    }, []);


    return (
        <div className={'home width'}>
            <div className={'home-characters-block width'}>
                {results && results.map(obj => <Character key={obj.id} char={obj}/>)}
            </div>

            <div className={'home-pagination flex'}>
                <Pagination count={count}/>
            </div>
        </div>
    );
};

export {Home};