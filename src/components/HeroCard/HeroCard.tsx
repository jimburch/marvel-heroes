import React from "react";
import styles from "./HeroCard.module.css";

interface HeroProps {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export default function HeroCard({
  id,
  name,
  description,
  imageUrl,
}: HeroProps) {
  return (
    <div className={styles.root}>
      <h2>{name}</h2>
      <img className={styles.image} src={imageUrl} alt={name} />
      <p>{description}</p>
    </div>
  );
}
