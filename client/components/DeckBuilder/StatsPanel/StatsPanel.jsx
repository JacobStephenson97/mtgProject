import React from 'react'
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import MyChart from './ManaChart'
import CmcChart from './CmcChart'
const useStyles = makeStyles((theme) => ({
  deckSize: {
      margin: 10,
      display: 'flex',
      color: "#C8C8C8"
  },
  text: {
    display: 'flex'
  },
  graphsContainer: {
    width: 1050,
    height: 360,
    overflow: 'auto',
    color: 'white',  
    backgroundColor: 'white'
  }
}))
function countLands(currentDeck) {
  const lands = currentDeck.filter(card => card.type.includes('Land'))
  return lands.length
}
function countRedLands(currentDeck) {
  const lands = currentDeck.filter(card => card.type.includes('Land'))
  let redCount = 0
  lands.forEach(land => {
    if(land.text.includes('R')) redCount += 1
  })
  return redCount
}


function countColorTotalCost(currentDeck, color) {
  let colorCount = 0
  currentDeck.forEach(card => {
    if(card.manaCost) {
      for (let i = 0; i < card.manaCost.length; i++) {
        if(card.manaCost[i].includes(color)) colorCount += 1
        }
      }
  })
  return colorCount
}


export default ({currentDeck, toggleGraph}) => {
  const classes = useStyles();
  return (
    <div>
      {toggleGraph
      ?
      <div className={classes.text}>
        <h1 className={classes.deckSize}>Deck Size: {currentDeck.length}</h1>
        <h1 className={classes.deckSize}>Lands: {countLands(currentDeck)}</h1>
      </div>
      :<div className={classes.graphsContainer}>
        <MyChart redCount={countColorTotalCost(currentDeck, 'R')} blueCount={countColorTotalCost(currentDeck, 'U')} greenCount={countColorTotalCost(currentDeck, 'G')} blackCount={countColorTotalCost(currentDeck, 'B')} whiteCount={countColorTotalCost(currentDeck, 'W')}/>
        <CmcChart currentDeck={currentDeck} redCount={countColorTotalCost(currentDeck)}/>
      </div>
      }
    </div>
    )
}