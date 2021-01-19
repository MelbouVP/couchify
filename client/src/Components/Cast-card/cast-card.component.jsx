import React from 'react';

import Spinner from '../Spinner/spinner.component';


import './cast-card.styles.scss'

const CastCard = ({ actorData }) => {

    const [didActorImgLoad, setActorImgLoad] = React.useState(false);

    const backgroundImg = {
        backgroundImage: actorData.profile_path !== null ? `url(https://image.tmdb.org/t/p/w300/${actorData.profile_path})` : `url(https://www.ptceducation.com/wp-content/uploads/2017/10/no-user-image-square-9f6a473a32ad639f619216331d10d61ce1b35c9271d5683920960e1a5ee45bb8.jpg)`
    }

    return (
        <div className='cast__container'>
            {
                didActorImgLoad ?
                    <div className='cast'>
                        <a href={`https://www.imdb.com/name/${actorData.imdb_id}`} title={actorData.actorName} target='_blank' rel="noopener noreferrer" >
                            <div className="cast__actor-img" style={backgroundImg}>
                            </div>
                        </a>
                    </div>
                :
                    <div className="cast__container--spinner">
                        <Spinner size={{height: '50px', width: '50px', borderWidth: '4px'}}/>
                        <img 
                            style={{visibility: 'hidden'}}  
                            src={actorData.profile_path !== null ? `https://image.tmdb.org/t/p/w300/${actorData.profile_path}` : `https://www.ptceducation.com/wp-content/uploads/2017/10/no-user-image-square-9f6a473a32ad639f619216331d10d61ce1b35c9271d5683920960e1a5ee45bb8.jpg`} 
                            onLoad={() => setActorImgLoad(true)}
                            alt=''
                        />
                    </div>
            }
        </div>
    )
}

export default React.memo(CastCard);