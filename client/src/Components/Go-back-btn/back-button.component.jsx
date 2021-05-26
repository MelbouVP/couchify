import React from 'react';
import './back-button.styles.scss';

const BackButton = ({ handleClick }) => {

    // BackButton component is responsible for: 
        // - Triggering url pathname change. Called in parent component(MovieSectionPage)
        // - Hiding MovieFilter component. Called in parent component (MovieFilterPage)
    
    return (
        <div className="back-button__container" onClick={handleClick}>
            <div className="arrow">
                <span className="arrow-part-1"></span>
                <span className="arrow-part-2"></span>
                <span className="arrow-part-3"></span>
            </div>
        </div>
    )
}

export default React.memo(BackButton)