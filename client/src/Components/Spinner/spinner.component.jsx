import React from 'react';

import './spinner.styles.scss';


const Spinner = ({ size }) => {

    // Spinner component is responsible for displaying a spinner while data is loaded in parent component

    const overwriteDefaultSize = size && size

    return(
        <div className="spinner-container">
            <div className="spinner" style={overwriteDefaultSize} ></div>
        </div>
    )
}

export default React.memo(Spinner);