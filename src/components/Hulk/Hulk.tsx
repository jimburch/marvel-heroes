import React from "react";
import styles from "./Hulk.module.css";

export default function Hulk() {
  return (
    <div className={styles.root}>
      <img src="./hulk.png" alt="incredible hulk" />
      <div className={styles.text}>
        <h1>HULK</h1>
        <h1>NEED</h1>
        <h1>BIG</h1>
        <h1>SCREEN</h1>
        <p>OPEN ON DESKTOP</p>
      </div>
    </div>
  );
}
