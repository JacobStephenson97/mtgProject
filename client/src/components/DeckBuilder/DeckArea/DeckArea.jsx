import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';


const ReactDOM = require('react-dom')

const useStyles = makeStyles((theme) => ({
    searchContainer: {
        backgroundColor: "blue",
        width: "100%",
        height: "50%",
        marginTop: 50
    }
}));

function handleValueChange(e, setSearch, setSubscription) {
    setSearch(e.target.value);
}


export function DeckArea({ addCard, currentDeck, setCurrentDeck, search, setSearch, subscription, setSubscription, collapseSearch }) {
    const classes = useStyles();
    const [focused, setFocused] = useState(false)
    const [cards, setCards] = useState([{}])

    return (
        <div className={classes.searchContainer}>

        </div>

    )
}
export default DeckArea;