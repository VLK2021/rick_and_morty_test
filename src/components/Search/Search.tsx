import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useSearchParams} from 'react-router-dom';

import './SearchStyle.css';
import {useDispatch} from "react-redux";
import {characterActions, searchCharacters} from "../../store/slices/character.slice";
import {PopUp} from "../../pages";


const Search = () => {
    const [visible, setVisible] = useState(false);
    const [visibleCheckbox, setVisibleCheckbox] = useState(false);
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

    const handlerCheckbox = () => {
        setVisibleCheckbox(!visibleCheckbox);
    }


    return (
        <div className={'search width flex'}>
            <div className={'search-btn flex'}>
                <button onClick={click} className={'flex'}>{visible ? 'remove filter' : 'filter'}</button>
            </div>

            {
                visible &&
                <div className={'search-second flex'}>
                    <button className={'select'} onClick={handlerCheckbox}>Вибрати опції</button>

                    {visibleCheckbox && <PopUp setVisibleCheckbox={setVisibleCheckbox} visibleCheckbox={visibleCheckbox}/>}

                    <form onClick={handleSubmit(submit)}>
                        <input type="text" defaultValue={''}
                               placeholder={'Add key words to find'} {...register('search')}/>

                        <button>find</button>
                    </form>
                </div>
            }
        </div>
    );
};

export {Search};