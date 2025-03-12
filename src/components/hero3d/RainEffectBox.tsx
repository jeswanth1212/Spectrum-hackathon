"use client";
import { useEffect } from "react";
import styles from "../../styles/RainEffect.module.css";

interface Props {
  title: string;
  time: string;
}

const RainEffectBox: React.FC<Props> = ({ title, time }) => {
  useEffect(() => {
    const createRaindrop = (container: HTMLElement) => {
      const raindrop = document.createElement("div");
      raindrop.className = styles.raindrop;
      raindrop.style.left = `${Math.random() * 100}%`;
      raindrop.style.animationDuration = `${Math.random() * 2 + (window.innerWidth <= 640 ? 2 : 1)}s`;
      container.appendChild(raindrop);
      setTimeout(() => raindrop.remove(), window.innerWidth <= 640 ? 4000 : 3000);
    };

    const container = document.getElementById(`rain-${title}`);
    if (container) {
      const interval = setInterval(
        () => createRaindrop(container), 
        window.innerWidth <= 640 ? 500 : 200
      );
      return () => clearInterval(interval);
    }
  }, [title]);

  return (
    <div className={styles.box} id={`rain-${title}`}>
      <h2>{time}</h2>
      <p>{title}</p>
    </div>
  );
};

export default RainEffectBox;
