import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import styles from '../styles/RadioGroup.module.css';

export default function RowRadioButtonsGroup(props) {
  return (
    <FormControl className={styles.radioGroup}>
      <FormLabel style={{ color: 'white' }}>TYPE</FormLabel>
      <Box>
        <RadioGroup
          row
          aria-labelledby='radio-buttons-group'
          name='radio-buttons'
          sx={{
            '& .Mui-checked': {
              color: 'white',
            },
          }}>
          <FormControlLabel
            value=''
            control={<Radio />}
            onChange={props.onChange}
            label='Any'
          />
          <FormControlLabel
            value='movie'
            control={<Radio />}
            onChange={props.onChange}
            label='Movies'
          />
          <FormControlLabel
            value='series'
            control={<Radio />}
            onChange={props.onChange}
            label='Series'
          />
          <FormControlLabel
            value='episode'
            control={<Radio />}
            onChange={props.onChange}
            label='Episodes'
          />
          <FormControlLabel
            value='other'
            onChange={props.onChange}
            control={<Radio />}
            label='other'
          />
        </RadioGroup>
      </Box>
    </FormControl>
  );
}
