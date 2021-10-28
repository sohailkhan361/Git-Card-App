import React from 'react';
import styles from './Stargame.module.css';
const StarsDisplay = props => (
    <>
      {utils.range(1, props.count).map(starId => (
        <div key={starId} className={styles.star} />
      ))}
    </>
  );

 // Math science
 const utils = {
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),
};

export default StarsDisplay;