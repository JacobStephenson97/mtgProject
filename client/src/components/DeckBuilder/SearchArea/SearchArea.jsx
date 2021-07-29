import React, { useState, useEffect, useRef } from "react";
import MtgCards from "../SearchComponent/Cards";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import axios from 'axios';
import SearchBar from "material-ui-search-bar";

const ReactDOM = require('react-dom')

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    width: "48%",
    height: "40%",
    display: "flex",
    flexDirection: "column",
  },
  searchBar: {
    backgroundColor: "white",
    width: "100%",
  },
  inputLabelNoShrink: {
    transform: "translate(52px, 24px) scale(1)"
  },
  cardResultArea: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "white",
    overflow: "scroll",
    width: "100%",
    height: "100%",
    borderRadius: 10
  },
  cardItem: {
    width: "23.5%",
    padding: 5
  },
  singleCard: {
    display: "block",
    width: "100%",
    height: "100%",
    borderRadius: 14
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: 6,
      width: 2,
      backgroundColor: 'transparent'
    },
    '*::-webkit-scrollbar-track': {
      borderRadius: 10,
      backgroundColor: 'transparent'
    },
    '*::-webkit-scrollbar-thumb': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,.3)',
      borderRadius: 10,
      backgroundColor: '#555',
    }
  }
}));



export function SearchArea({ addCard, currentDeck, setCurrentDeck, subscription, setSubscription, collapseSearch }) {
  const classes = useStyles();
  const [focused, setFocused] = useState(false)
  const [cards, setCards] = useState([])
  const [search, setSearch] = useState("");

  const shrink = search.length > 0;
  useEffect(() => {
    if (search) {
      const delayDebounceFn = setTimeout(() => {

        axios({
          method: "GET",
          withCredentials: true,
          url: `http://localhost:3000/api/card/${search}`
        }).then((res) => setCards(res.data.data))
      }, 200)
      return () => clearTimeout(delayDebounceFn)
    }
  }, [search])
  console.log(cards)
  return (
    <div className={classes.searchContainer}>
      <SearchBar
        value={search}
        onChange={(newValue) => setSearch(newValue)}
        onRequestSearch={() => { return }}
      />
      <div className={classes.cardResultArea}>
        {

          cards.length > 0 ?
            cards.map((card, i) => (
              card.count = 0,
              <div className={classes.cardItem}>
                <img src={card?.image_uris?.normal} alt={card?.name} className={classes.singleCard} />
              </div>
            ))
            :
            undefined
        }
      </div>
    </div>

  )
}
