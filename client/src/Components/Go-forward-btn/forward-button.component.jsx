import React from 'react';
import './forward-button.styles.scss'

const ForwardButton = ({ handleClick }) => {

    // See Go-back-btn component 2nd point for documentation.
    
    return (
        <div className="forward-button__container" onClick={handleClick}>
            <div className="arrow">
                <span className="arrow-part-1"></span>
                <span className="arrow-part-2"></span>
                <span className="arrow-part-3"></span>
            </div>
        </div>
    )
}

export default React.memo(ForwardButton)