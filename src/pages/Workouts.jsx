"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const COLORS = ["#66bb6a", "#81c784", "#a5d6a7", "#c8e6c9", "#dcedc8", "#e6ee9c", "#fff59d"]

const difficultyMap = {
  1: "Easy",
  2: "Medium",
  3: "Hard",
}

const fallbackWorkouts = [
  {
    id: 1,
    name: "Push-ups",
    category: { name: "Strength" },
    difficulty: 2,
    equipment: [{ name: "Body weight" }],
    muscles: [{ name: "Chest" }, { name: "Triceps" }],
  },
  {
    id: 2,
    name: "Squats",
    category: { name: "Strength" },
    difficulty: 2,
    equipment: [{ name: "Body weight" }],
    muscles: [{ name: "Quadriceps" }, { name: "Glutes" }],
  },
  {
    id: 3,
    name: "Plank",
    category: { name: "Core" },
    difficulty: 1,
    equipment: [{ name: "Body weight" }],
    muscles: [{ name: "Core" }, { name: "Shoulders" }],
  },
  {
    id: 4,
    name: "Jumping Jacks",
    category: { name: "Cardio" },
    difficulty: 1,
    equipment: [{ name: "Body weight" }],
    muscles: [{ name: "Full body" }],
  },
  {
    id: 5,
    name: "Burpees",
    category: { name: "Cardio" },
    difficulty: 3,
    equipment: [{ name: "Body weight" }],
    muscles: [{ name: "Full body" }],
  },
]

const Workouts = () => {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState(null)

  const API_URL = import.meta.env.VITE_WORKOUT_API_URL || "https://wger.de/api/v2/exerciseinfo/"
  const API_TIMEOUT = Number.parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000

  useEffect(() => {
    const controller = new AbortController()

    const fetchWorkouts = async () => {
      try {
        setLoading(true)
        setError(null)

        const timeoutId = setTimeout(() => {
          controller.abort()
        }, API_TIMEOUT)

        const response = await fetch(`${API_URL}?limit=20&language=2`, {
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Only update state if component is still mounted
        if (!controller.signal.aborted) {
          setWorkouts(data.results || [])
          setLoading(false)
        }
      } catch (err) {
        // Only handle errors if not aborted due to component unmount
        if (err.name !== "AbortError" && !controller.signal.aborted) {
          console.error("Error fetching workout data:", err)
          console.log("Using fallback workout data")
          setWorkouts(fallbackWorkouts)
          setError(null) // Clear error since we have fallback data
          setLoading(false)
        }
      }
    }

    fetchWorkouts()

    // Cleanup function
    return () => {
      controller.abort()
    }
  }, [API_URL, API_TIMEOUT])

  const formatMuscleData = (muscles) => {
    if (!muscles || muscles.length === 0) return []
    return muscles.map((muscle, index) => ({
      name: muscle.name,
      value: 1,
      color: COLORS[index % COLORS.length],
    }))
  }

  const filteredWorkouts = workouts.filter((workout) => {
    const term = searchTerm.toLowerCase()

    const nameMatch = workout.name?.toLowerCase().includes(term)
    const categoryMatch = workout.category?.name?.toLowerCase().includes(term)
    const equipmentMatch = workout.equipment?.some((eq) => eq.name.toLowerCase().includes(term))
    const muscleMatch = workout.muscles?.some((muscle) => muscle.name.toLowerCase().includes(term))

    return nameMatch || categoryMatch || equipmentMatch || muscleMatch
  })

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px", fontSize: "1.3rem", color: "#4caf50" }}>
        Loading workout data...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px", fontSize: "1.2rem", color: "#f44336" }}>
        Error loading workouts: {error}
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5fbf8",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#2c3e50",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "700",
          fontSize: "2.8rem",
          color: "#2e7d32",
          textTransform: "uppercase",
          letterSpacing: "3px",
        }}
      >
        🏃 FitnessBee Workouts
      </h1>

      <div style={{ maxWidth: 400, margin: "0 auto 40px auto" }}>
        <input
          type="text"
          placeholder="Search workouts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: "1rem",
            borderRadius: 8,
            border: "2px solid #66bb6a",
            outline: "none",
          }}
        />
      </div>

      {filteredWorkouts.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#999" }}>
          {searchTerm ? `No workouts found matching "${searchTerm}"` : "No workouts available"}
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "25px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {filteredWorkouts.map((workout) => {
            const muscleData = formatMuscleData(workout.muscles)

            return (
              <div
                key={workout.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "16px",
                  boxShadow: "0 4px 10px rgba(46, 125, 50, 0.15), 0 2px 6px rgba(46, 125, 50, 0.1)",
                  padding: "25px 30px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h2 style={{ color: "#2e7d32", fontWeight: "700", fontSize: "1.7rem" }}>{workout.name}</h2>

                <p>
                  <strong>Category:</strong> {workout.category?.name || "N/A"}
                </p>
                <p>
                  <strong>Difficulty:</strong> {difficultyMap[workout.difficulty] || "Unknown"}
                </p>
                <p>
                  <strong>Equipment:</strong>{" "}
                  {workout.equipment?.length > 0 ? workout.equipment.map((eq) => eq.name).join(", ") : "None"}
                </p>

                <div
                  style={{
                    marginTop: "15px",
                    borderTop: "1px solid #c8e6c9",
                    paddingTop: "15px",
                  }}
                >
                  <h3 style={{ color: "#2e7d32", marginBottom: "12px" }}>Workout Report</h3>

                  <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                    <div style={{ width: 150, height: 150 }}>
                      {muscleData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={muscleData}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={60}
                              fill="#66bb6a"
                              label
                            >
                              {muscleData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value, name) => [value, name]} />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <p style={{ fontSize: 14, color: "#777" }}>No muscle data</p>
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 150 }}>
                      <p>
                        <strong>Total muscles targeted:</strong> {muscleData.length}
                      </p>
                      <p>
                        <strong>Primary muscles:</strong>{" "}
                        {muscleData.length > 0 ? muscleData.map((m) => m.name).join(", ") : "N/A"}
                      </p>
                      <p>
                        <strong>Estimated duration:</strong> 20 - 40 mins
                      </p>
                      <p>
                        <strong>Calories burned:</strong> ~150 - 350 kcal
                      </p>
                      <p>
                        <strong>Difficulty level:</strong> {difficultyMap[workout.difficulty] || "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Workouts
