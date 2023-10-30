import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";

import './PaginationStyle.css';
import {RootState} from "../../store";
import {fetchCharacters} from "../../store/slices/character.slice";


const Pagination = () => {
    const {pagesCount, inputCurrent, word, checkboxName} = useSelector((store: RootState) => store.characters);
    const dispatch = useDispatch();


    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(0);
    const [page, setPage] = useState(1);

    const pages = [];

    useEffect(() => {
        if (pagesCount < 10) {
            setEndPage(pagesCount);
        } else {
            setEndPage(Math.ceil(pagesCount / (pagesCount / 10)));
        }
    }, [pagesCount]);


    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const onPageChange = (page: number) => {
        // Забороняємо негативні та перевищуючі значення сторінок
        if (page < 1 || page >= pagesCount) {
            return;
        }

        // Побудова останнього блоку сторінок
        if (page === pagesCount) {
            setStartPage(page);
            setEndPage(page + 1);
        }

        // Динамічна зміна сторінок
        if (page > endPage && page < pagesCount && (pagesCount - page) <= 9) {
            setStartPage(page);
            setEndPage(pagesCount - 1);
        }
        if (page > endPage && page < pagesCount && (pagesCount - page) > 9) {
            setStartPage(page);
            setEndPage(page + 9);
        }
        //===========================================================================
        if (page < startPage && page > 1) {
            setEndPage(page);
            setStartPage(page - 9);
        }


        if (inputCurrent) {
            dispatch(fetchCharacters({page, inputCurrent}));
        } else if (word && checkboxName) {
            dispatch(fetchCharacters({page, word, checkboxName}));
        } else {
            dispatch(fetchCharacters({page}));
        }

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


//
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
// import './PaginationStyle.css';
// import { RootState } from "../../store";
// import { fetchCharacters } from "../../store/slices/character.slice";
//
// const Pagination = () => {
//     const { pagesCount, inputCurrent, word } = useSelector((store: RootState) => store.characters);
//     const dispatch = useDispatch();
//     const [startPage, setStartPage] = useState(1);
//     const [endPage, setEndPage] = useState(0);
//     const [page, setPage] = useState(1);
//
//     useEffect(() => {
//         // Оновлюємо startPage та endPage при зміні pagesCount
//         if (pagesCount < 10) {
//             setEndPage(pagesCount);
//         } else {
//             setEndPage(10); // Відображати завжди 10 сторінок
//         }
//     }, [pagesCount]);
//
//     // Функція для побудови масиву сторінок
//     const buildPagesArray = () => {
//         const pages = [];
//         for (let i = startPage; i <= endPage; i++) {
//             pages.push(i);
//         }
//         return pages;
//     };
//
//     const onPageChange = (newPage: any) => {
//         // Обмежуємо нову сторінку, щоб не виходити за межі діапазону
//         newPage = Math.min(pagesCount, Math.max(1, newPage));
//         setPage(newPage);
//
//         // Оновлюємо сторінки, коли користувач натискає "Назад" або "Вперед"
//         if (newPage > endPage) {
//             setStartPage(newPage);
//             setEndPage(Math.min(pagesCount, newPage + 9));
//         } else if (newPage < startPage) {
//             setStartPage(Math.max(1, newPage - 9));
//             setEndPage(newPage);
//         }
//
//         // Викликаємо дію для завантаження даних
//         const requestData = inputCurrent
//             ? { page: newPage, inputCurrent }
//             : word
//                 ? { page: newPage, word }
//                 : { page: newPage };
//
//         dispatch(fetchCharacters(requestData));
//     };
//
//     return (
//         <div className={'pagination width flex'}>
//             <button className={'pagination-btn flex'} onClick={() => onPageChange(page - 1)}>
//                 <AiOutlineLeft className={'AiOutline'} size={35} />
//             </button>
//             {buildPagesArray().map(item => (
//                 <div
//                     key={item}
//                     className={`pagination-pages flex ${page === item && 'active-page'}`}
//                     onClick={() => onPageChange(item)}>
//                     {item}
//                 </div>
//             ))}
//             <button className={'pagination-btn flex'} onClick={() => onPageChange(page + 1)}>
//                 <AiOutlineRight className={'AiOutline'} size={35} />
//             </button>
//         </div>
//     );
// };
//
// export { Pagination };
