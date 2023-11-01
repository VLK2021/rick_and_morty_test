import React, {FC} from 'react';

import './HistoryListComponentStyle.css';


interface IHistoryListComponent {
    setVisibleHistoryMenu: any;

}

const HistoryListComponent: FC<IHistoryListComponent> = ({setVisibleHistoryMenu}) => {

    const handleBtnHistoryList = () => {
        setVisibleHistoryMenu(false);
    }


    return (
        <div className={'historyListComponent width flex-direction'}>
            <h3>history</h3>

            <div className={'historyListComponent-search width flex-direction'}>
                <h5>Search input</h5>
            </div>

            <div className={'historyListComponent-character width flex-direction'}>
                <h5>Character inputs</h5>
            </div>

            <div className={'historyListComponent-location width flex-direction'}>
                <h5>Location inputs</h5>
            </div>

            <div className={'historyListComponent-episode width flex-direction'}>
                <h5>Episode inputs</h5>
            </div>

            <button onClick={handleBtnHistoryList}>close</button>

        </div>
    );
};

export {HistoryListComponent};