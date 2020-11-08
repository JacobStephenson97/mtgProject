import React, { useState, useEffect, useRef } from "react";
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import MtgCard from '../../SearchComponent/Card'
import {Droppable} from 'react-beautiful-dnd'

const useStyles = makeStyles((theme) => ({
  test: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 187
  },
  test2: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  typeHeader: {
    fontSize: 20,
    fontFamily: "Roboto",
    textAlign: 'center',
    margin: 0
  }
}));


   onDragEnd = result => {
    const {destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

  const column = '5';
  const newCurrentDeck = currentDeck
  const card = (currentDeck.filter(card => card.id == draggableId))
  console.log(result)
  newCurrentDeck.splice(source.index, 1);
  newCurrentDeck.splice(destination.index, 0, card[0])

  setCurrentDeck(newCurrentDeck)

  };


export default ({subDecks, setCurrentDeck, removeCard, search, hoverDelay, currentDeck}) => {
  const classes = useStyles();
  for (let subDeckNumber = 0; subDeckNumber < Object.keys(subDecks).length; subDeckNumber++) {
    let subDeckName = Object.keys(subDecks)[subDeckNumber]
      return(
        <div className={classes.test}>
        <h1 className={classes.typeHeader}>{subDeckName}</h1>
          <Droppable droppableId={subDeckNumber.toString()}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className={classes.test}>
              {subDecks[subDeckName].map((card, i)=> (
                card.name.includes(search)
                ? <MtgCard  card={card} removeCard={removeCard} setCurrentDeck={setCurrentDeck} currentDeck={currentDeck} key={card.id} hoverDelay={`${hoverDelay}s`} index={i}></MtgCard>
                : null
              ))}
              {provided.placeholder}
            </div>
          )}
          </Droppable>
        </div> 
      )
    }
}