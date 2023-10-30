// import React, {useEffect, useState} from 'react';
// import {useDispatch, useSelector} from "react-redux";
// import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
//
// import './PaginationStyle.css';
// // import {filterCharacters, getAllCharacters, searchCharacters} from "../../store/slices/character.slice";
// import {RootState} from "../../store";
// import {fetchCharacters} from "../../store/slices/character.slice";
//
//
// const Pagination = () => {
//     const {pagesCount, inputCurrent} = useSelector((store: RootState) => store.characters);
//
//     const dispatch = useDispatch();
//
//     const [startPage, setStartPage] = useState(1);
//     const [endPage, setEndPage] = useState(0);
//     const [page, setPage] = useState(1);
//
//     const pages = [];
//
//     useEffect(() => {
//         if (pagesCount < 10) {
//             setEndPage(pagesCount);
//         } else {
//             setEndPage(pagesCount / (pagesCount / 10));
//         }
//     }, [pagesCount]);
//
//
//     for (let i = startPage; i <= endPage; i++) {
//         pages.push(i);
//     }
//
//     // const onPageChange = (page: number) => {
//     //       if (name) {
//     //         //найменша та найбільша сторінки. Заборона побудови сторінок
//     //         if (page < 1) {
//     //             return;
//     //         }
//     //         if (page === pagesCount) {
//     //             return;
//     //         }
//     //
//     //         //побудова останнього блоку сторінок
//     //         if (page > pagesCount - 1) {
//     //             setStartPage(page);
//     //             setEndPage(page + 1);
//     //         }
//     //
//     //         //динамічна зміна сторінок
//     //         if (page > endPage && page < 33) {
//     //             setStartPage(page);
//     //             setEndPage(page + 9);
//     //         }
//     //         if (page < startPage && page > 1) {
//     //             setEndPage(page);
//     //             setStartPage(page - 9);
//     //         }
//     //
//     //         // dispatch(searchCharacters({page, name}));
//     //         dispatch(fetchCharacters({page, name}));
//     //         setPage(page);
//     //         console.log('searchCharacters');
//     //     } else {
//     //         //найменша та найбільша сторінки.Заборона побудови сторінок
//     //         if (page < 1) {
//     //             return;
//     //         }
//     //         if (page === pagesCount) {
//     //             return;
//     //         }
//     //
//     //         //побудова останнього блоку сторінок
//     //         if (page > pagesCount - 2) {
//     //             setStartPage(page);
//     //             setEndPage(page + 1);
//     //         }
//     //
//     //         //динамічна зміна сторінок
//     //         if (page > endPage && page < 33) {
//     //             setStartPage(page);
//     //             setEndPage(page + 9);
//     //         }
//     //         if (page < startPage && page > 1) {
//     //             setEndPage(page);
//     //             setStartPage(page - 9);
//     //         }
//     //
//     //         // dispatch(getAllCharacters({page}));
//     //         dispatch(fetchCharacters({page}));
//     //         setPage(page);
//     //         console.log('getAllCharacters');
//     //     }
//     //
//     //     if (word) {
//     //         //найменша та найбільша сторінки. Заборона побудови сторінок
//     //         if (page < 1) {
//     //             return;
//     //         }
//     //         if (page === pagesCount) {
//     //             return;
//     //         }
//     //
//     //         //побудова останнього блоку сторінок
//     //         if (page > pagesCount - 1) {
//     //             setStartPage(page);
//     //             setEndPage(page + 1);
//     //         }
//     //
//     //         //динамічна зміна сторінок
//     //         if (page > endPage && page < 33) {
//     //             setStartPage(page);
//     //             setEndPage(page + 9);
//     //         }
//     //         if (page < startPage && page > 1) {
//     //             setEndPage(page);
//     //             setStartPage(page - 9);
//     //         }
//     //
//     //         // dispatch(filterCharacters({page, word}));
//     //         dispatch(fetchCharacters({page, word}));
//     //         setPage(page);
//     //         console.log('filterCharacters');
//     //     }
//     //
//     //     // if () {
//     //     //     //найменша та найбільша сторінки. Заборона побудови сторінок
//     //     //     if (page < 1) {
//     //     //         return;
//     //     //     }
//     //     //     if (page === pagesCount) {
//     //     //         return;
//     //     //     }
//     //     //
//     //     //     //побудова останнього блоку сторінок
//     //     //     if (page > pagesCount - 1) {
//     //     //         setStartPage(page);
//     //     //         setEndPage(page + 1);
//     //     //     }
//     //     //
//     //     //     //динамічна зміна сторінок
//     //     //     if (page > endPage && page < 33) {
//     //     //         setStartPage(page);
//     //     //         setEndPage(page + 9);
//     //     //     }
//     //     //     if (page < startPage && page > 1) {
//     //     //         setEndPage(page);
//     //     //         setStartPage(page - 9);
//     //     //     }
//     //     //
//     //     //     dispatch(filterCharacters({page, word}));
//     //     //     setPage(page);
//     //     //     console.log('filterCharacters');
//     //     // }
//     //     // if () {
//     //     //     //найменша та найбільша сторінки. Заборона побудови сторінок
//     //     //     if (page < 1) {
//     //     //         return;
//     //     //     }
//     //     //     if (page === pagesCount) {
//     //     //         return;
//     //     //     }
//     //     //
//     //     //     //побудова останнього блоку сторінок
//     //     //     if (page > pagesCount - 1) {
//     //     //         setStartPage(page);
//     //     //         setEndPage(page + 1);
//     //     //     }
//     //     //
//     //     //     //динамічна зміна сторінок
//     //     //     if (page > endPage && page < 33) {
//     //     //         setStartPage(page);
//     //     //         setEndPage(page + 9);
//     //     //     }
//     //     //     if (page < startPage && page > 1) {
//     //     //         setEndPage(page);
//     //     //         setStartPage(page - 9);
//     //     //     }
//     //     //
//     //     //     dispatch(searchCharacters({page, name}));
//     //     //     setPage(page);
//     //     //     console.log('searchCharacters');
//     //     // }
//     //     // if (){
//     //     //     //найменша та найбільша сторінки.Заборона побудови сторінок
//     //     //     if (page < 1) {
//     //     //         return;
//     //     //     }
//     //     //     if (page === pagesCount) {
//     //     //         return;
//     //     //     }
//     //     //
//     //     //     //побудова останнього блоку сторінок
//     //     //     if (page > pagesCount - 2) {
//     //     //         setStartPage(page);
//     //     //         setEndPage(page + 1);
//     //     //     }
//     //     //
//     //     //     //динамічна зміна сторінок
//     //     //     if (page > endPage && page < 33) {
//     //     //         setStartPage(page);
//     //     //         setEndPage(page + 9);
//     //     //     }
//     //     //     if (page < startPage && page > 1) {
//     //     //         setEndPage(page);
//     //     //         setStartPage(page - 9);
//     //     //     }
//     //     //
//     //     //     dispatch(getAllCharacters({page}));
//     //     //     setPage(page);
//     //     //     console.log('getAllCharacters');
//     //     // }
//     //
//     // };
//
//     const onPageChange = (newPage: number) => {
//         // Забороняємо негативні та перевищуючі значення сторінок
//         if (newPage < 1 || newPage === pagesCount) {
//             return;
//         }
//
//         // Побудова останнього блоку сторінок
//         if (newPage > pagesCount - 1) {
//             setStartPage(newPage);
//             setEndPage(newPage + 1);
//         }
//
//         // Динамічна зміна сторінок
//         if (newPage > endPage && newPage < 33) {
//             setStartPage(newPage);
//             setEndPage(newPage + 9);
//         }
//         if (newPage < startPage && newPage > 1) {
//             setEndPage(newPage);
//             setStartPage(newPage - 9);
//         }
//
//         // Використовуємо одну функцію для завантаження даних залежно від параметрів
//         let params = { page: newPage };
//         if (inputCurrent) {
//             // @ts-ignore
//             params['inputCurrent'] = inputCurrent;
//         }
//         // if (word) {
//         //     // @ts-ignore
//         //     params['word'] = word;
//         // }
//         dispatch(fetchCharacters(params));
//         setPage(newPage);
//     };
//
//
//
//     return (
//         <div className={'pagination width flex'}>
//             <button className={'pagination-btn flex'} onClick={() => {
//                 onPageChange(page - 1);
//
//             }}>
//                 <AiOutlineLeft
//                     className={'AiOutline'}
//                     size={35}
//                 />
//             </button>
//
//             {
//                 pages.map(item =>
//                     <div key={item}
//                          className={`pagination-pages flex ${page === item && 'active-page'}`}
//                          onClick={() => {
//                              onPageChange(item);
//                          }}>{item}
//                     </div>)
//             }
//
//             <button className={'pagination-btn flex'} onClick={() => {
//                 onPageChange(page + 1);
//
//             }}>
//                 <AiOutlineRight
//                     className={'AiOutline'}
//                     size={35}
//                 />
//             </button>
//         </div>
//     );
// };
// export {Pagination};



import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";

import './PaginationStyle.css';
import {RootState} from "../../store";
import {fetchCharacters} from "../../store/slices/character.slice";


const Pagination = () => {
    const {pagesCount, inputCurrent} = useSelector((store: RootState) => store.characters);
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
            setEndPage(pagesCount -1);
        }
        if(page > endPage && page < pagesCount && (pagesCount - page) > 9) {
            setStartPage(page);
            setEndPage(page + 9);
        }
        //===========================================================================
        if (page < startPage && page > 1) {
                setEndPage(page);
                setStartPage(page - 9);
            }

        // Використовуємо одну функцію для завантаження даних залежно від параметрів
        // let params = { page: page };
        // if (inputCurrent) {
        //     // @ts-ignore
        //     params['inputCurrent'] = inputCurrent;
        // }
        if(inputCurrent) {
            dispatch(fetchCharacters({page, inputCurrent}));
            setPage(page);
        } else {
            dispatch(fetchCharacters({page}));
            setPage(page);
        }

        // setPage(page);
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



