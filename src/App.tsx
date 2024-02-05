import React, { useState, useEffect } from "react";
import { Hulk, Results, Team } from "./components";
import styles from "./App.module.css";
import { Hero } from "./types";

function App() {
  const [team, setTeam] = useState<Hero[]>([]);

  useEffect(() => {
    if (team.length === 5) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [team]);

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
