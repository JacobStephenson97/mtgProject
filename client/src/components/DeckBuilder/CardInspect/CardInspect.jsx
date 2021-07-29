import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';


const ReactDOM = require('react-dom')

const useStyles = makeStyles((theme) => ({
    cardInspectContainer: {
        backgroundColor: "green",
        width: "48%",
        height: "40%",
        float: 'right',
        marginLeft: '4%'
    }
}));

// function CardInspect(e, setSearch, setSubscription) {
//     setSearch(e.target.value);
// }


export function CardInspect({ addCard, currentDeck, setCurrentDeck, search, setSearch, subscription, setSubscription, collapseSearch }) {
    const classes = useStyles();
    const [focused, setFocused] = useState(false)
    const [cards, setCards] = useState([{}])

    return (
        <div className={classes.cardInspectContainer}>


        </div>

    )
}
export default CardInspect;