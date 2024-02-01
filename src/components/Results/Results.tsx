import React, { useEffect, useState } from "react";
import { getCharacters } from "../../api/characters";
import styles from "./Results.module.css";

interface ResultsProps {
  setTeam: React.Dispatch<React.SetStateAction<object[]>>;
}

export default function Results({ setTeam }: ResultsProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchHeroes = async () => {
      await getCharacters().then((response) => {
        console.log(response);
      });
    };
    fetchHeroes();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await getCharacters(query).then((response) => {
      console.log(response);
    });
  }

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <h1>Results</h1>
    </div>
  );
}
