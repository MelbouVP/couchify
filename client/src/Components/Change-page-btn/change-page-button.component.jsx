import React from 'react';




import './change-page-button.styles.scss';


const ChangePageButton = ({ position, handleClick, children }) => {


    return (
        <div className='container__change-btn' style={position} onClick={ e => handleClick(e)}>
            <div className='content__change'>
                <button className='content__change--btn'>{children}</button>
            </div>
        </div>
    )
}

export default ChangePageButton;