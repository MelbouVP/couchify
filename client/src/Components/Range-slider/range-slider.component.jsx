import React from 'react';
import './range-slider.styles.scss';
import Slider from '@material-ui/core/Slider';


const RangeSlider = ({ handleRangeChange }) => {

  // RangeSlider component is responsible for displaying interactive date range slider.

  // props = {
  //   handleRangeChange // passes date range changes to parent component (MovieFilter)
  // }

  const currentYear = parseInt(new Date().toISOString().replace('T', ' ').substr(0, 4))
  

  const [value, setRangeValue] = React.useState([1980, currentYear]);


  // handles internal state changes for display purposes and passes changes to parent component
  const handleChange = (event, newRangeValue) => {
    setRangeValue(newRangeValue);
    handleRangeChange(newRangeValue)
  };

  return (
    <div className="slider__container">
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={1900}
        max={currentYear}
      />
        <h2 className='range-slider__dates'>{value[0]} - {value[1]}</h2>
    </div>
  );
}

export default React.memo(RangeSlider);
