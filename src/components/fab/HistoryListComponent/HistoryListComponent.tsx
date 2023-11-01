import React, {FC, useEffect, useState} from 'react';

import './HistoryListComponentStyle.css';


interface IHistoryListComponent {
    setVisibleHistoryMenu: any;

}

const HistoryListComponent: FC<IHistoryListComponent> = ({setVisibleHistoryMenu}) => {
    const [episodes, setEpisodes] = useState<Array<{}>>([]);
    const [locations, setLocations] = useState<Array<{}>>([]);
    const [characters, setCharacters] = useState<Array<{}>>([]);
    const [search, setSearch] = useState<Array<{}>>([]);


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

    const handleBtnHistoryList = () => {
        setVisibleHistoryMenu(false);
    }


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