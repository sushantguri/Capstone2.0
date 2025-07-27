export default function Card({ title, value, subtitle = "", icon = "" }) {
  return (
    <div className="card">
      <h3>
        {icon} {title}
      </h3>
      <div className="card-value">{value}</div>
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
    </div>
  )
}
