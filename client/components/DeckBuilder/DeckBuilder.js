import React, { useState, useEffect, useRef } from "react";
import { withTracker } from 'meteor/react-meteor-data';
import {Cards} from '../../../both/collections'
import MtgCard from '../CardComponent/Cards'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import { InputBase } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  searchBar: {
    color: 'white',
    opacity: 1,
    fontSize: 100,
  },
  cardsCard: {
    backgroundColor: 'rgba(245,245,245,0.3)',
  },
  cardsContainer: {
    position: 'absolute',
    display: 'flex',
    minWidth: 800,
    maxWidth: 1000,
    height: 830,
    left: 20,
    top: 85
  },
  inputBase: {
    border: '1px solid black',
    borderRadius: theme.shape.borderRadius,
    height: "6vh",
    padding: theme.spacing(2),
    fontFamily: 'Roboto', 
    fontSize: 30
  }
}));

export function DeckBuilder(props) {
  const classes = useStyles()
  const { cards } = props;
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  function handleValueChange(e) {
    setSearch(e.target.value)
    Meteor.subscribe('cards', search)
    if (props.cards) {
    const results = props.cards
    const finishedResults = results.filter(card => (
      card.name.toLowerCase().includes(search.toLowerCase())
    ))
    setSearchResults(finishedResults)
  }
  }
  return (
    <div className={classes.cardsContainer}>
      <Card className={classes.cardsCard}>
        <InputBase type="search"
              value={search}
              onChange={(e) => handleValueChange(e)}
              id="outlined-full-width"
              fullWidth
              placeholder="Search Cards..."
              variant="outlined"
              className={classes.inputBase}
          />
        <MtgCard cards={searchResults}/>
      </Card>
    </div>
  );
}

export default withTracker(() => {
  
  return {
      cards: Cards.find().fetch(),
      
  };  
})(DeckBuilder);
