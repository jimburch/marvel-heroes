import React from "react";
import styles from "./HeroCard.module.css";

interface BaseHeroProps {
  skeleton?: boolean;
}

interface SkeletonHeroProps extends BaseHeroProps {
  skeleton: true;
  name?: string;
  description?: string;
  imageUrl?: string;
}

interface RegularHeroProps extends BaseHeroProps {
  skeleton?: false;
  name: string;
  description: string;
  imageUrl: string;
}

type HeroProps = SkeletonHeroProps | RegularHeroProps;

export default function HeroCard({
  name,
  description,
  imageUrl,
  skeleton,
}: HeroProps) {
  return (
    <div
      className={styles.root}
      style={{ opacity: !skeleton ? "100%" : "50%" }}
    >
      <div className={styles.container}>
        <img
          src={!skeleton ? imageUrl : "./avengers-logo.jpg"}
          alt={!skeleton ? name : "avengers logo"}
        />
      </div>
      <h2>{!skeleton ? name : "Hero"}</h2>
      {!skeleton ? (
        <p>
          {description.slice(0, 100)}
          {description.length > 100 ? "..." : ""}
        </p>
      ) : null}
    </div>
  );
}
