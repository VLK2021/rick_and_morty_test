import React, {FC, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import './PopUpStyle.css';
import {characterActions, fetchCharacters} from "../../store/slices/character.slice";
import {RootState} from "../../store";


interface PopUpProps {
    setVisibleCheckbox: any;
    visibleCheckbox: any
}

const PopUp: FC<PopUpProps> = ({setVisibleCheckbox, visibleCheckbox}) => {
    const {page, checkboxName} = useSelector((store: RootState) => store.characters);
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();

    const [visibleCharacterCurrent, setVisibleCharacterCurrent] = useState(false);
    const [visibleLocationCurrent, setVisibleLocationCurrent] = useState(false);
    const [visibleEpisodesCurrent, setVisibleEpisodesCurrent] = useState(false);

    const [query, setQuery] = useSearchParams();


    useEffect(() => {
        const word = query.toString();
        if (word) {
            dispatch(fetchCharacters({page, word, checkboxName}));
        }
        dispatch(characterActions.changeWord(word));
    }, [checkboxName, dispatch, page, query]);


    const submit = (data: any) => {
        if (data.episodes === true) {
            if (data.name || data.episode) {
                setQuery({name: data.name, episode: data.episode});
            }

            // const inputs = ['name', 'episode'];
            // const dataEpisodeNew: { [key: string]: string } = {};
            // inputs.forEach((obj) => {
            //             if (data[obj] && data[obj].length > 1) {
            //                 dataEpisodeNew[obj] = data[obj];
            //             }
            //         });
            // dispatch(characterActions.changeQueries(dataEpisodeNew));

            const dataInputEpisode = localStorage.getItem('inputEpisode');
            const inputs = ['name', 'episode'];

            if (dataInputEpisode){
                const dataInputEpisodeNew: Array<{ [key: string]: string }> = JSON.parse(dataInputEpisode);
                const dataEpisodeNew: { [key: string]: string } = {};
                inputs.forEach((obj) => {
                    if (data[obj] && data[obj].length > 1) {
                        dataEpisodeNew[obj] = data[obj];
                    }
                });
                dataInputEpisodeNew.push(dataEpisodeNew);
                localStorage.setItem('inputEpisode', JSON.stringify(dataInputEpisodeNew));
            } else {
                const dataEpisodeNeww: { [x: string]: any; }[] = [];
                const dataEpisodeObj: { [key: string]: string } = {};
                inputs.forEach((obj) => {
                    if (data[obj] && data[obj].length > 1) {
                        dataEpisodeObj[obj] = data[obj];
                    }
                });
                dataEpisodeNeww.push(dataEpisodeObj);
                localStorage.setItem('inputEpisode', JSON.stringify(dataEpisodeNeww));
            }
        }

        if (data.location === true) {
            if (data.name || data.type || data.dimension) {
                setQuery({name: data.name, type: data.type, dimension: data.dimension});
            }
//працюємо з localStorage і пушимо введені в інпут дані плюс перевіряємо на наявність масуву в сторідж
            const dataInputLocation = localStorage.getItem('inputLocation');
            const inputs = ['name', 'type', 'dimension'];

            if (dataInputLocation) {
                const dataInputLocationNew: Array<{ [key: string]: string }> = JSON.parse(dataInputLocation);
                const dataLocationNew: { [key: string]: string } = {};
                inputs.forEach((obj) => {
                    if (data[obj] && data[obj].length > 1) {
                        dataLocationNew[obj] = data[obj];
                    }
                });
                dataInputLocationNew.push(dataLocationNew);
                localStorage.setItem('inputLocation', JSON.stringify(dataInputLocationNew));
            } else {
                const dataLocationNeww: { [x: string]: any; }[] = [];
                const dataLocationObj: { [key: string]: string } = {};
                inputs.forEach((obj) => {
                    if (data[obj] && data[obj].length > 1) {
                        dataLocationObj[obj] = data[obj];
                    }
                });
                dataLocationNeww.push(dataLocationObj);
                localStorage.setItem('inputLocation', JSON.stringify(dataLocationNeww));
            }
        }

        if (data.character === true) {
            //додаємо дані в урлу
            if (data.name || data.status || data.species || data.type || data.gender) {
                setQuery({
                    name: data.name,
                    status: data.status,
                    species: data.species,
                    type: data.type,
                    gender: data.gender
                });
            }

            //працюємо з localStorage і пушимо введені в інпут дані плюс перевіряємо на наявність масуву в сторідж
            const dataInputCharacter = localStorage.getItem('inputCharacter');
            const inputs = ['name', 'status', 'species', 'type', 'gender'];

            if (dataInputCharacter) {
                const dataInputCharacterNew: Array<{ [key: string]: string }> = JSON.parse(dataInputCharacter);
                const dataCharacterNew: { [key: string]: string } = {};
                inputs.forEach((obj) => {
                    if (data[obj] && data[obj].length > 1) {
                        dataCharacterNew[obj] = data[obj];
                    }
                });
                dataInputCharacterNew.push(dataCharacterNew);
                localStorage.setItem('inputCharacter', JSON.stringify(dataInputCharacterNew));
            } else {
                const dataCharacterNeww: { [x: string]: any; }[] = [];
                const dataCharacterObj: { [key: string]: string } = {};
                inputs.forEach((obj) => {
                    if (data[obj] && data[obj].length > 1) {
                        dataCharacterObj[obj] = data[obj];
                    }
                });
                dataCharacterNeww.push(dataCharacterObj);
                localStorage.setItem('inputCharacter', JSON.stringify(dataCharacterNeww));
            }
        }
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'character') {
            setVisibleCharacterCurrent(!visibleCharacterCurrent);
            dispatch(characterActions.changeCheckboxName(e.target.name));
        }
        if (e.target.name === 'location') {
            setVisibleLocationCurrent(!visibleLocationCurrent);
            dispatch(characterActions.changeCheckboxName(e.target.name));
        }
        if (e.target.name === 'episodes') {
            setVisibleEpisodesCurrent(!visibleEpisodesCurrent);
            dispatch(characterActions.changeCheckboxName(e.target.name));
        }
    };

    const close = () => {
        setVisibleCheckbox(!visibleCheckbox);
    }


    return (
        <div className={'popUp flex'}>
            <div className={'close flex'} onClick={close}>Close</div>

            <form onSubmit={handleSubmit(submit)} className={'flex'}>
                <ul>
                    <li className={'width'}>
                        <label htmlFor="character" className={'width flex'}>Character
                            <input
                                type="checkbox"
                                {...register('character')}
                                id={'character'}
                                className={'inputPopUp'}
                                onChange={handleCheckboxChange}
                            />
                        </label>
                    </li>

                    <li className={'width'}>
                        <label htmlFor="location" className={'width flex'}>Location
                            <input
                                type="checkbox"
                                {...register('location')}
                                id={'location'}
                                className={'inputPopUp'}
                                onChange={handleCheckboxChange}
                            />
                        </label>
                    </li>

                    <li className={'width'}>
                        <label htmlFor="episodes" className={'width flex'}>Episodes
                            <input
                                type="checkbox"
                                {...register('episodes')}
                                id={'episodes'}
                                className={'inputPopUp'}
                                onChange={handleCheckboxChange}
                            />
                        </label>
                    </li>

                </ul>
                {/*==================================================================================================================*/}
                {
                    visibleCharacterCurrent &&
                    <div className={'characterCurrent'}>
                        <ul>
                            <li>
                                <input type="text" className={'inpCurrent width'} {...register('name')}
                                       placeholder={'Add Name'}
                                       defaultValue={''}/>
                            </li>
                            <li>
                                <input type="text" className={'inpCurrent width'} {...register('status')}
                                       placeholder={'Add Status'}
                                       defaultValue={''}/>
                            </li>
                            <li>
                                <input type="text" className={'inpCurrent width'} {...register('species')}
                                       placeholder={'Add Species'}
                                       defaultValue={''}/>
                            </li>
                            <li>
                                <input type="text" className={'inpCurrent width'} {...register('type')}
                                       placeholder={'Add Type'}
                                       defaultValue={''}/>
                            </li>
                            <li>
                                <input type="text" className={'inpCurrent width'} {...register('gender')}
                                       placeholder={'Add Gender'}
                                       defaultValue={''}/>
                            </li>
                        </ul>
                    </div>
                }
                {/*=============  ==========================================================================================     */}
                {
                    visibleLocationCurrent &&
                    <div className={'characterLocation'}>
                        <li>
                            <input type="text" className={'inpCurrent width'} {...register('name')}
                                   placeholder={'Add Name'}
                                   defaultValue={''}/>
                        </li>
                        <li>
                            <input type="text" className={'inpCurrent width'} {...register('type')}
                                   placeholder={'Add Type'}
                                   defaultValue={''}/>
                        </li>
                        <li>
                            <input type="text" className={'inpCurrent width'} {...register('dimension')}
                                   placeholder={'Add Dimension'}
                                   defaultValue={''}/>
                        </li>
                    </div>
                }
                {/*==============================================================================================*/}
                {
                    visibleEpisodesCurrent &&
                    <div className={'episodesCurrent'}>
                        <li>
                            <input type="text" className={'inpCurrent width'} {...register('name')}
                                   placeholder={'Add Name'}
                                   defaultValue={''}/>
                        </li>
                        <li>
                            <input type="text" className={'inpCurrent width'} {...register('episode')}
                                   placeholder={'Add Episodes'}
                                   defaultValue={''}/>
                        </li>
                    </div>
                }

                <button className={'popUp-btn'}>find</button>
            </form>
        </div>
    );
};

export {PopUp};