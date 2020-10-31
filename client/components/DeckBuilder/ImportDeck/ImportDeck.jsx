import { DropzoneDialog } from "material-ui-dropzone";
import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import { Cards } from "../../../../both/collections";
import { withTracker } from "meteor/react-meteor-data";
import { makeStyles } from "@material-ui/core/styles";
import { Meteor } from 'meteor/meteor';
import _, { map } from 'underscore';



function importDeck(files, setDeckIsReady, setState, sub) {

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
    setState({deckLength : Object.keys(countObj).length, countObj, subscription})
  };
}

export class DeckImport extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      deckIsReady: false,
      deckLength: 0,
      countObj: {},
      subscription: {stop(){}}
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.deckLength > 0 && this.props.importCards.length === this.state.deckLength && this.state.deckIsReady) {
      this.props.importDeckFinal(this.props.importCards, this.props.setCurrentDeck, this.state.countObj) 
      this.setState({deckIsReady: false, deckLength : 0, countObj: {}})
    }
  }

  render() {
    console.log(this.state.deckLength, this.props.importCards.length)
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          component="label"
          onClick={() => this.setState({open: true})}>
          Upload
          </Button>
          <DropzoneDialog
          acceptedFiles={["text/*"]}
          cancelButtonText={"cancel"}
          submitButtonText={"submit"}
          maxFileSize={5000000}
          open={this.state.open}
          onClose={() => this.setState({open: false})}
          onSave={(files) => {
              importDeck(
              files,
              (deckIsReady) => this.setState({deckIsReady}),
              (state) => this.setState(state),
              this.state.subscription
              );
            this.setState({open: false});
            }}
          showPreviews={true}
          showFileNamesInPreview={true}
          />
      </div>
    )
  }
}


export default withTracker(props => {
  const cards = Cards.find({}, { sort: {name: 1}}).fetch();
  const uniqueNames = _.uniq(cards.map(function(x) {return x.name;}), true)
  console.log(cards)
  return {
    importCards: uniqueNames.map(name => cards.find(({ name: cName }) => cName === name))
  };
})(DeckImport);
