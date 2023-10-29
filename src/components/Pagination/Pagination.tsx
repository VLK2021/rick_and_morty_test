import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";

import './PaginationStyle.css';
import {filterCharacters, getAllCharacters, searchCharacters} from "../../store/slices/character.slice";
import {RootState} from "../../store";


const Pagination = () => {
    const {pagesCount, name, word} = useSelector((store: RootState) => store.characters);

    const dispatch = useDispatch();

    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(0);
    const [page, setPage] = useState(1);

    const pages = [];

    useEffect(() => {
        if (pagesCount < 10) {
            setEndPage(pagesCount);
        } else {
            setEndPage(pagesCount / (pagesCount / 10));
        }
    }, [pagesCount]);


    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const onPageChange = (page: number) => {
        if (name) {
            //найменша та найбільша сторінки. Заборона побудови сторінок
            if (page < 1) {
                return;
            }
            if (page === pagesCount) {
                return;
            }

            //побудова останнього блоку сторінок
            if (page > pagesCount - 1) {
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

            dispatch(searchCharacters({page, name}));
            setPage(page);
            console.log('searchCharacters');
        } else {
            //найменша та найбільша сторінки.Заборона побудови сторінок
            if (page < 1) {
                return;
            }
            if (page === pagesCount) {
                return;
            }

            //побудова останнього блоку сторінок
            if (page > pagesCount - 2) {
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
            console.log('getAllCharacters');
        }

        // if (!word) {
        //         //найменша та найбільша сторінки.Заборона побудови сторінок
        //         if (page < 1) {
        //             return;
        //         }
        //         if (page === pagesCount) {
        //             return;
        //         }
        //
        //         //побудова останнього блоку сторінок
        //         if (page > pagesCount - 2) {
        //             setStartPage(page);
        //             setEndPage(page + 1);
        //         }
        //
        //         //динамічна зміна сторінок
        //         if (page > endPage && page < 33) {
        //             setStartPage(page);
        //             setEndPage(page + 9);
        //         }
        //         if (page < startPage && page > 1) {
        //             setEndPage(page);
        //             setStartPage(page - 9);
        //         }
        //
        //         dispatch(getAllCharacters({page}));
        //         setPage(page);
        //         console.log('getAllCharacters');
        //     }
        //
        // if (word) {
        //     //найменша та найбільша сторінки. Заборона побудови сторінок
        //     if (page < 1) {
        //         return;
        //     }
        //     if (page === pagesCount) {
        //         return;
        //     }
        //
        //     //побудова останнього блоку сторінок
        //     if (page > pagesCount - 1) {
        //         setStartPage(page);
        //         setEndPage(page + 1);
        //     }
        //
        //     //динамічна зміна сторінок
        //     if (page > endPage && page < 33) {
        //         setStartPage(page);
        //         setEndPage(page + 9);
        //     }
        //     if (page < startPage && page > 1) {
        //         setEndPage(page);
        //         setStartPage(page - 9);
        //     }
        //
        //     dispatch(filterCharacters({page, word}));
        //     setPage(page);
        //     console.log('filterCharacters');
        // }

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



