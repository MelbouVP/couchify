import React from "react";
import Slider from "react-slick";

import MovieCard from '../Movie-card/movie-card.component';
// import Spinner from '../Spinner/spinner.component';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './carousel.styles.scss';

const Carousel = ({ sectionName, moviesData }) => {
  
  const movies = moviesData.length ? 
        moviesData.map( movieData => 
                    <MovieCard key={movieData.id} movieData={movieData} />
        ) 
    :   
        null

  const settings = {
    // centerPadding: '5rem',
    autoplay: true,
    // draggable: true,
    dots: true,
    // centerMode: true,
    slidesToShow: 4,
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
            dots: true
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
            dots: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false
          }
        }
      ]
  };

  return (
    <div className="carousel">
      <h2 className="carousel__title" >{sectionName}</h2>
      <div className="carousel-container">
        {/* {
          moviesData.length ?  */}
            <Slider {...settings} >
              {
                movies
              }
            </Slider>
            {/* :
              <Spinner />
        } */}
      </div>
    </div>
  );
};

export default React.memo(Carousel);