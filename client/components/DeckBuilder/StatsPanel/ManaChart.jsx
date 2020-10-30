import React from 'react';
import {Polar} from 'react-chartjs-2';


export default ({ redCount, blueCount, greenCount, whiteCount, blackCount }) => {
  const data = {
    datasets: [{
      data: [
        greenCount,
        blueCount,
        redCount,
        whiteCount,
        blackCount
      ],
      backgroundColor: [
        'rgba(0,115,62)',
        'rgba(14,104,171)',
        'rgba(211,32,42)',
        'rgba(249,250,244)',
        'rgba(21,11,0)'
      ],
      label: 'My dataset' // for legend
    }],
    labels: [
      'Green',
      'Blue',
      'Red',
      'White',
      'Black'
    ]
  
  };
  return(
      <div>
        <Polar data={data}
        width={350}
        height={350}
        options={{ maintainAspectRatio: false }} />
      </div>
)};

