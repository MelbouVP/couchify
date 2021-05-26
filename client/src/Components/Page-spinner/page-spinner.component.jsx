import React from 'react';

import './page-spinner.styles.scss';

import Spinner from '../Spinner/spinner.component';

const PageSpinner = () => {

    // PageSpinner component is responsible for displaying a spinner on whole page while data loads for pages - lazy loading fallback.

    return (
        <div className="page-spinner__container">
            <Spinner />
        </div>
    )
}

export default React.memo(PageSpinner)