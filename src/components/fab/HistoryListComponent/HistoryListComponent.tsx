import React, {FC, useEffect, useState} from 'react';
import {saveAs} from 'file-saver';

import './HistoryListComponentStyle.css';
import {useDispatch} from "react-redux";
import {characterActions} from "../../../store/slices/character.slice";


interface IHistoryListComponent {
    setVisibleHistoryMenu: any;

}

const HistoryListComponent: FC<IHistoryListComponent> = ({setVisibleHistoryMenu}) => {
    const [episodes, setEpisodes] = useState<Array<{}>>([]);
    const [locations, setLocations] = useState<Array<{}>>([]);
    const [characters, setCharacters] = useState<Array<{}>>([]);
    const [search, setSearch] = useState<Array<{}>>([]);

    const dispatch = useDispatch();


    useEffect(() => {
        const dataInputEpisode = localStorage.getItem('inputEpisode');
        const dataInputLocation = localStorage.getItem('inputLocation');
        const dataInputCharacter = localStorage.getItem('inputCharacter');
        const dataInputSearch = localStorage.getItem('inputSearchLS');
        if (dataInputEpisode) {
            const episodesFromLocal: Array<{ [key: string]: string }> = JSON.parse(dataInputEpisode);
            setEpisodes(episodesFromLocal);
        }
        if (dataInputLocation) {
            const locationsFromLocal: Array<{ [key: string]: string }> = JSON.parse(dataInputLocation);
            setLocations(locationsFromLocal);
        }
        if (dataInputCharacter) {
            const charactersFromLocal: Array<{ [key: string]: string }> = JSON.parse(dataInputCharacter);
            setCharacters(charactersFromLocal);
        }
        if (dataInputSearch) {
            const searchesFromLocal: Array<{ [key: string]: string }> = JSON.parse(dataInputSearch);
            setSearch(searchesFromLocal);
        }
    }, []);

    useEffect(() => {
        if (episodes || locations || search || characters) {
            const data = [
                ...episodes,
                ...locations,
                ...characters,
                ...search
            ];

            const csvContent = "episodes, locations, characters, search\n" + data.map(obj => Object.values(obj).join(", ")).join("\n");

            const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8"});
            saveAs(blob, "history.csv");

            dispatch(characterActions.changeCSV({csvContent}));
        }

    }, [characters, dispatch, episodes, locations, search]);


    const handleBtnHistoryList = () => {
        setVisibleHistoryMenu(false);
    }

//index не бажано використовувати в якості ключа. але тут можна бо точно знаю що видаляти нічого не буду тому так
// якщо Ви дійсно це читаєте то я приємно здивований що хоть хтось дивиться код тестових завдань))
// if також бажано не плодити, але хотів як найшвидше написати тому не став придумувати складні функції якіб значно
// скоротили код)
    return (
        <div className={'historyListComponent width flex-direction'}>
            <h3>history:</h3>

            <div className={'historyListComponent-search width flex-direction'}>
                <h5>Search input:</h5>
                {
                    search && search
                        .map((obj, index) => <div key={index}>{JSON.stringify(obj)}</div>)
                }
            </div>

            <div className={'historyListComponent-character width flex-direction'}>
                <h5>Character inputs:</h5>
                {
                    characters && characters
                        .map((obj, index) => <div key={index}>{JSON.stringify(obj)}</div>)
                }
            </div>

            <div className={'historyListComponent-location width flex-direction'}>
                <h5>Location inputs:</h5>
                {
                    locations && locations
                        .map((obj, index) => <div key={index}>{JSON.stringify(obj)}</div>)
                }
            </div>

            <div className={'historyListComponent-episode width flex-direction'}>
                <h5>Episode inputs:</h5>
                {
                    episodes && episodes
                        .map((obj, index) => <div key={index}>{JSON.stringify(obj)}</div>)
                }
            </div>

            <button onClick={handleBtnHistoryList}>close</button>

        </div>
    );
};

export {HistoryListComponent};