import React from "react";
import styles from "./Skeleton.module.css";
import { Hero } from "../../types";

export default function Skeleton({ team }: { team: Hero[] }) {
  return (
    <div className={styles.root}>
      <div>your code here</div>
    </div>
  );
}
