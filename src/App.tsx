import React, { useState } from "react";
import { Hulk, Results, Team } from "./components";

import styles from "./App.module.css";
import { Hero } from "./types";

function App() {
  const [team, setTeam] = useState<Hero[]>([]);

  return (
    <main>
      <div className={styles.desktop}>
        <div className={styles.title}>
          <h1>Assemble!</h1>
        </div>
        <Team team={team} setTeam={setTeam} />
        <Results team={team} setTeam={setTeam} />
      </div>
      <Hulk />
    </main>
  );
}

export default App;
