import React from "react";
import styles from "./Team.module.css";
import { Hero } from "../../types";
import { Button, HeroCard } from "../index";

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
        {Array.from({ length: 5 }).map((_, index) => {
          const hero = team[index];
          return (
            <div key={index} className={styles.hero}>
              {hero ? (
                <HeroCard
                  name={hero.name}
                  description={hero.description}
                  imageUrl={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                />
              ) : (
                <HeroCard skeleton />
              )}
              {hero && (
                <Button onClick={(e) => handleRemoveFromTeam(e, hero)}>
                  Disband
                </Button>
              )}
            </div>
          );
        })}
      </div>
      <p>{`Choose ${5 - team.length} more to complete your team`}</p>
    </div>
  );
}
