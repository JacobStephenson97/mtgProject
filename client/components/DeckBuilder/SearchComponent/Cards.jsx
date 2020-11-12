import React from "react";
import MtgCard from "./Card";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardsContainer: {
    width: window.innerWidth - 100,
    height: "95%",
    overflowY: "auto",
    direction: "horizontal",
    width: "98%",
    position: "absolute",
    marginTop: 10,
  },
  "@global": {
    "*::-webkit-scrollbar": {
      width: 6,
      width: 2,
      backgroundColor: "transparent",
    },
    "*::-webkit-scrollbar-track": {
      borderRadius: 10,
      backgroundColor: "transparent",
    },
    "*::-webkit-scrollbar-thumb": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,.3)",
      borderRadius: 10,
      backgroundColor: "#555",
    },
  },
}));

export default ({ cards, addCard, setCurrentDeck, currentDeck, imageSize }) => {
  const classes = useStyles();
  if (cards) {
    return (
      <div className={classes.cardsContainer}>
        {cards.map(
          (card, i) => (
            (card.count = 0),
            (
              <MtgCard
                card={card}
                addCard={addCard}
                setCurrentDeck={setCurrentDeck}
                currentDeck={currentDeck}
                key={i}
                imageSize={imageSize}
              />
            )
          )
        )}
      </div>
    );
  } else return <div></div>;
};
