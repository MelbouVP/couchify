import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/navbar.component';
import Footer from '../../Components/Footer/footer.component';

import './error-page.styles.scss';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }


    // Errorboundary component is responsible for encountered errors and displaying 404 page
  
    // If error is caught
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

  
    // Reset error state
    handleClick = () => {
      this.setState({
        hasError: false
      })
    }
  
    // if no error has been caught then renders child components
    render() {
      if (this.state.hasError) {
        return (
            <div className="error-boundary">
                <Navbar />
                <div className='wrapper'>
                    <div className="content">
                        <h1>Oops, something went wrong.</h1>
                        <p>It seems that you're lost in a perpetual black hole. Let's get back home. </p>
                        <div className="buttons">
                            <Link to='/' onClick={this.handleClick}> Home </Link>
                        </div>
                
                    </div>
                    <div className="space">
                        <div className="blackhole"></div>
                        <div className="planet"></div>
                    </div>
                </div>
                <Footer />
            </div>
        )
      }
  
      return this.props.children; 
    }
  }

export default ErrorBoundary;