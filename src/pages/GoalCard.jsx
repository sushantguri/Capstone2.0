export default function GoalCard({ title, value, color }) {
  return (
    <div className="goal-card">
      <h4>{title}</h4>
      <div className="goal-value">{value}</div>
      <div className="progress-bar">
        <div className={`progress-fill ${color}`}></div>
      </div>
    </div>
  )
}
