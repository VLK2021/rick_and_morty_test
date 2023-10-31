import React, {FC} from 'react';
import Fab from "@mui/material/Fab";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ReorderIcon from '@mui/icons-material/Reorder';

import './HistoryComponentStyle.css';
import ClearIcon from "@mui/icons-material/Clear";


interface HistoryComponent {
    visibleHistoryMenu: boolean;
    setVisibleHistoryMenu: any;
}

const HistoryComponent: FC<HistoryComponent> = ({visibleHistoryMenu, setVisibleHistoryMenu}) => {

    const toggleHistory = () => {
        setVisibleHistoryMenu(!visibleHistoryMenu);
    }

    return (
        <div className={'historyComponent width flex-direction'}>
            <Fab size="small" className={'fabComponent-color'} aria-label="add" onClick={toggleHistory}>
                {visibleHistoryMenu ? <ClearIcon/> : <ReorderIcon/>}
            </Fab>

            <Fab size="small" className={'fabComponent-color'} aria-label="add">
                <DownloadForOfflineIcon/>
            </Fab>
        </div>
    );
};

export {HistoryComponent};