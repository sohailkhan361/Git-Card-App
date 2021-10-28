import React from 'react';
import styles from './Stargame.module.css';

const PlayAgain = props => (
	<div className={styles.gamedone}>
  	<div 
    	className={styles.message}
      style={{ color: props.gameStatus === 'lost' ? 'red' : 'green'}}
    >
  	  {props.gameStatus === 'lost' ? 'Game Over' : 'Nice'}
  	</div>
	  <button onClick={props.onClick}>Play Again</button>
	</div>
);

export default PlayAgain;