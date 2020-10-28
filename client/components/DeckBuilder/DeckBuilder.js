import React from 'react';
import MtgCard from '../CardComponent/Cards'
import { makeStyles, rgbToHex } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardsContainer: {
    height: window.innerHeight - 100,
    overflowY: 'auto'
  }
}));
export default props => {
  const classes = useStyles();
  return (
    <div className={classes.cardsContainer}>
    {
    props.cards.map(card => (
        <MtgCard card={card}/> 
    ))
    }
    </div>
  )
}
