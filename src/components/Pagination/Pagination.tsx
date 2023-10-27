import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";

import './PaginationStyle.css';
import {getAllCharacters} from "../../store/slices/character.slice";


// @ts-ignore
const Pagination = ({count}) => {
    const endPagesFinal = Math.ceil(count / 138);

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
                         className={`pagination-pages ${page === item && 'active-page'}`}
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