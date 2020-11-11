import { DropzoneDialog } from "material-ui-dropzone";
import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import { Cards } from "../../../../both/collections";
import { useTracker } from "meteor/react-meteor-data";
import { makeStyles } from "@material-ui/core/styles";
import { Meteor } from "meteor/meteor";
import _, { map, object } from "underscore";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
const useStyles = makeStyles({
  importButton: {
    color: "#C8C8C8",
    borderColor: "#C8C8C8",
    "&:hover": {
      backgroundColor: "rgba(72,72,72,0.7)",
      borderColor: "rgba(255, 255, 255)",
      color: "rgba(255, 255, 255)",
    },
  },
});

function MissingCards({ missingCards, open, onClose, selectedValue }) {
  const classes = useStyles();

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <DialogTitle id="simple-dialog-title">
        We were unable to find these cards:
      </DialogTitle>
      {missingCards.map((card, i) => (
        <div className={classes.deckNameContainer} key={i}>
          <p>{card}</p>
        </div>
      ))}
    </Dialog>
  );
}

function importDeck(files, setDeckLength, setCountObj) {
  let reader = new FileReader();
  reader.readAsText(files[0]);

  reader.onload = function () {
    let cardArray = reader.result.split("\n");
    let cardArrayFiltered = cardArray.filter(Boolean);
    const countObj = cardArrayFiltered.reduce((acc, next) => {
      count = next.substr(0, next.indexOf(" "));
      name = next.substr(next.indexOf(" ") + 1);
      return { ...acc, [name]: count };
    }, {});
    setDeckLength(Object.keys(countObj).length);
    setCountObj(countObj);
  };
}

export function DeckImport({ setCurrentDeck, importDeckFinal }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [deckLength, setDeckLength] = useState(0);
  const [missingCards, setMissingCards] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [countObj, setCountObj] = React.useState({});

  let { importCards, isReady } = useTracker(() => {
    const noDataAvailable = { importCards: [] };
    let isReady = false;
    if (!Meteor.user() || countObj == {}) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("cardSearchTwo", Object.keys(countObj));

    if (!handler.ready()) {
      return { noDataAvailable, isLoading: true };
    }

    const cards = Cards.find(
      { name: { $in: Object.keys(countObj) } },
      { sort: { name: 1 } }
    ).fetch();
    const uniqueNames = _.uniq(
      cards.map(function (x) {
        return x.name;
      }),
      true
    );
    const importCards = uniqueNames.map((name) =>
      cards.find(({ name: cName }) => cName === name)
    );
    if (importCards.length > 0 && deckLength > 0) {
      isReady = true;
    }
    return { importCards, isReady };
  });
  let fixedDeck = importCards;

  const openMissingCards = () => {
    setOpenTwo(true);
  };
  const handleClose = (value) => {
    setOpenTwo(false);
    setSelectedValue(value);
  };
  useEffect(() => {
    if (importCards) {
      if (importCards.length < deckLength && isReady) {
        fixedDeck = [];
        Object.keys(countObj).forEach((card) => {
          if (!importCards.some((e) => e.name === card))
            setMissingCards((missingCards) => [...missingCards, card]);
        });
        fixedDeck = importCards.filter(
          (card) => !missingCards.includes(card.name)
        );
        importDeckFinal(fixedDeck, setCurrentDeck, countObj);
        setDeckLength(0);
        setCountObj({});
        openMissingCards();
        isReady = false;
      }
      if (
        (importCards.length > deckLength ||
          importCards.length === deckLength) &&
        isReady
      ) {
        fixedDeck = [];
        importCards.forEach((card) => {
          if (card.name in countObj) fixedDeck.push(card);
        });
        importDeckFinal(fixedDeck, setCurrentDeck, countObj);
        setDeckLength(0);
        setCountObj({});
        isReady = false;
      }
    }
  });

  return (
    <div>
      <div>
        <Button
          variant="outlined"
          color="primary"
          component="label"
          onClick={() => setOpen(true)}
          className={classes.importButton}>
          Import
        </Button>
        <DropzoneDialog
          acceptedFiles={["text/*"]}
          cancelButtonText={"cancel"}
          submitButtonText={"submit"}
          maxFileSize={5000000}
          open={open}
          onClose={() => setOpen(false)}
          onSave={(files) => {
            importDeck(files, setDeckLength, setCountObj);
            setOpen(false);
          }}
          showPreviews={true}
          showFileNamesInPreview={true}
        />
      </div>
      <div>
        <MissingCards
          open={openTwo}
          onClose={handleClose}
          setOpenTwo={setOpenTwo}
          missingCards={missingCards}
          onBackdropClick={handleClose}
          selectedValue={selectedValue}
        />
      </div>
    </div>
  );
}
