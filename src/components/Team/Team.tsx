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

  function handleSnap(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setTeam((prevTeam) => {
      const teamCopy = [...prevTeam];
      const numToRemove = Math.random() < 0.5 ? 3 : 2;
      for (let i = 0; i < numToRemove; i++) {
        const randomIndex = Math.floor(Math.random() * teamCopy.length);
        teamCopy.splice(randomIndex, 1);
      }
      return teamCopy;
    });
  }

  function handleTweet(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const referringUrl = window.location.href;
    const tweetText = `${teamName}... Assemble!\n\n${team.map((hero) => `- ${hero.name}`).join("\n")}.\n\nCan you beat this squad?\n\n${referringUrl}`;

    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, "_blank");
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
            <div className={styles.teamNameContainer}>
              <p className={styles.teamName}>{`Introducing... ${teamName}`}</p>
              <button className={styles.teamNameButton} onClick={handleSnap}>
                <img src="./thanos.png" alt="thanos" style={{ width: 75 }} />
              </button>
              <button className={styles.teamNameButton} onClick={handleTweet}>
                <img src="./twitter.png" alt="twitter" style={{ width: 55 }} />
              </button>
            </div>
          ) : (
            <div className={styles.teamNameContainer}>
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
