import React, { useState } from 'react';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import ChooseDialog from '../../Play/ChooseManaDialog/ChooseManaDialog'

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
function tapCard(setIsTapped, card, setManaPoolFunc, manaCount, setManaCount, setOpen, isTapped, manaDefecit, setManaDefecit, manaPool) {
    var hasNumber = /\d/
    if((card.types.includes('Land') || card.types.includes('Artifact')) && !isTapped) {
        let text = card.text.split(".")
        let add = text.filter(line => line.includes('Add'))
        if(!hasNumber.test(add)) {
            if(!add.toString().includes('or')) {
                for(let j = 0; j < add.toString().length; j++) {
                    if ((add.toString().substr(j, 3)) == '{W}') setManaCount(manaCount[0] = manaCount[0] + 1)
                    if ((add.toString().substr(j, 3)) == '{U}') setManaCount(manaCount[1] = manaCount[1] + 1)
                    if ((add.toString().substr(j, 3)) == '{B}') setManaCount(manaCount[2] = manaCount[2] + 1)
                    if ((add.toString().substr(j, 3)) == '{R}') setManaCount(manaCount[3] = manaCount[3] + 1)
                    if ((add.toString().substr(j, 3)) == '{G}') setManaCount(manaCount[4] = manaCount[4] + 1)
                    if ((add.toString().substr(j, 3)) == '{C}') setManaCount(manaCount[5] = manaCount[5] + 1)
                }
                setManaPoolFunc(manaCount)
            } else {
                for(let j = 0; j < add.toString().length; j++) {
                    if ((add.toString().substr(j, 3)) == '{W}') manaCount[0] = manaCount[0] + 1
                    if ((add.toString().substr(j, 3)) == '{U}') manaCount[1] = manaCount[1] + 1
                    if ((add.toString().substr(j, 3)) == '{B}') manaCount[2] = manaCount[2] + 1
                    if ((add.toString().substr(j, 3)) == '{R}') manaCount[3] = manaCount[3] + 1
                    if ((add.toString().substr(j, 3)) == '{G}') manaCount[4] = manaCount[4] + 1
                    if ((add.toString().substr(j, 3)) == '{C}') manaCount[5] = manaCount[5] + 1
                }
                setOpen(true)
            }
        } else {
            for(let j = 0; j < add.toString().length; j++) {
                if ((add.toString().substr(j, 3)) == '{1}') setManaDefecit(manaDefecit[6] = manaDefecit[6] - 1)
            }
            setManaPoolFunc(manaDefecit)
        }
        setIsTapped(true)
    }
}
export default ({ card, card:{imageUrl}, addCard, removeCard, setCurrentDeck, currentDeck, setPlayerOneBattlefield, addToBattlefield, setCurrentHand, currentHand, battlefield, setManaPoolFunc, manaPool }) => {
    const { card: cardClass, cardTapped: cardTapped } = useStyles()
    const [isTapped, setIsTapped] = useState(false)
    const [manaCount, setManaCount] = useState([0,0,0,0,0,0,0])
    const [manaDefecit, setManaDefecit] = useState([0,0,0,0,0,0,0])
    const [open, setOpen] = useState(false)
    function handleClick(card) {
        if(typeof addCard !== 'undefined') addCard(card, setCurrentDeck)
        if(typeof removeCard !== 'undefined') removeCard(card, setCurrentDeck, currentDeck)
        if(typeof addToBattlefield !== 'undefined') addToBattlefield(setPlayerOneBattlefield, card, setCurrentHand, currentHand)
        if(typeof battlefield !== 'undefined') tapCard(setIsTapped, card, setManaPoolFunc, manaCount, setManaCount, setOpen, isTapped, manaDefecit, setManaDefecit, manaPool)
    }
    return (
        <div>    
            {isTapped
            ? <img  src={imageUrl} alt="" width='187' height='262' className={cardTapped} onClick={() => handleClick(card)}/>
            : <img  src={imageUrl} alt="" width='187' height='262' className={cardClass} onClick={() => handleClick(card)}/>}
            {open ? <ChooseDialog open={open} setOpen={setOpen} manaCount={manaCount} setManaCount={setManaCount} card={card} setManaPoolFunc={setManaPoolFunc}/> : null}
        </div>
    )
}