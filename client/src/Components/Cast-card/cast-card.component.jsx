import React from 'react';


import './cast-card.styles.scss'

const CastCard = ({ actorData }) => {

    const backgroundImg = {
        backgroundImage: actorData.profile_path !== null ? `url(https://image.tmdb.org/t/p/w300/${actorData.profile_path})` : `url(https://www.digitalgroups.co.in/wp-content/uploads/2019/09/user.png)`
    }

    return (
        <div className='cast__container'>
            <div className='cast'>
                <a href={`https://www.imdb.com/name/${actorData.imdb_id}`} title={actorData.actorName} >
                    {/* <img className='cast__actor-img'src={actorData.profile_path !== null ? `https://image.tmdb.org/t/p/w300/${actorData.profile_path}` : `https://www.digitalgroups.co.in/wp-content/uploads/2019/09/user.png`} alt={actorData.actorName} /> */}
                    <div className="cast__actor-img" style={backgroundImg}>

                    </div>
                </a>
            </div>
        </div>
    )
}

export default React.memo(CastCard);