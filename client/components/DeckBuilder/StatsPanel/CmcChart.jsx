import React from 'react';
import {Bar} from 'react-chartjs-2';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';

export default ({ redCount }) => {
  let randomColorGenerator = function () { 
    return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
  };
  const data = {
    labels: ['', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: randomColorGenerator(),
        borderColor: randomColorGenerator(),
        borderWidth: 1,
        hoverBackgroundColor: randomColorGenerator(),
        hoverBorderColor: randomColorGenerator(),
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
    
  };
  return (
        <Bar
        data={data}
        width={"30%"}
        options={{ maintainAspectRatio: false }}

        />
  )}