import React from 'react';

import './spinner.styles.scss';


const Spinner = () => {

    return(
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    )
}

export default React.memo(Spinner);