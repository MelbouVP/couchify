import React from 'react';
import { useHistory } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location';
import './back-button.styles.scss';

const BackButton = () => {
    let history = useHistory();
    const lastLocation = useLastLocation();

    return (
        <div className="back-button__container" onClick={() => history.push(lastLocation)}>
            <div className="arrow">
                <span className="arrow-part-1"></span>
                <span className="arrow-part-2"></span>
                <span className="arrow-part-3"></span>
            </div>
        </div>
    )
}

export default BackButton