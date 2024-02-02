import React, { useEffect, useState } from "react";
import { getCharacters } from "../../api/characters";
import styles from "./Results.module.css";
import { HeroCard } from "../../components";
import { Hero, HeroResults } from "../../types";

interface ResultsProps {
  team: Hero[] | [];
  setTeam: React.Dispatch<React.SetStateAction<Hero[]>>;
}

export default function Results({ team, setTeam }: ResultsProps) {
  const [query, setQuery] = useState("");
  const [heroResults, setHeroResults] = useState<HeroResults>();
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroes = async () => {
      await getCharacters({}).then((response) => {
        setHeroResults(response);
      });
    };
    fetchHeroes().then(() => setIsLoading(false));
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) {
    e.preventDefault();
    setIsLoading(true);
    setOffset(0);
    await getCharacters({ search: query })
      .then((response) => {
        setHeroResults(response);
      })
      .then(() => setIsLoading(false));
  }

  async function handlePagination(
    e: React.MouseEvent<HTMLButtonElement>,
    direction: "prev" | "next",
  ) {
    e.preventDefault();
    setIsLoading(true);
    const newOffset = direction === "prev" ? offset - 10 : offset + 10;
    await getCharacters({ search: query, offset: newOffset })
      .then((response) => {
        setHeroResults(response);
      })
      .then(() => setIsLoading(false));
    setOffset(newOffset);
  }

  function handleAddToTeam(e: React.MouseEvent<HTMLButtonElement>, hero: Hero) {
    e.preventDefault();
    if (team.length < 5 && !team.find((member) => member.id === hero.id)) {
      setTeam((prevTeam) => [...prevTeam, hero]);
    }
  }

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for an epic hero..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
        <button
          onClick={() => {
            setQuery("");
            const inputElement = document.querySelector(
              'input[type="text"]',
            ) as HTMLInputElement;
            if (inputElement) {
              inputElement.value = "";
            }
          }}
        >
          Reset
        </button>
      </form>

      {heroResults?.results.length && !isLoading ? (
        <div style={{ width: "100%" }}>
          <div className={styles.pagination}>
            <p>{`Showing results ${offset + 1}-${Math.min(offset + 10, heroResults?.total || 0)} of ${heroResults?.total}`}</p>
            <button
              disabled={!offset}
              onClick={(e) => handlePagination(e, "prev")}
            >
              Previous
            </button>
            <button
              onClick={(e) => handlePagination(e, "next")}
              disabled={(offset + 1) * 10 >= heroResults?.total}
            >
              Next
            </button>
          </div>
          <div className={styles.results}>
            {heroResults?.results.map((hero: Hero) => (
              <div key={hero.id} className={styles.hero}>
                <HeroCard
                  key={hero.id}
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
      ) : isLoading ? (
        <img src="/captain-america-loader.gif" alt="loading" />
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}
