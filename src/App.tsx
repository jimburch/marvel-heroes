import React, { useState } from "react";
import { Results, Team } from "./components";

import "./App.css";

function App() {
  const [team, setTeam] = useState<object[]>([]);

  return (
    <main>
      <h1>Main space</h1>
      <Team team={team} setTeam={setTeam} />
      <Results setTeam={setTeam} />
    </main>
  );
}

export default App;
