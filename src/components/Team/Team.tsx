import React from "react";
import styles from "./Team.module.css";

type TeamProps = {
  team: object[];
  setTeam: React.Dispatch<React.SetStateAction<object[]>>;
};

export default function Team({ team, setTeam }: TeamProps) {
  return (
    <div className={styles.root}>
      <h1>Team</h1>
    </div>
  );
}
