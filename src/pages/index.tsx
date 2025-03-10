import styles from "../styles/Home.module.css";
import RainEffectBox from "../components/RainEffectBox";

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

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Spectrum Hackathon Timeline</h1>
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
  );
};

export default Home;
