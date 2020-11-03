import React, { useState, useEffect, useRef } from "react";
import LoadComponent from "../DeckBuilder/LoadDeckComponent/LoadDeckComponent"
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import MtgCard from '../DeckBuilder/SearchComponent/Card'
import HorizontalScroll from 'react-scroll-horizontal'
import HandArea from "./HandAreaComponent/HandArea";


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
    width: '91%',
    height: 280,
    overflowX: "auto",
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: 6,
      backgroundColor: 'transparent',
      height: 0
    }
  }
}));


export default (props) => {
  const classes = useStyles();
  const [currentDeck, setCurrentDeck] = useState([]);
  const [currentHand, setCurrentHand] = useState(null);
  if (!currentHand && currentDeck.length > 1) {
    setCurrentHand(currentDeck.slice(0,7))
    console.log(currentHand)
    console.log(currentDeck)
  } 
  const onWheel = e => {
    e.preventDefault();
    const container = document.getElementById("handArea");
    const containerScrollPosition = document.getElementById("handArea").scrollLeft;
    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY,
      behaviour: "smooth"
    });
};
  return (
    <div>
      <div className={classes.divOne}>
        <LoadComponent setCurrentDeck={setCurrentDeck}/>
      </div>
      <div className={classes.handArea} id='handArea' onWheel={onWheel}>
        {
            currentHand
            ? <HandArea currentHand={currentHand}/>
            : null
        }
      </div>
    </div>
  )
}
