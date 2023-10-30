import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";

import './SearchStyle.css';
import {PopUp} from "../../pages";
import {characterActions, fetchCharacters} from "../../store/slices/character.slice";


const Search = () => {
    const [visible, setVisible] = useState(false);
    const [visibleCheckbox, setVisibleCheckbox] = useState(false);
    const {register, handleSubmit, setValue} = useForm();

    const [query, setQuery] = useSearchParams();
    const dispatch = useDispatch();
    const page = 1;


    useEffect(() => {
        const inputCurrent = query.get('inputCurrent');
        dispatch(fetchCharacters({page, inputCurrent}));
        dispatch(characterActions.changeName(inputCurrent));
        setValue('search', inputCurrent);
    }, [query]);


    const submit = (data: any) => {
        setQuery({inputCurrent: data.search});
    }


    const click = () => {
        setVisible(!visible);
        setValue('search', '');
        setQuery('');
    }

    const handlerCheckbox = () => {
        setVisibleCheckbox(!visibleCheckbox);
    }

    const handleOnChangeInput = (e:any) => {

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
                               placeholder={'Add key words to find'} {...register('search')} onChange={handleOnChangeInput}/>

                        <button>find</button>
                    </form>
                </div>
            }
        </div>
    );
};

export {Search};