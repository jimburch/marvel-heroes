import React, { useState, useEffect } from "react";
import "./App.css";
import { getCharacters } from "./api/characters";

function App() {
  // const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      await getCharacters().then((response) => {
        console.log(response);
      });
    };
    fetchHeroes();
  }, []);

  return (
    <main>
      <div>Main space</div>
    </main>
  );
}

export default App;
