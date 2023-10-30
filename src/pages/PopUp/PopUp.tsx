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

    const submit = (data: any) => {
        if (data.episodes === true) {
            if (data.name || data.episode) {
                setQuery({name: data.name, episode: data.episode});
            }
        }
        if (data.location === true) {
            if (data.name || data.type || data.dimension) {
                setQuery({name: data.name, type: data.type, dimension: data.dimension});
            }
        }
        if (data.character === true) {
            if (data.name || data.status || data.species || data.type || data.gender) {
                setQuery({
                    name: data.name,
                    status: data.status,
                    species: data.species,
                    type: data.type,
                    gender: data.gender
                });
            }
        }
    }

    useEffect(() => {
        const word = query.toString();
        if (word) {
        dispatch(fetchCharacters({page, word}));
        }
        dispatch(characterActions.changeWord(word));
    }, [query]);




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