import React, {FC, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";

import './SearchStyle.css';
import {PopUp} from "../../pages";
import {characterActions, fetchCharacters} from "../../store/slices/character.slice";


interface FormData {
    search: string;
}


const Search: FC = () => {
    const [visible, setVisible] = useState(false);
    const [visibleCheckbox, setVisibleCheckbox] = useState(false);

    const {register, handleSubmit, setError, trigger, clearErrors, setValue,
        formState: {errors, isValid}} = useForm<FormData>({mode: "onBlur"});

    const [query, setQuery] = useSearchParams();
    const dispatch = useDispatch();
    const page = 1;


    useEffect(() => {
        const inputCurrent: any = query.get('inputCurrent');
        dispatch(fetchCharacters({page, inputCurrent}));
        dispatch(characterActions.changeName(inputCurrent));

        setValue('search', inputCurrent);
    }, [dispatch, query, setValue]);


    const submit = (data: FormData) => {
        if (isValid) {
            setQuery({ inputCurrent: data.search });
        } else {
            setError('search', {
                type: 'manual',
                message: 'Помилка вводу даних!',
            });
        }
//працюємо з localStorage закидуємо дані
        const dataInputSearchLS = localStorage.getItem('inputSearchLS');
        if (dataInputSearchLS) {
            const dataInputSearchLSArr = JSON.parse(dataInputSearchLS) ;
            dataInputSearchLSArr.push(data.search);
            localStorage.setItem('inputSearchLS', JSON.stringify(dataInputSearchLSArr));
        } else {
            const dataInputSearchLSArrNew = [];
            dataInputSearchLSArrNew.push(data.search);
            localStorage.setItem('inputSearchLS', JSON.stringify(dataInputSearchLSArrNew));
        }
    };



    const click = () => {
        setVisible(!visible);
        setValue('search', '');
        setQuery('');
        dispatch(characterActions.changeWord(''));
        clearErrors('search');
    }

    const handlerCheckbox = () => {
        setVisibleCheckbox(!visibleCheckbox);
    }

    const handleOnChangeInput = (e: any) => {
        trigger('search');
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

                    {visibleCheckbox &&
                    <PopUp setVisibleCheckbox={setVisibleCheckbox} visibleCheckbox={visibleCheckbox}/>}

                    <form onClick={handleSubmit(submit)}>
                        <input type="text" defaultValue={''}
                               {...register('search',
                                   {
                                       required: 'Поле має бути заповнене!',
                                       minLength: {
                                           value: 2,
                                           message: 'мінімальна довжина імені 2 символи!'
                                       },
                                       maxLength: {
                                           value: 20,
                                           message: 'максимальна довжина 20 символів!'
                                       },
                                       pattern: {
                                           value: /^[a-zA-Z]+$/,
                                           message: 'Можна вводити лише літери латиниці!'
                                       }
                                   })}
                               placeholder={'Add key words to find'}
                               onChange={handleOnChangeInput}/>

                        <button disabled={!isValid}>find</button>
                        <div className={'error flex'}>
                            {errors?.search && <p>{errors?.search.message || 'Error'}</p>}
                        </div>
                    </form>
                </div>
            }
        </div>
    );
};

export {Search};