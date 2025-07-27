"use client"

import { useState } from "react"

function BMICalculator() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [result, setResult] = useState("")

  const calculateBMI = () => {
    const w = Number.parseFloat(weight)
    const h = Number.parseFloat(height) / 100

    if (isNaN(w) || isNaN(h) || h === 0) {
      setResult("Please enter valid weight and height.")
      return
    }

    const bmi = w / (h * h)

    let status = ""

    if (bmi < 18.5) status = "Underweight"
    else if (bmi < 24.9) status = "Normal weight"
    else if (bmi < 29.9) status = "Overweight"
    else status = "Obese"

    setResult(`Your BMI is ${bmi.toFixed(2)} (${status})`)
  }

  return (
    <div className="bmi-calculator">
      <h2>BMI Calculator</h2>
      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="bmi-input"
      />
      <input
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        className="bmi-input"
      />
      <button onClick={calculateBMI} className="bmi-button">
        Calculate BMI
      </button>
      <p style={{ marginTop: "15px" }}>{result}</p>
    </div>
  )
}

export default BMICalculator
