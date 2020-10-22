import React from 'react';
import { makeStyles } from '@bit/mui-org.material-ui.styles';
import Slider from '@bit/mui-org.material-ui.slider';

const useStyles = makeStyles({
  root: {
    width: 150,
    margin: 'auto',
    textAlign: 'center'
  },
});

const RangeSlider = ({ handleRangeChange }) => {
  const classes = useStyles();
  const [value, setRangeValue] = React.useState([1980, 2020]);

  const handleChange = (event, newRangeValue) => {
    setRangeValue(newRangeValue);
    handleRangeChange(newRangeValue)
  };

  return (
    <div className={classes.root}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={1920}
        max={2020}
      />
        <h2>{value[0]}-{value[1]}</h2>
    </div>
  );
}

export default RangeSlider;
