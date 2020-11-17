import React from 'react';

import './change-page-button.styles.scss';


const ChangePageButton = ({ position, handleClick, children }) => {


    return (
        <div className='change-btn__container' onClick={ e => handleClick(e)}>
            <div className='change-btn__content' style={position}>
                <button className='change-btn__content--btn'>{children}</button>
            </div>
        </div>
    )
}

export default React.memo(ChangePageButton);