import { DropzoneDialog } from "material-ui-dropzone";
import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import { Cards } from "../../../../both/collections";
import { withTracker } from "meteor/react-meteor-data";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  toggleGraphButton: {
    color: "#C8C8C8",
    borderColor: "#C8C8C8",
    "&:hover": {
      backgroundColor: "rgba(72,72,72,0.7)",
      borderColor: "rgba(255, 255, 255)",
      color: "rgba(255, 255, 255)",
    },
  }
}));


function importDeck(files, setMountainCount, setIslandCount, setSwampCount, setPlainsCount, setForestCount) {

  let reader = new FileReader();
  reader.readAsText(files[0]);

  reader.onload = function () {
    let newCardArray = [];
    let cardArray = reader.result.split("\n");
    for (let i = 0; i < cardArray.length; i++) {
      if (cardArray[i].includes("1 ")) {
        newCardArray.push(cardArray[i].slice(2));
      } else {
        if (cardArray[i].includes("Mountain")) {
          let count = parseInt(cardArray[i].slice(0, 2), 10);
          setMountainCount(count)
        }
        if (cardArray[i].includes("Island")) {
          let count = parseInt(cardArray[i].slice(0, 2), 10);
          setIslandCount(count)
        }
        if (cardArray[i].includes("Swamp")) {
          let count = parseInt(cardArray[i].slice(0, 2), 10);
          setSwampCount(count)
        }
        if (cardArray[i].includes("Plains")) {
          let count = parseInt(cardArray[i].slice(0, 2), 10);
          setPlainsCount(count)
        }
        if (cardArray[i].includes("Forest")) {
          let count = parseInt(cardArray[i].slice(0, 2), 10);
          setForestCount(count)
        }
        newCardArray.push(cardArray[i].slice(3));
      }
      Meteor.subscribe("cardSearchTwo", newCardArray[i]);
    }
  };
}

export const DeckImport = ({currentDeck, setCurrentDeck, importCards, importDeckFinal}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [mountainCount, setMountainCount] = useState(0);
  const [islandCount, setIslandCount] = useState(0);
  const [swampCount, setSwampCount] = useState(0);
  const [plainsCount, setPlainsCount] = useState(0);
  const [forestCount, setForestCount] = useState(0);

  return (
    <div>
      <Button
        className={classes.toggleGraphButton}
        variant="outlined"
        color="primary"
        component="label"
        onClick={() => setOpen(true)}>
        Upload
        </Button>
        <DropzoneDialog
        acceptedFiles={["text/*"]}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        open={open}
        onClose={() => setOpen(false)}
        onSave={(files) => {
            importDeck(
            files,
            setMountainCount,
            setIslandCount,
            setSwampCount,
            setPlainsCount,
            setForestCount
            );
          setOpen(false);
          }}
        showPreviews={true}
        showFileNamesInPreview={true}
        />
        <Button
        className={classes.toggleGraphButton}
        variant="outlined"
        color="primary"
        onClick={() => importDeckFinal(importCards, setCurrentDeck, mountainCount, islandCount, swampCount, plainsCount, forestCount)}>
        Import
        </Button>
    </div>
  )
}


export default withTracker(props => {
  return {
    importCards: Cards.find().fetch(),
  };
})(DeckImport);
