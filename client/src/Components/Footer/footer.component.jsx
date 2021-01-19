import React from 'react';
import './footer.styles.scss';


const Footer = () => {


    return (
        <div className="footer__container">
            <div className="footer__content">
                <div className="footer__content--details">
                    <div>
                        <a href="https://github.com/MelbouVP" target='_blank' rel='noopener noreferrer' >
                            <img src="https://image.flaticon.com/icons/png/512/25/25231.png" alt="Github logo"/>
                        </a>
                    </div>
                    <div>
                        <p className='footer__content--title'>Couchify</p>
                        <p>© MelbouVP</p>
                    </div>
                    <div>
                        <img src="https://raw.githubusercontent.com/zisiszikos/the-movie-db-example/master/tmdb.png" alt='The movie database logo' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Footer);