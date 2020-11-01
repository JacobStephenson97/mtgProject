import { DropzoneDialog } from "material-ui-dropzone";
import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import { Cards } from "../../../../both/collections";
import { withTracker } from "meteor/react-meteor-data";
import { makeStyles } from "@material-ui/core/styles";
import { Meteor } from 'meteor/meteor';
import _, { map } from 'underscore';

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

function importDeck(files, setDeckIsReady, setDeckLength, setCountObj, sub, setSubscription) {

  let reader = new FileReader();
  reader.readAsText(files[0]);

  reader.onload = function () {
    let cardArray = reader.result.split("\n");
    let cardArrayFiltered = cardArray.filter(Boolean)
    const countObj = cardArrayFiltered.reduce((acc, next) => {
      count = next.substr(0, next.indexOf(' ')); 
      name = next.substr(next.indexOf(' ') + 1); 
      return {...acc, [name]: count}
    }, {});
    console.log(countObj)
    sub.stop()
    const subscription = Meteor.subscribe('cardSearchTwo', Object.keys(countObj), {onReady() {setDeckIsReady(true)}})
    setDeckLength(Object.keys(countObj).length)
    setCountObj(countObj) 
    setSubscription(subscription)
  };
}

export function DeckImport({importCards, setCurrentDeck, importDeckFinal}) {
  const classes = useStyles()
  const [open, setOpen] = useState(false);
  const [deckIsReady, setDeckIsReady] = useState(false);
  const [deckLength, setDeckLength] = useState(0);
  const [countObj, setCountObj] = useState({});
  const [subscription, setSubscription] = useState({stop(){}})
  console.log(importCards)
  console.log(importCards.length, deckLength)
   useEffect(() => {
     console.log('test')
     console.log(subscription)
    if (deckLength > 0 && importCards.length === deckLength && deckIsReady) {
      console.log('READY')
      importDeckFinal(importCards, setCurrentDeck, countObj) 
      setDeckIsReady(false) 
      setDeckLength(0) 
      setCountObj({})
    }
  })
    return (
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
              importDeck(
              files,
              setDeckIsReady,
              setDeckLength,
              setCountObj,
              subscription,
              setSubscription
              );
            setOpen(false);
            }}
          showPreviews={true}
          showFileNamesInPreview={true}
          />
      </div>
    )
}

export default withTracker(props => {
  const cards = Cards.find({}, { sort: {name: 1}}).fetch();
  const uniqueNames = _.uniq(cards.map(function(x) {return x.name;}), true)
  return {
    importCards: uniqueNames.map(name => cards.find(({ name: cName }) => cName === name))
  };
})(DeckImport);
