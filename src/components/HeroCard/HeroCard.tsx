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
      <img className={styles.image} src={imageUrl} alt={name} />
      <h2>{name}</h2>
      <p>
        {description.slice(0, 100)}
        {description.length > 100 ? "..." : ""}
      </p>
    </div>
  );
}
