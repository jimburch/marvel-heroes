import React, { useState } from "react";
import { Results, Team } from "./components";

import styles from "./App.module.css";
import { Hero } from "./types";

function App() {
  const [team, setTeam] = useState<Hero[]>([]);

  return (
    <main>
      <div className={styles.title}>
        <h1>Assemble!</h1>
        <h3>Build Your Team. Save the World.</h3>
      </div>
      <Team team={team} setTeam={setTeam} />
      <Results team={team} setTeam={setTeam} />
    </main>
  );
}

export default App;
