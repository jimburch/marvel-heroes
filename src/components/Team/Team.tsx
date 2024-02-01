import React from "react";
import styles from "./Team.module.css";
import { Hero } from "../../types";
import HeroCard from "../HeroCard/HeroCard";

type TeamProps = {
  team: Hero[] | [];
  setTeam: React.Dispatch<React.SetStateAction<Hero[]>>;
};

export default function Team({ team, setTeam }: TeamProps) {
  function handleRemoveFromTeam(
    e: React.MouseEvent<HTMLButtonElement>,
    hero: Hero,
  ) {
    e.preventDefault();
    setTeam((prevTeam) => prevTeam.filter((member) => member.id !== hero.id));
  }

  return (
    <div className={styles.root}>
      <div className={styles.team}>
        {team.length
          ? team.map((hero: Hero) => (
              <div key={hero.id} className={styles.hero}>
                <HeroCard
                  id={hero.id}
                  name={hero.name}
                  description={hero.description}
                  imageUrl={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                />
                <button onClick={(e) => handleRemoveFromTeam(e, hero)}>
                  Remove from Team
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
