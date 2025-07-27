"use client"

import { useState } from "react"

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState({
    name: "Sushant Guri",
    email: "sushant@example.com",
    age: 21,
    height: "5'10\"",
    weight: "70kg",
    goal: "Build Muscle",
    joinDate: "March 2024",
    avatar: "https://i.pravatar.cc/150?img=12",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({ ...prevUser, [name]: value }))
  }

  const toggleEdit = () => setIsEditing(!isEditing)

  const inputStyle = {
    width: "100%",
    marginBottom: 10,
    padding: "8px 12px",
    border: "1px solid #c8e6c9",
    borderRadius: "8px",
    fontSize: "14px",
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e8f5e9, #ffffff)",
        padding: "50px 20px",
        fontFamily: "Segoe UI, sans-serif",
        color: "#2e7d32",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 12px 24px rgba(46,125,50,0.2)",
          padding: "40px",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)"
          e.currentTarget.style.boxShadow = "0 20px 30px rgba(46,125,50,0.3)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)"
          e.currentTarget.style.boxShadow = "0 12px 24px rgba(46,125,50,0.2)"
        }}
      >
        <img
          src={user.avatar || "/placeholder.svg"}
          alt="Profile"
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            marginBottom: 20,
            border: "4px solid #66bb6a",
            boxShadow: "0 6px 12px rgba(102,187,106,0.3)",
          }}
        />
        {isEditing ? (
          <div style={{ textAlign: "left", lineHeight: "1.8" }}>
            <input name="name" value={user.name} onChange={handleChange} placeholder="Name" style={inputStyle} />
            <input name="email" value={user.email} onChange={handleChange} placeholder="Email" style={inputStyle} />
            <input name="age" value={user.age} onChange={handleChange} placeholder="Age" style={inputStyle} />
            <input name="height" value={user.height} onChange={handleChange} placeholder="Height" style={inputStyle} />
            <input name="weight" value={user.weight} onChange={handleChange} placeholder="Weight" style={inputStyle} />
            <input name="goal" value={user.goal} onChange={handleChange} placeholder="Goal" style={inputStyle} />
          </div>
        ) : (
          <>
            <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>{user.name}</h1>
            <p style={{ fontSize: "1.1rem", color: "#4caf50" }}>{user.email}</p>
            <hr style={{ margin: "20px 0", borderColor: "#c8e6c9" }} />
            <div style={{ textAlign: "left", lineHeight: "1.8" }}>
              <p>
                <strong>Age:</strong> {user.age}
              </p>
              <p>
                <strong>Height:</strong> {user.height}
              </p>
              <p>
                <strong>Weight:</strong> {user.weight}
              </p>
              <p>
                <strong>Goal:</strong> {user.goal}
              </p>
              <p>
                <strong>Member Since:</strong> {user.joinDate}
              </p>
            </div>
          </>
        )}

        <button
          style={{
            marginTop: 30,
            padding: "12px 28px",
            backgroundColor: "#66bb6a",
            border: "none",
            borderRadius: 30,
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#2e7d32")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#66bb6a")}
          onClick={toggleEdit}
        >
          {isEditing ? "Save" : "Edit Profile"}
        </button>
      </div>
    </div>
  )
}

export default Profile
