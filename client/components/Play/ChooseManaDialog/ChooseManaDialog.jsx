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


const useStyles = makeStyles({
  paper: {
    backgroundColor: 'transparent',
  },
  list: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  dialogTitle: {
    color: 'white',
    textAlign: 'center',
    paddingBottom: 0,
    fontSize: 40
  },
  listButton: {
    borderRadius: 100,
    "&:hover": {
      backgroundColor: 'rgba(20, 20, 20, 0.5)',
    },
    width: '18%',
    paddingLeft: 10
  }
});

function SimpleDialog(props) {
  const { onClose, selectedValue, open, card } = props;
  const classes = useStyles();
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (i) => {
    onClose();
  };
  const wubrgc = [<img src='/W.png' width='40' height='40'/>, <img src='/U.png' width='40' height='40'/>, <img src='/B.png' width='40' height='40'/>, <img src='/R.png' width='40' height='40'/>, <img src='/G.png' width='40' height='40'/>, <img src='/C.png' width='40' height='40'/>]
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} PaperProps ={{classes: {root: classes.paper}}}>
      <DialogTitle disableTypography id="simple-dialog-title" className={classes.dialogTitle}>{card.name}</DialogTitle>
      <List className={classes.list}>
{/*         {manaCount.map((mana, i) => (
          mana > 0
          ?<ListItem button onClick={() => handleListItemClick(i)} key={i} className={classes.listButton}>
            <ListItemText />{wubrgc[i]}
          </ListItem>
          : null
        ))} */}
      </List>
    </Dialog>
  );
}

export default function SimpleDialogDemo({open, setOpen, card}) {
  const [selectedValue, setSelectedValue] = React.useState();

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} card={card} />
    </div>
  );
}