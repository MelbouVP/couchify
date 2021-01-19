import React from 'react';

import './spinner.styles.scss';


const Spinner = ({ size }) => {


    const overwriteDefaultSize = size && size

    return(
        <div className="spinner-container">
            <div className="spinner" style={overwriteDefaultSize} ></div>
        </div>
    )
}

export default React.memo(Spinner);