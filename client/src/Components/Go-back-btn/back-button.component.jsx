import React from 'react';
import { useHistory } from 'react-router-dom';
import './back-button.styles.scss';

const BackButton = () => {
    let history = useHistory();
    console.log(history)
    return (
        <div class="back-button" onClick={() => history.push('/search')}>
            <div class="arrow-wrap">
                <span class="arrow-part-1"></span>
                <span class="arrow-part-2"></span>
                <span class="arrow-part-3"></span>
            </div>
        </div>
    )
}

export default BackButton