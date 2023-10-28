import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";

import './SearchStyle.css';


const Search = () => {
    const [visible, setVisible] = useState(true);
    const {register, handleSubmit, reset} = useForm();


    const submit = (data: any) => {

    }


    const click = () => {
        setVisible(!visible);
    }

    return (
        <div className={'search width flex'}>
            <div className={'search-btn flex'}>
                <button onClick={click} className={'flex'}>{visible ? 'remove filter' : 'filter'}</button>
            </div>

            {
                visible &&
                <div className={'search-second flex'}>
                    <select>select item
                        <option value="">dddd</option>
                        <option value="">aaa</option>
                        <option value="">www</option>

                    </select>

                    <form onSubmit={handleSubmit(submit)}>
                        <input type="text" placeholder={'Add key words to find'} {...register('search')}/>
                        <button>find</button>
                    </form>
                </div>
            }


        </div>
    );
};

export {Search};