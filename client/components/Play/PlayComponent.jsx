import React, { useState, useEffect, useRef } from "react";
import LoadComponent from "../DeckBuilder/LoadDeckComponent/LoadDeckComponent"
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import MtgCard from '../DeckBuilder/SearchComponent/Card'
import HorizontalScroll from 'react-scroll-horizontal'
import HandArea from "./HandAreaComponent/HandArea";
import Button from '@material-ui/core/Button';
import BattlefieldComponent from './BattleFieldComponent/BattleFieldComponent'
import ManaPips from './ManaPips/ManaPips'

const useStyles = makeStyles((theme) => ({
  handContainer: {
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
  },
  bfContainer: {
    position: 'absolute',
    left: '5%',
    bottom: 320    
  },
  pipArea: {
    position: 'absolute',
    bottom: 310,
    left: "5%"
  }
}));

function shuffle(array, setCurrentDeck) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  setCurrentDeck(array) 
}

function drawCard(currentDeck, setCurrentHand, setCurrentDeck) {
  setCurrentHand((oldHand) => [...oldHand, currentDeck[0]]);
  setCurrentDeck(currentDeck.slice(1))
}

function addToBattlefield(setPlayerBattlefield, card, setCurrentHand, currentHand) {
    setPlayerBattlefield((oldBattlefield) => [...oldBattlefield, card]);
    setCurrentHand(currentHand.filter(handCard => handCard != card))
}

export default (props) => {
  const classes = useStyles();
  const [currentDeck, setCurrentDeck] = useState([]);
  const [currentHand, setCurrentHand] = useState(null);
  const [playerOneBattlefield, setPlayerOneBattlefield] = useState([])
  let manaPool = [0,0,2,0,0,0,0]

  if (!currentHand && currentDeck.length > 1) {
    shuffle(currentDeck, setCurrentDeck)
    setCurrentHand(currentDeck.slice(0,7))
    setCurrentDeck(currentDeck.slice(7))
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
      <div className={classes.handContainer}>
        <LoadComponent setCurrentDeck={setCurrentDeck}/>
        {currentDeck.length > 0 ? <Button onClick={() => shuffle(currentDeck, setCurrentDeck)} variant="contained" color="primary">Shuffle Deck</Button> : null }
        {currentDeck.length > 0 ? <Button onClick={() => drawCard(currentDeck, setCurrentHand, setCurrentDeck)} variant="contained" color="primary">Draw Card</Button> : null }
      </div>
      <div className={classes.handArea} id='handArea' onWheel={onWheel}>
        {
            currentHand
            ? <HandArea currentHand={currentHand} setPlayerOneBattlefield={setPlayerOneBattlefield} addToBattlefield={addToBattlefield} setCurrentHand={setCurrentHand}/>
            : null
        }
      </div>
      <div className={classes.bfContainer}>
       <BattlefieldComponent playerOneBattlefield={playerOneBattlefield}/>
      </div>
      {//<ManaPips />
      }
    </div>
  )
}
