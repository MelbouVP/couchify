import React from 'react';

import './page-spinner.styles.scss';

import Spinner from '../Spinner/spinner.component';

const PageSpinner = () => {

    return (
        <div className="page-spinner__container">
            <Spinner />
        </div>
    )
}

export default React.memo(PageSpinner)