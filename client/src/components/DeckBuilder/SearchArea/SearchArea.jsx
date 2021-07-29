import React, { useState, useEffect, useRef } from "react";
import MtgCards from "../SearchComponent/Cards";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const ReactDOM = require('react-dom')

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    backgroundColor: "black",
    width: "48%",
    height: "40%"
  },
  searchBar: {
    backgroundColor: "white",
    width: "100%",
  },
  inputLabelNoShrink: {
    transform: "translate(32px, 24px) scale(1)"
  }
}));



export function SearchArea({ addCard, currentDeck, setCurrentDeck, subscription, setSubscription, collapseSearch }) {
  const classes = useStyles();
  const [focused, setFocused] = useState(false)
  const [cards, setCards] = useState([{}])
  const [search, setSearch] = useState("");

  const shrink = search.length > 0;
  useEffect(() => {
    if (search) {
      const delayDebounceFn = setTimeout(() => {
        console.log(search)
        axios({
          method: "GET",
          withCredentials: true,
          url: `http://localhost:3000/api/card/${search}`
        }).then((res) => setCards(res.data.data))
      }, 200)
      return () => clearTimeout(delayDebounceFn)
    }
  }, [search])

  return (
    <div className={classes.searchContainer}>
      <TextField
        id="standard-basic"
        label="Standard" className={classes.searchBar}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputLabelProps={{
          shrink: shrink,
          className: shrink ? undefined : classes.inputLabelNoShrink
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </div>

  )
}
