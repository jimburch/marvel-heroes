import React, { useEffect, useState } from "react";
import { getCharacters } from "../../api/characters";
import styles from "./Results.module.css";
import { HeroCard } from "../../components";
import { Hero, HeroResults } from "../../types";

interface ResultsProps {
  setTeam: React.Dispatch<React.SetStateAction<Hero[]>>;
}

export default function Results({ setTeam }: ResultsProps) {
  const [query, setQuery] = useState("");
  const [heroResults, setHeroResults] = useState<HeroResults>();

  useEffect(() => {
    const fetchHeroes = async () => {
      await getCharacters().then((response) => {
        setHeroResults(response);
      });
    };
    fetchHeroes();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await getCharacters(query).then((response) => {
      setHeroResults(response);
    });
  }

  function handleAddToTeam(e: React.MouseEvent<HTMLButtonElement>, hero: Hero) {
    e.preventDefault();
    setTeam((prevTeam) => [...prevTeam, hero]);
  }

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for an epic hero..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <h1>Results</h1>
      <div className={styles.results}>
        {heroResults?.results.length &&
          heroResults?.results.map((hero: Hero) => (
            <div key={hero.id}>
              <HeroCard
                key={hero.id}
                id={hero.id}
                name={hero.name}
                description={hero.description}
                imageUrl={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
              />
              <button onClick={(e) => handleAddToTeam(e, hero)}>
                Add to Team
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
