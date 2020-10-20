import React from 'react';
import { useHistory } from 'react-router-dom';
import './back-button.styles.scss';

const BackButton = () => {
    let history = useHistory();
    console.log(history)
    return (
        <div className="back-button" onClick={() => history.push('/search')}>
            <div className="arrow-wrap">
                <span className="arrow-part-1"></span>
                <span className="arrow-part-2"></span>
                <span className="arrow-part-3"></span>
            </div>
        </div>
    )
}

export default BackButton