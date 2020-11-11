import React, { useState, useEffect, useRef } from "react";
import MtgCard from '../../DeckBuilder/SearchComponent/Card'
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  battlfieldArea: {
    display: "flex",
    position: "relative",
    right: 10,
    marginLeft: 10,
    bottom: 50
  },
}));

export default ({ playerOneBattlefield }) => {
  const classes = useStyles();
  return (
    <div className={classes.battlfieldArea}>
      {
        playerOneBattlefield.map((card, i)=> (
        <MtgCard card={card} key={i} battlefield={false}/>
        ))
      }
    </div>
  )
}