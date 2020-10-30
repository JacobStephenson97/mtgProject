import React, { useState, useEffect, useRef } from "react";
import { withTracker } from 'meteor/react-meteor-data';
import {Cards} from '../../../both/collections'
import MtgCards from './SearchComponent/Cards'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import { InputBase } from '@material-ui/core';
import DeckArea from './DeckAreaComponent/DeckAreaComponent'
import DeckAreaComponent from "./DeckAreaComponent/DeckAreaComponent";


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
  cardsCard: {
    backgroundColor: 'rgba(72,72,72,0.3)',
  },
  cardsContainer: {
    position: 'absolute',
    left: 20,
    top: 85,
  },
  searchCard: {
    backgroundColor: 'rgba(72,72,72,0.3)',
    marginTop: 20,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 4,
  },
  inputBase: {
    borderRadius: theme.shape.borderRadius,
    height: "6vh",
    padding: theme.spacing(2),
    fontFamily: 'Roboto', 
    fontSize: 30,
    color: "#C8C8C8"
  },
  deckArea: {
    display: 'flex',
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: '98%',
    height: 430,
  },

  deckCard: {
    backgroundColor: 'rgba(72,72,72,0.3)',
    padding: 10,
    height: 400,
    width: '98%',
    overflowY: 'auto'
  }
}));

function handleValueChange(e, setSearch, setSubscription) {
  setSearch(e.target.value)
  setSubscription(Meteor.subscribe('cardSearch', e.target.value))
}

function addCard(cardObject, setCurrentDeck) {
  setCurrentDeck(oldDeck => [...oldDeck, cardObject]);
}
function removeCard(cardObject, setCurrentDeck, currentDeck) {
  let index = currentDeck.map(function(card) {return card.name; }).indexOf(cardObject.name)
  currentDeck.splice(index, 1)
  setCurrentDeck([...currentDeck])
}



export function DeckBuilder(props) {
  const classes = useStyles()
  const { cards } = props;
  const [search, setSearch] = useState('')
  const [subscription, setSubscription] = useState(null)
  const [currentDeck, setCurrentDeck] = useState([])

  return (
    <div>
      <div className={classes.cardsContainer}>
        <Card className={classes.cardsCard}>
          <InputBase type="search"
                value={search}
                onChange={(e) => {
                  if(subscription) subscription.stop()
                  handleValueChange(e, setSearch, setSubscription)
                }}
                id="outlined-full-width"
                fullWidth
                placeholder="Search Cards..."
                variant="outlined"
                className={classes.inputBase}
            />
          </Card>
          <Card className={classes.searchCard}>
            <MtgCards cards={cards} addCard={addCard} setCurrentDeck={setCurrentDeck} currentDeck={currentDeck}/>
          </Card>
      </div>
      <div className={classes.deckArea}>
        <Card className={classes.deckCard}>
         <DeckAreaComponent currentDeck={currentDeck} removeCard={removeCard} setCurrentDeck={setCurrentDeck}/>
        </Card>
      </div>
    </div>
  );
}

export default withTracker(() => {
  return {
      cards: Cards.find().fetch(),
  };  
})(DeckBuilder);
