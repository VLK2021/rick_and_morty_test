import React, {FC} from 'react';
import Box from '@mui/material/Box';
import Fab from "@mui/material/Fab";
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined';

import './FabComponentStyle.css';


interface FabComponent {
    visibleFabMenu: boolean;
    setVisibleFabMenu: any;
}


const FabComponent: FC<FabComponent> = ({visibleFabMenu, setVisibleFabMenu}) => {
    const toggleMenu = () => {
        setVisibleFabMenu(!visibleFabMenu);
    };


    return (
        <Box sx={{'& > :not(style)': {m: 1}}} className={'fabComponent'}>
            <Fab color="primary" aria-label="add" onClick={toggleMenu}>
                <ClearAllOutlinedIcon/>
            </Fab>
        </Box>
    );
};

export {FabComponent};