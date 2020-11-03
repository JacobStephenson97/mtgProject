import React, { useState, useEffect, useRef } from "react";
import MtgCard from '../../DeckBuilder/SearchComponent/Card'
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  handArea: {
    display: "flex",
    position: "relative",
    right: 10,
    marginLeft: 10
  },
}));

export default ({ currentHand }) => {
  const classes = useStyles();
  return (
    <div className={classes.handArea}>
      {
        currentHand.map((card, i)=> (
        <MtgCard card={card} key={i}/>
        ))
      }
    </div>
  )
}