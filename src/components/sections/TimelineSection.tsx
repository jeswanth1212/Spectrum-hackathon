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
        <h2 className="text-center font-['Megrim'] text-white" style={{ fontSize: "4.3rem" }}>TIMELINE</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto mb-8" style={{ marginTop: "-1.5rem" }}></div>
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

