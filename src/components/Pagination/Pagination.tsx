import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";

import './PaginationStyle.css';
import {getAllCharacters} from "../../store/slices/character.slice";


// @ts-ignore
const Pagination = ({count}) => {
    const endPagesFinal = Math.ceil(count / 82.6);

    const dispatch = useDispatch();


    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(0);
    const [page, setPage] = useState(1);

    const pages = [];

    useEffect(() => {
        setEndPage(endPagesFinal);
    }, [endPagesFinal]);


    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const onPageChange = (page: number) => {
        //найменша та найбільша сторінки. Заборона побудови сторінок
        if (page < 1) {
            return;
        }
        if (page === 42) {
            return;
        }

        //побудова останнього блоку сторінок
        if (page > 40) {
            setStartPage(page);
            setEndPage(page + 1);
        }

        //динамічна зміна сторінок
        if (page > endPage && page < 33) {
            setStartPage(page);
            setEndPage(page + 9);
        }
        if (page < startPage && page > 1) {
            setEndPage(page);
            setStartPage(page - 9);
        }

        dispatch(getAllCharacters({page}));
        setPage(page);
    };

    return (
        <div className={'pagination width flex'}>
            <button className={'pagination-btn flex'} onClick={() => {
                onPageChange(page - 1);

            }}>
                <AiOutlineLeft
                    className={'AiOutline'}
                    size={35}
                />
            </button>

            {
                pages.map(item =>
                    <div key={item}
                         className={`pagination-pages flex ${page === item && 'active-page'}`}
                         onClick={() => {
                             onPageChange(item);
                         }}>{item}
                    </div>)
            }

            <button className={'pagination-btn flex'} onClick={() => {
                onPageChange(page + 1);

            }}>
                <AiOutlineRight
                    className={'AiOutline'}
                    size={35}
                />
            </button>
        </div>
    );
};
export {Pagination};