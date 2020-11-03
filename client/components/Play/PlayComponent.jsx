import React, { useState, useEffect, useRef } from "react";
import LoadComponent from "../DeckBuilder/LoadDeckComponent/LoadDeckComponent"
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import MtgCard from '../DeckBuilder/SearchComponent/Card'
import HorizontalScroll from 'react-scroll-horizontal'

const useStyles = makeStyles((theme) => ({
  divOne: {
    position: 'absolute',
    left: 20,
    top: 70
  },
  handArea: {
    display: "flex",
    position: "absolute",
    bottom: 20,
    left: "5%",
    width: "90%",
    height: 290,
    overflowY: "auto",
  },
}));


export default (props) => {
  const classes = useStyles();
  const [currentDeck, setCurrentDeck] = useState([]);
  const [currentHand, setCurrentHand] = useState([]);

  function setFirstHand() {
    setCurrentHand(currentDeck.slice(0, 6))
    console.log('setting hand')
  }
  if (!currentHand) setFirstHand()
  console.log(currentHand)
  return (
    <div>
      <div className={classes.divOne}>
        <LoadComponent setCurrentDeck={setCurrentDeck}/>
      </div>
      <div className={classes.handArea}>
        <HorizontalScroll>
          {
          currentHand.map((card, i)=> (
          <MtgCard card={card} setCurrentDeck={setCurrentDeck} currentDeck={currentDeck} key={i}/>
          ))
          }
        </HorizontalScroll>
      </div>
    </div>
  )
}