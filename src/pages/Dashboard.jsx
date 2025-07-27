import Card from "../components/Card.jsx"
import GoalCard from "../components/GoalCard.jsx"
import BMICalculator from "../components/BMICalculator.jsx"
import Footer from "../components/Footer.jsx"
import "../styles/FitnessDashboard.css"

export default function Dashboard() {
  return (
    <div className="dashboard-container" style={{ background: "#f0fff4", paddingBottom: "60px" }}>
      <main className="dashboard-main">
        <h1 style={{ color: "#2e7d32" }}>Hello, Bot!</h1>
        <h3 style={{ marginBottom: "30px" }}>Here's your fitness summary for today</h3>

        <div className="summary-cards">
          <Card title="Steps" value="5,243" icon="📈" />
          <Card title="Calories Burned" value="435 kcal" icon="🔥" />
          <Card title="Active Time" value="45 min" icon="⏱️" />
          <Card title="Heart Rate" value="72 bpm" icon="🫀" />
        </div>

        <div className="detail-cards">
          <Card title="Step Counter" value="4,704 steps" subtitle="Goal: 10,000 steps\nKeep going!" icon="🦶" />
          <Card title="Water Intake" value="4/8 glasses" subtitle="Stay hydrated!" icon="💧" />
          <BMICalculator />
        </div>

        <div className="goal-cards">
          <GoalCard title="Daily Steps" value="5,243 / 10,000" color="green" />
          <GoalCard title="Weekly Workouts" value="3 / 5" color="blue" />
          <GoalCard title="Weight Goal" value="76 / 70 kg" color="purple" />
          <GoalCard title="Sleep Goal" value="6.5 / 8 hrs" color="red" />
          <GoalCard title="Calories Target" value="435 / 2000 kcal" color="orange" />
        </div>

        <section className="report-section" style={{ marginTop: "40px" }}>
          <h2 style={{ color: "#2e7d32", marginBottom: "20px" }}>Workout Report</h2>
          <div className="report-details" style={{ background: "#e8f5e9", borderRadius: "12px", padding: "20px" }}>
            <p>
              <strong>Duration:</strong> 45 mins
            </p>
            <p>
              <strong>Calories Burned:</strong> 435 kcal
            </p>
            <p>
              <strong>Difficulty:</strong> Moderate
            </p>
            <p>
              <strong>Top Exercise:</strong> Jumping Jacks
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
