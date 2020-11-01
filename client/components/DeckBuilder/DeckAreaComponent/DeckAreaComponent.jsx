import React, { useState, useEffect, useRef } from "react";
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import MtgCard from '../SearchComponent/Card'
import { card } from 'mtgsdk';
import Card from "@material-ui/core/Card";
import { InputBase } from "@material-ui/core";

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
}));
function handleValueChange(e, setSearch) {
    setSearch(e.target.value);
}

export default ({currentDeck, removeCard, setCurrentDeck}) => {
  const classes = useStyles();
  const [search, setSearch] = useState('');

  return (
    <div >
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
      <div>
        {
        currentDeck.map((card, i)=> (
        card.name.toLowerCase().includes(search)  
        ? <MtgCard card={card} removeCard={removeCard} setCurrentDeck={setCurrentDeck} currentDeck={currentDeck} key={i}/>
        : null
        ))
        }
      </div>
    </div>
    )
}