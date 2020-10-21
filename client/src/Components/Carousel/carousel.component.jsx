import React from "react";
import Slider from "react-slick";

import MovieCard from '../Movie-card/movie-card.component';

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
    centerPadding: '140px',
    autoplay: true,
    draggable: true,
    dots: true,
    centerMode: true,
    slidesToShow: 3,
    speed:400,
    infinite: true,
    initialSlide: 0,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 1,
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
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };

  return (
    <div className="container">
      <h2 className="container__title" >{sectionName}</h2>
      <Slider {...settings}>
        {
          movies
        }
      </Slider>
    </div>
  );
};

export default Carousel;