import React, { useState, useEffect, useRef } from "react";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";
import MtgCard from "../../SearchComponent/Card";
import { Droppable } from "react-beautiful-dnd";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 187,
    paddingBottom: 260,
  },
  typeHeader: {
    fontSize: 20,
    fontFamily: "Roboto",
    textAlign: "center",
    margin: 0,
  },
  droppableArea: {
    width: 187,
    height: 100,
  },
}));

export default ({
  subDecks,
  setCurrentDeck,
  removeCard,
  search,
  hoverDelay,
  currentDeck,
}) => {
  const classes = useStyles();

  return subDecks.map((deck, key) => {
    let subDeckLength = deck.length - 1;
    return (
      <div className={classes.cardContainer} key={key}>
        <h1 className={classes.typeHeader}>
          {subDecks[key][0]} {subDeckLength}
        </h1>
        <Droppable
          droppableId={key.toString()}
          className={classes.droppableArea}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={classes.cardContainer}>
              {subDecks[key].length > 0
                ? deck.map((card, i) =>
                    card.name ? (
                      card.name.includes(search) ? (
                        <MtgCard
                          card={card}
                          removeCard={removeCard}
                          setCurrentDeck={setCurrentDeck}
                          currentDeck={currentDeck}
                          key={card.id + i}
                          hoverDelay={`${hoverDelay}s`}
                          index={i}></MtgCard>
                      ) : null
                    ) : null
                  )
                : null}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  });
};
