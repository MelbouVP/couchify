import React from 'react';

import './change-page-button.styles.scss';

const ChangePageButton = ({ position, handleClick, children }) => {

    // ChangePageButton is responsible for triggering a fetch function for next or previous page in parent component (movieOverview).

    // props = {
    //     position, // styling: positioning within parent component(movieOverview)
    //     handleClick, // triggers fetch function in parent component
    //     children // displays text i.e. prev or next page
    // }

    return (
        <div className='change-btn__container' onClick={ e => handleClick(e)}>
            <div className='change-btn__content' style={position}>
                <button className='change-btn__content--btn'>{children}</button>
            </div>
        </div>
    )
}

export default React.memo(ChangePageButton);