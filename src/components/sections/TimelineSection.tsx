import React from 'react';
import styles from "../../styles/Home.module.css";
import RainEffectBox from "../hero3d/RainEffectBox";

const events = [
  { time: "10:00 AM", title: "Opening Ceremony" },
  { time: "11:00 AM", title: "Team Formation" },
  { time: "12:00 PM", title: "Hacking Begins" },
  { time: "3:00 PM", title: "Mentor Sessions" },
  { time: "6:00 PM", title: "First Checkpoint" },
  { time: "10:00 PM", title: "Midnight Surprise Event" },
  { time: "8:00 AM", title: "Final Submissions" },
  { time: "10:00 AM", title: "Judging Starts" },
  { time: "12:00 PM", title: "Closing Ceremony" },
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="min-h-screen pt-8 pb-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2>TIMELINE</h2>
        <div className={styles.container}>
      <div className={styles.timeline}>
        {events.map((event, index) => (
          <div
            key={index}
            className={`${styles.timelineItem} ${
              index % 2 === 0 ? styles.left : styles.right
            }`}
          >
            <RainEffectBox title={event.title} time={event.time} />
          </div>
        ))}
      </div>
    </div>
      </div>
    </section>
  );
} 

