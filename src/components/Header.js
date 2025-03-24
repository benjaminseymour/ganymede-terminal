import React from 'react';
import styles from './Header.module.css';

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>PIONEER PATHWAYS</div>
      <div className={styles.shipName}>// STARSHIP ICARUS</div>
    </div>
  );
}

export default Header;
