import React, { useState, useEffect, useRef } from "react";
import { makeStyles, rgbToHex } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  manaPoolPips: {
    position: 'relative',
    textAlign: 'center',
    color: 'white'
  },
  centerText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '-webkit-text-stroke': '3px black',
    fontSize: 52,
    fontFamily: 'Roboto',
    fontWeight: 'bolder'
  },
  manaPoolPipsContainer: {
    display:'flex',
    position: 'absolute',
    bottom: 305,
    left: "5%"
  }
}));

export default ({manaPool}) => {
  const classes = useStyles();
  return (
    <div className={classes.manaPoolPipsContainer}>
      {
      manaPool[0] > 0 || manaPool[0] < 0
      ?<div className={classes.manaPoolPips}>
        <img src='./W.png' width='64' height='64'/>
        <div className={classes.centerText}>{manaPool[0]}</div>
      </div>
      : null
      }
      {
      manaPool[1] > 0 || manaPool[1] < 0
      ?<div className={classes.manaPoolPips}>
        <img src='./U.png' width='64' height='64'/>
        <div className={classes.centerText}>{manaPool[1]}</div>
      </div>
      : null
      }
      {
      manaPool[2] > 0 || manaPool[2] < 0
      ?<div className={classes.manaPoolPips}>
        <img src='./B.png' width='64' height='64'/>
        <div className={classes.centerText}>{manaPool[2]}</div>
      </div>
      : null
      }
      {
      manaPool[3] > 0 || manaPool[3] < 0
      ?<div className={classes.manaPoolPips}>
        <img src='./R.png' width='64' height='64'/>
        <div className={classes.centerText}>{manaPool[3]}</div>
      </div>
      : null
      }
      {
      manaPool[4] > 0 || manaPool[4] < 0
      ?<div className={classes.manaPoolPips}>
        <img src='./G.png' width='64' height='64'/>
        <div className={classes.centerText}>{manaPool[4]}</div>
      </div>
      : null
      }
      {
      manaPool[5] > 0 || manaPool[5] < 0
      ?<div className={classes.manaPoolPips}>
        <img src='./C.png' width='64' height='64'/>
        <div className={classes.centerText}>{manaPool[5]}</div>
      </div>
      : null
      }
      {
      manaPool[6] > 0 || manaPool[6] < 0
      ?<div className={classes.manaPoolPips}>
        <img src='./Generic.png' width='64' height='64'/>
        <div className={classes.centerText}>{manaPool[6]}</div>
      </div>
      : null
      }
    </div>
  )
}