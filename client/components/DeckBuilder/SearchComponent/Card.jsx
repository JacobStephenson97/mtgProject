import React, { useState } from 'react';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import ChooseDialog from '../../Play/ChooseManaDialog/ChooseManaDialog'
import { tapCard } from '../../Play/BattleFieldComponent/TappedFunction/TappedFunction'

const useStyles = makeStyles((theme) => ({
    card: {
        margin: 3,
        borderRadius: 10,
        display: 'flex',
        float: 'left',
        clear: 'none'
    },
    cardTapped: {
        margin: 3,
        borderRadius: 10,
        transform: 'rotate(90deg)',
        transition: 'transform 0.2s linear'
    }
}))

export default ({ card, card:{imageUrl}, addCard, removeCard, setCurrentDeck, currentDeck, setPlayerOneBattlefield, addToBattlefield, setCurrentHand, currentHand, battlefield }) => {
    const { card: cardClass, cardTapped: cardTapped } = useStyles()
    const [isTapped, setIsTapped] = useState(false)
    const [open, setOpen] = useState(false)
    function handleClick(card) {
        if(typeof addCard !== 'undefined') addCard(card, setCurrentDeck)
        if(typeof removeCard !== 'undefined') removeCard(card, setCurrentDeck, currentDeck)
        if(typeof addToBattlefield !== 'undefined') addToBattlefield(setPlayerOneBattlefield, card, setCurrentHand, currentHand)
        if(typeof battlefield !== 'undefined') tapCard(setIsTapped, card, setOpen, isTapped )
    }
    return (
        <div>    
            {isTapped
            ? <img  src={imageUrl} alt="" width='187' height='262' className={cardTapped} onClick={() => handleClick(card)}/>
            : <img  src={imageUrl} alt="" width='187' height='262' className={cardClass} onClick={() => handleClick(card)}/>}
            {open ? <ChooseDialog open={open} setOpen={setOpen} /> : null}
        </div>
    )
}