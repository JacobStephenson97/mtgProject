import React from 'react';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import MtgCard from '../SearchComponent/Card'
import { card } from 'mtgsdk';


export default ({currentDeck, removeCard, setCurrentDeck}) => {
  return (
    <div>
      {
      currentDeck.map(card => (
        <MtgCard card={card} removeCard={removeCard} setCurrentDeck={setCurrentDeck} currentDeck={currentDeck}/>
      ))
      }
    </div>
    )
}