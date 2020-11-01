import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Decks } from "../../../../both/collections"
import { Meteor } from 'meteor/meteor';
import { withTracker } from "meteor/react-meteor-data";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  saveButton: {
    color: "#C8C8C8",
    borderColor: "#C8C8C8",
    "&:hover": {
      backgroundColor: "rgba(72,72,72,0.7)",
      borderColor: "rgba(255, 255, 255)",
      color: "rgba(255, 255, 255)",
    },
  },
    deckButton: {
    padding: 10,
    fontFamily: 'Roboto',
    marginLeft: 10,
  },
  removeButton: {
    color: 'red',
    marginRight: 10,
  },
  loadButton: {
    color: "#C8C8C8",
    borderColor: "#C8C8C8",
    "&:hover": {
      backgroundColor: "rgba(72,72,72,0.7)",
      borderColor: "rgba(255, 255, 255)",
      color: "rgba(255, 255, 255)",
    },
  },
  paper: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    minWidth: '12%',
  },
  deckButton: {
    fontSize: 20,
    fontFamily: "Roboto"
  },
  dialogTitle: {
    fontSize: 30,
    textAlign: 'center'
  }
});
export function SaveComponent({currentDeck, decks, deckName, setDeckName}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    let Id = Decks.findOne({ name: deckName });
    if(Id) Decks.update({ _id: Id._id}, {userID: Meteor.userId(), name: deckName, deck: currentDeck})
    else Decks.insert({ userID: Meteor.userId(), name: deckName, deck: currentDeck})
    handleClose()
  } 
  const handleValueChange = (e) => {
    setDeckName(e.target.value)
  }
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.saveButton}>
        Save Deck
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" PaperProps ={{classes: {root: classes.paper}}}>
        <DialogTitle id="form-dialog-title">Save Deck</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your deck.
          </DialogContentText>
          <TextField
            autoFocus
            onChange={(e) => {
              handleValueChange(e);
            }}
            value={deckName}
            margin="dense"
            id="name"
            label="Deck Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save Deck
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withTracker(() => {
  Meteor.subscribe('decks', Meteor.userId())
  return {
    decks: Decks.find().fetch()
  };
})(SaveComponent);