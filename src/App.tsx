import React, { useState } from "react";
import { Results, Team } from "./components";

import "./App.css";
import { Hero } from "./types";

function App() {
  const [team, setTeam] = useState<Hero[]>([]);

  return (
    <main>
      <h1>Assemble!</h1>
      <h3>Build Your Team. Save the World.</h3>
      <Team team={team} setTeam={setTeam} />
      <Results setTeam={setTeam} />
    </main>
  );
}

export default App;
