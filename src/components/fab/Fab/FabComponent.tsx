import React, {FC} from 'react';
import Box from '@mui/material/Box';
import Fab from "@mui/material/Fab";
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined';
import ClearIcon from '@mui/icons-material/Clear';

import './FabComponentStyle.css';


interface FabComponent {
    visibleFabMenu: boolean;
    setVisibleFabMenu: any;
    setVisibleHistoryMenu: any;
}


const FabComponent: FC<FabComponent> = ({visibleFabMenu, setVisibleFabMenu, setVisibleHistoryMenu}) => {
    const toggleMenu = () => {
        setVisibleFabMenu(!visibleFabMenu);
        setVisibleHistoryMenu(false);
    };


    return (
        <Box sx={{'& > :not(style)': {m: 1}}} className={'fabComponent'}>
            <Fab  aria-label="add" onClick={toggleMenu} className={'fabComponent-color'}>
                {visibleFabMenu ? <ClearIcon/> : <ClearAllOutlinedIcon sx={{color: 'grey'}}/>}
            </Fab>
        </Box>
    );
};

export {FabComponent};