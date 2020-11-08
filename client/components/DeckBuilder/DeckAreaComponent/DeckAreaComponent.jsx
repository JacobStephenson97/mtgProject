import React, { useState, useEffect, useRef } from "react";
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import MtgCard from '../SearchComponent/Card'
import { card } from 'mtgsdk';
import Card from "@material-ui/core/Card";
import { InputBase } from "@material-ui/core";
import {DragDropContext } from 'react-beautiful-dnd'

import DeckHeading from './DeckHeadingComponent/DeckHeadingComponent'

const useStyles = makeStyles((theme) => ({
  inputBase: {
    borderRadius: theme.shape.borderRadius,
    height: 10,
    padding: 10,
    marginBottom: 10,
    fontFamily: "Roboto",
    fontSize: 20,
    color: "#C8C8C8",
  },
  test: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 187
  },
  test2: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  typeHeader: {
    fontSize: 20,
    fontFamily: "Roboto",
    textAlign: 'center',
    margin: 0
  }
}));
function handleValueChange(e, setSearch) {
    setSearch(e.target.value);
}

export default ({currentDeck, removeCard, setCurrentDeck}) => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  //OPTION FOR HOVER DELAY, SET UP LATER
  const [hoverDelay, setHoverDelay] = useState(0)
  let newArr = currentDeck.filter(card => card.type.includes('Creature'))
  let newArr2 = currentDeck.filter(card => card.type.includes('Instant'))
  const [subDecks, setSubDecks] = useState([])
  subDecks.Creature = newArr
  subDecks.Instant = newArr2

  return (
    <div>
      <InputBase
        type="search"
        id="outlined-full-width"
        fullWidth
        placeholder="Search Deck..."
        variant="outlined"
        className={classes.inputBase}
        autoComplete="off"
        onChange={(e) => {
          handleValueChange(e, setSearch);
        }}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={classes.test2}>
          <DeckHeading subDecks={subDecks} setCurrentDeck={setCurrentDeck} removeCard={removeCard} search={search} hoverDelay={hoverDelay} currentDeck={currentDeck}/>
        </div>
      </DragDropContext>
    </div>
    )
}