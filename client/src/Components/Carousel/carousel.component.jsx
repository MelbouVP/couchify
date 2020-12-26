import React from "react";
import Slider from "react-slick";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './carousel.styles.scss';

const Carousel = ({ sectionName, children, slideCount }) => {

  const settings = {
    // centerPadding: '5rem',
    autoplay: true,
    // draggable: true,
    dots: false,
    // centerMode: true,
    slidesToShow: slideCount ? slideCount : 4,
    speed:400,
    infinite: true,
    initialSlide: 0,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            infinite: true,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
  };
  
  return (
    <div className="carousel">
      {
        sectionName ? 
          <h2 className="carousel__title" >{sectionName}</h2> 
        : null
      }
      <div className="carousel-container">
            {
              children.length ?
                  <Slider {...settings} >
                    {
                      children
                    }
                  </Slider>
                :
                  <div className='carousel-container__similar'>
                    <h2>No information found</h2>
                  </div>
            }
      </div>
    </div>
  );
};

export default React.memo(Carousel);