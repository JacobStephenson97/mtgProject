import React from 'react';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    card: {
        margin: 3,
        borderRadius: 10,
    }
}))

export default ({ card, card:{imageUrl}, addCard, removeCard, setCurrentDeck, currentDeck }) => {
    const { card: cardClass } = useStyles()
    function handleClick(card) {
        if(typeof addCard !== 'undefined') addCard(card, setCurrentDeck)
        if(typeof removeCard !== 'undefined') removeCard(card, setCurrentDeck, currentDeck)
    }
    return (
        <img  src={imageUrl} alt="" width='187' height='262' className={cardClass} onClick={(e) => handleClick(card)}/>
    )
}