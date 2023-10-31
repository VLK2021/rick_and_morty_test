import React, {FC} from 'react';

import './SpinnerStyle.css';


const Spinner: FC = () => {

    return (
        <div id="spinner">
            <div className="spinner-circle circle-1">
            </div>
            <div className="spinner-circle circle-2">
            </div>
            <div className="spinner-circle circle-3">
            </div>
        </div>
    );
};

export {Spinner};