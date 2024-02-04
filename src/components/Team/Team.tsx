import React, { useEffect, useState } from "react";
import styles from "./Team.module.css";
import { Hero } from "../../types";
import { Button, HeroCard, Loader } from "../index";
import generateGptResponse from "../../api/openai";

type TeamProps = {
  team: Hero[] | [];
  setTeam: React.Dispatch<React.SetStateAction<Hero[]>>;
};

export default function Team({ team, setTeam }: TeamProps) {
  const [teamName, setTeamName] = useState("");
  const [renderTeamName, setRenderTeamName] = useState(false);

  useEffect(() => {
    if (teamName && team.length < 5) {
      setTeamName("");
    }

    if (team.length === 5) {
      setRenderTeamName(true);
      const fetchTeamName = async () => {
        await generateGptResponse(team).then((response) => {
          setTeamName(response);
        });
      };
      fetchTeamName();
    } else {
      setRenderTeamName(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team]);

  function handleRemoveFromTeam(
    e: React.MouseEvent<HTMLButtonElement>,
    hero: Hero,
  ) {
    e.preventDefault();
    setTeam((prevTeam) => prevTeam.filter((member) => member.id !== hero.id));
  }

  return (
    <div className={styles.root}>
      <div className={styles.teamWrapper}>
        {!team.length ? (
          <div className={styles.centeredText}>Recruit Your Heroes</div>
        ) : null}
        <div
          className={styles.team}
          style={{ opacity: !team.length ? "25%" : "100%" }}
        >
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
      </div>
      {team.length && team.length < 5 ? (
        <p>{`Choose ${5 - team.length} more to complete your team`}</p>
      ) : null}
      {renderTeamName ? (
        <span style={{ marginTop: 20 }}>
          {teamName ? (
            <p className={styles.teamName}>{`Introducing... ${teamName}`}</p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <p className={styles.teamName} style={{ marginRight: 20 }}>
                Introducing
              </p>
              <Loader />
            </div>
          )}
        </span>
      ) : null}
    </div>
  );
}
