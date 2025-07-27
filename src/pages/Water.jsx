"use client"

import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend)

const getTodayDate = () => new Date().toLocaleDateString()

const Water = () => {
  const [allIntake, setAllIntake] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("waterIntake")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const today = getTodayDate()
  const intake = allIntake.filter((entry) => entry.date === today)
  const glasses = intake.reduce((sum, entry) => sum + entry.amount, 0)
  const dailyGoal = Number.parseInt(import.meta.env.VITE_DEFAULT_WATER_GOAL) || 8

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("waterIntake", JSON.stringify(allIntake))
    }
  }, [allIntake])

  useEffect(() => {
    const reminderInterval = Number.parseInt(import.meta.env.VITE_REMINDER_INTERVAL) || 7200000
    const reminder = setInterval(() => {
      if (import.meta.env.VITE_DEBUG_MODE === "true") {
        console.log("💧 Time to drink water and stay hydrated!")
      }
    }, reminderInterval)
    return () => clearInterval(reminder)
  }, [])

  const addGlass = () => {
    const newEntry = { time: new Date().toLocaleTimeString(), amount: 1, date: today }
    setAllIntake([...allIntake, newEntry])
  }

  const chartData = {
    labels: intake.map((entry) => entry.time),
    datasets: [
      {
        label: "Water Intake (glasses)",
        data: intake.map((entry) => entry.amount),
        borderColor: "#1e88e5",
        backgroundColor: "rgba(30,136,229,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Water Intake Progress",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 2,
      },
    },
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #bbdefb, #e3f2fd)",
        padding: "50px 20px",
        fontFamily: "Segoe UI, sans-serif",
        color: "#0d47a1",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 12px 24px rgba(13,71,161,0.2)",
          padding: "40px",
          maxWidth: "800px",
          margin: "0 auto",
          transition: "0.3s",
          position: "relative",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>💧 Water Tracker</h2>
        <p style={{ textAlign: "center" }}>Monitor your daily hydration and maintain a healthy habit.</p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 30,
            padding: "20px",
            backgroundColor: "#e3f2fd",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
          }}
        >
          <h3>
            Glasses Today: {glasses} / {dailyGoal}
          </h3>
          <button
            onClick={addGlass}
            style={{
              padding: "10px 25px",
              border: "none",
              borderRadius: 10,
              backgroundColor: "#42a5f5",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e88e5")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#42a5f5")}
          >
            + Add Glass
          </button>
        </div>

        <div style={{ marginTop: 40 }}>
          <h4 style={{ marginBottom: 10 }}>Today's Intake Chart</h4>
          {intake.length > 0 ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <p style={{ textAlign: "center", color: "gray" }}>No data yet. Start drinking water!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Water
