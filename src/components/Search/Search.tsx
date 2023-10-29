import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useSearchParams} from 'react-router-dom';

import './SearchStyle.css';
import {useDispatch} from "react-redux";
import {characterActions, searchCharacters} from "../../store/slices/character.slice";


const Search = () => {
    const [visible, setVisible] = useState(false);
    const {register, handleSubmit, setValue} = useForm();

    const [query, setQuery] = useSearchParams();
    const dispatch = useDispatch();
    const page = 1;


    useEffect(() => {
        const name = query.get('name');
        dispatch(searchCharacters({page, name}));
        dispatch(characterActions.changeName(name));
        setValue('search', name);
    }, [query]);


    const submit = (data: any) => {
        setQuery({name: data.search});
    }


    const click = () => {
        setVisible(!visible);
        setValue('search', '');
        setQuery('');
    }

    return (
        <div className={'search width flex'}>
            <div className={'search-btn flex'}>
                <button onClick={click} className={'flex'}>{visible ? 'remove filter' : 'filter'}</button>
            </div>

            {
                visible &&
                <div className={'search-second flex'}>
                    <select>
                        <option value="">Character</option>
                        <option value="">Location</option>
                        <option value="">Episodes</option>
                    </select>

                    <form onChange={handleSubmit(submit)}>
                        <input type="text" defaultValue={''}
                               placeholder={'Add key words to find'} {...register('search')}/>
                    </form>

                    <button>find</button>
                </div>
            }


        </div>
    );
};

export {Search};