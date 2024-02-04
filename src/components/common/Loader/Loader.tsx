import React from "react";
import styles from "./Loader.module.css";

// from loading.io/css/
export default function Loader() {
  return (
    <div className={styles["lds-ellipsis"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
