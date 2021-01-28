import React, { useState } from 'react';
import { connect } from 'react-redux'

import { useHistory } from 'react-router-dom'

import { registerNewUser} from '../../Redux/user-data/user.actions'

import { toast } from 'react-toastify';
import Particles from 'react-particles-js';

import './form-page.styles.scss';



const RegisterPage = ({ onRegisterNewUser }) => {

	const [userCredentials, setUserCredentials] = useState({ username: '', email: '', password: '', confirmPassword: '' })

	const { username, email, password, confirmPassword } = userCredentials
	
	const history = useHistory()

	const handleChange = (e) => {

		const { name, value } = e.target
		setUserCredentials({...userCredentials, [name]: value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const createWarning = (warningText) => {
			toast.error(`❌ ${warningText}`, {
				position: "bottom-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}

		if(password !== confirmPassword){

			createWarning('Passwords don\'t match. Enter matching passwords')

			setUserCredentials({ username: '', email: '', password: '', confirmPassword: '' })

			return
		} else if (username.length < 6) {

			createWarning('Username must be at least 6 characters long')

			setUserCredentials({ username: '', email: '', password: '', confirmPassword: '' })
			return
		}


		const formData = new FormData(e.target);
		const data = {}
		formData.forEach((value, property) => data[property] = value)
		
		onRegisterNewUser(data, history)

		setUserCredentials({ username: '', email: '', password: '', confirmPassword: '' })
	}
	

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
	            },
	            "onclick": {
	                "enable": true,
	                "mode": "repulse"
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

            <div className='form__container'>
                <div className='form__title'>
                    <h1>Create account</h1>
                </div>
                <form className='form__content' method="POST" onSubmit={handleSubmit}>
                    <div className='form__content--input' >
                        <input type="text" name="username" id="username" value={username} onChange={handleChange} required/>
                        <label className={userCredentials.username.length ? 'shrink-label' : null} htmlFor="username">Username</label>
                    </div>

                    <div className='form__content--input' >
                        <input type='email' name="email" id="email" value={email} onChange={handleChange} required/>
                        <label className={userCredentials.email.length ? 'shrink-label' : null} htmlFor="email">Email</label>
                    </div>
                    
                    <div className='form__content--input' >
                        <input type="password" name="password" id="password" value={password} onChange={handleChange} minLength="8" required/>
                        <label className={userCredentials.password.length ? 'shrink-label' : null}  htmlFor="password">Password</label>
                    </div>

                    <div className='form__content--input' >
                        <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} minLength="8" onChange={handleChange} required/>
                        <label className={userCredentials.confirmPassword.length ? 'shrink-label' : null} htmlFor="confirmPassword">Confirm password</label>
                    </div>

					<div id='warning'></div>

                    <div className='form__content--submit-btn'>
                        <button type='submit'>Submit</button>
                    </div>

					<p>
						Or 
						<span className='redirect' onClick={ () => history.push('/login')} >
							login
						</span> 
						if you are already registered
					</p> 
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
	onRegisterNewUser: (data, history) => dispatch(registerNewUser(data, history))
})


export default connect(null, mapDispatchToProps)(React.memo(RegisterPage));