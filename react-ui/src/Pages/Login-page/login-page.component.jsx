import React, { useState } from 'react';
import { connect } from 'react-redux'

import { useHistory } from 'react-router-dom'

import { requestUserData } from '../../Redux/user-data/user.actions'

import Particles from 'react-particles-js';

import '../Register-page/form-page.styles.scss'

const LoginPage = ({ onRequestUserData }) => {

	// LoginPage is responsible for authenticating user
	// props = {
	// 	onRequestUserData, // authenticates user (redux-action)
	// }

    const [userCredentials, setUserCredentials] = useState({ email: '', password: ''})
	const { email, password } = userCredentials
	
	const history = useHistory()

	// handle internal state change
	const handleChange = (e) => {

		const { name, value } = e.target
		setUserCredentials({...userCredentials, [name]: value})
	}


	const handleSubmit = (e) => {
		e.preventDefault()

		// collect form data, assign it and fetch results
        const formData = new FormData(e.target);

        // for(let pair of formData.entries()) {
        //     console.log(pair[0]+ ', '+ pair[1]); 
        //  }
         
		const data = {}
		formData.forEach((value, property) => data[property] = value)



		onRequestUserData(data, history)
			
		setUserCredentials({ email: '', password: ''})
	}
	

	// particleJs is used for background styling
    let particleParams = {
	    "particles": {
	        "number": {
	            "value": 160,
	            "density": {
	                "enable": false
	            }
	        },
	        "size": {
	            "value": 5,
	            "random": true,
	            "anim": {
	                "speed": 5,
	                "size_min": 0.5
	            }
	        },
	        "line_linked": {
	            "enable": false
	        },
	        "move": {
	            "random": true,
	            "speed": 1,
	            "direction": "bottom",
	            "out_mode": "out"
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "bubble"
	            }
	        },
	        "modes": {
	            "bubble": {
	                "distance": 250,
	                "duration": 2,
	                "size": 0,
	                "opacity": 0
	            },
	            "repulse": {
	                "distance": 400,
	                "duration": 4
	            }
	        }
	    }
	}

    return (
        <div className='form-page__container'>
			<Particles params={particleParams} />   
            <div className='form__container' style={{height: '22rem'}}>
                <div className='form__title'>
                    <h1>Login</h1>
                </div>
                <form className='form__content' method="POST" onSubmit={handleSubmit}>

                    <div className='form__content--input' >
                        <input type='email' name="email" id="email" value={email} onChange={handleChange} required/>
                        <label className={userCredentials.email.length ? 'shrink-label' : null} htmlFor="email">Email</label>
                    </div>
                    
                    <div className='form__content--input' >
                        <input type="password" name="password" id="password" value={password} onChange={handleChange} minLength="8" required/>
                        <label className={userCredentials.password.length ? 'shrink-label' : null}  htmlFor="password">Password</label>
                    </div>

					<div id='warning'></div>

                    <div className='form__content--submit-btn'>
                        <button type='submit'>Submit</button>
                    </div>

                    <p>
						Or 
						<span className='redirect' onClick={ () => history.push('/register')} >       register 
						</span> 
						if you don't have an account
					</p> 
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
	onRequestUserData: (data, history) => dispatch(requestUserData(data, history))
})

export default connect(null, mapDispatchToProps)(React.memo(LoginPage));