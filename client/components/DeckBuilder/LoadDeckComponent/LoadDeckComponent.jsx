import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { Meteor } from 'meteor/meteor';
import { withTracker } from "meteor/react-meteor-data";
import { Decks } from '../../../../both/collections'

const useStyles = makeStyles({
  deckNameContainer: {
    display: 'flex',
    direction: 'horizontal',
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
});
function DeleteConfirm(props) {
  const classes = useStyles()
  const { onClose, selectedValue, open, deckId, setOpenTwo} = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleDelete = (DeckId) => {
    Decks.remove(DeckId)
    setOpenTwo(false)
  }

  handleCloseTwo = () => {
    setOpenTwo(false)
  }
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Are you sure you want to delete?</DialogTitle>
      <Button onClick={() => handleDelete(deckId)}>Yes</Button>
      <Button onClick={handleCloseTwo}>No</Button>
    </Dialog>
  )
}
function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, decks, setCurrentDeck, loadDeck, setDeckName} = props;
  const [openTwo, setOpenTwo] = React.useState(false);
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (chosenDeck) => {
    loadDeck(chosenDeck.deck, setCurrentDeck)
    setDeckName(chosenDeck.name)
    onClose();
  };

  const handleClickOpenTwo = () => {
    setOpenTwo(true);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Pick a Deck</DialogTitle>
      <List>
       {decks.map((deck) => (
         <div className={classes.deckNameContainer}>
          <ListItem button onClick={() => handleListItemClick(deck)} key={deck.name} className={classes.deckButton}>
            <ListItemText primary={deck.name} />
          </ListItem>
          <Button className={classes.removeButton} onClick={() => handleClickOpenTwo()}>Delete</Button>
          <DeleteConfirm selectedValue={selectedValue} open={openTwo} onClose={handleClose} deckId={deck._id} setOpenTwo={setOpenTwo}/>
          </div>
        ))
        }
      </List>
    </Dialog>
  );
}

export function LoadComponent({ decks, setCurrentDeck, loadDeck, deckName, setDeckName }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.loadButton}>
        Load Deck
      </Button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} decks={decks} setCurrentDeck={setCurrentDeck} loadDeck={loadDeck} deckName={deckName} setDeckName={setDeckName}/>
    </div>
  );
}

export default withTracker(() => {
  Meteor.subscribe('decks', Meteor.userId())
  return {
    decks: Decks.find().fetch()
  };
})(LoadComponent);