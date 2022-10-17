import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import styles from '../styles/RangeSlider.module.css';

function valuetext(value) {
  return `${value}`;
}
const marks = [
  {
    value: 1970,
    label: '1970',
  },
  {
    value: 2022,
    label: '2022',
  },
];

export default function RangeSlider(props) {
  return (
    <>
      <Box
        sx={{
          width: 200,
          alignItems: 'left',
          '& .MuiSlider-markLabel': {
            color: 'white',
          },
        }}>
        <Typography id='input-slider' gutterBottom>
          YEAR
        </Typography>
        <Slider
          style={{ color: 'white', marginRight: '30px' }}
          marks={marks}
          min={1970}
          max={2022}
          getAriaLabel={() => 'Year range'}
          value={props.value}
          onChange={props.onChange}
          valueLabelDisplay='auto'
          getAriaValueText={valuetext}
        />
      </Box>
    </>
  );
}
