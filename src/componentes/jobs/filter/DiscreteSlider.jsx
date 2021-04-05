import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: '500$',
  },
  {
    value: 500,
    label: '500$',
  },
  {
    value: 1000,
    label: '1000$',
  },
  {
    value: 1500,
    label: '+1500$',
  },
];

function valuetext(value) {
  return `${value}$`;
}

export default function DiscreteSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Slider
        defaultValue={20}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={5}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </div>
  );
}