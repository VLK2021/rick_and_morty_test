import React, {FC} from 'react';
import Fab from '@mui/material/Fab';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ReorderIcon from '@mui/icons-material/Reorder';

import './HistoryComponentStyle.css';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';

interface HistoryComponent {
    setVisibleHistoryMenu: any;
    setVisibleFabMenu: any;
}

const HistoryComponent: FC<HistoryComponent> = ({setVisibleHistoryMenu, setVisibleFabMenu}) => {
    const {csvFile} = useSelector((store: RootState) => store.characters);

    const toggleHistory = () => {
        setVisibleHistoryMenu(true);
        setVisibleFabMenu(false);
    };

    const saveCSV: any = () => {
        if (csvFile instanceof Blob) {
            const url = window.URL.createObjectURL(csvFile);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'history.csv';
            document.body.appendChild(a);
            a.addEventListener('click', () => {
                window.URL.revokeObjectURL(url);
                // @ts-ignore
                a.removeEventListener('click', null);
            });
            a.click();
        }
    };


    return (
        <div className={'historyComponent width flex-direction'}>
            <Fab size="small" className={'fabComponent-color'} aria-label="add" onClick={toggleHistory}>
                <ReorderIcon/>
            </Fab>

            <Fab size="small" className={'fabComponent-color'} aria-label="add">
                <DownloadForOfflineIcon onClick={saveCSV}/>
            </Fab>
        </div>
    );
};

export {HistoryComponent};
