import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  size?: "large" | "medium";
  type?: "button" | "submit";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function Button({
  size = "medium",
  type = "button",
  onClick,
  children,
  disabled,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={styles[size]}
    >
      {children}
    </button>
  );
}
