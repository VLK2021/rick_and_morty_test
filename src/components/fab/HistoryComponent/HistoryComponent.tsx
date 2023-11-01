import React, {FC} from 'react';
import Fab from "@mui/material/Fab";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ReorderIcon from '@mui/icons-material/Reorder';

import './HistoryComponentStyle.css';


interface HistoryComponent {
    setVisibleHistoryMenu: any;
    setVisibleFabMenu: any;
}

const HistoryComponent: FC<HistoryComponent> = ({setVisibleHistoryMenu, setVisibleFabMenu}) => {

    const toggleHistory = () => {
        setVisibleHistoryMenu(true);
        setVisibleFabMenu(false);
    }

    return (
        <div className={'historyComponent width flex-direction'}>
            <Fab size="small" className={'fabComponent-color'} aria-label="add" onClick={toggleHistory}>
                <ReorderIcon/>
            </Fab>

            <Fab size="small" className={'fabComponent-color'} aria-label="add">
                <DownloadForOfflineIcon/>
            </Fab>
        </div>
    );
};

export {HistoryComponent};