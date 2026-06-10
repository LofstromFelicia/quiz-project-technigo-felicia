import { useState } from "react"
import { quizData } from "./quizData"

export const App = () => {
  const [currentStep, setCurrentStep] = useState("intro")

  // Checks users answers 
  const [answers, setAnswers] = useState({
    environment: "",
    weapon: "",
    chaos: 5,
  })

  // help function for updating answers dynamicly
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }))
  }

  // function to go to next step
  const handleNextStep = () => {
    if (currentStep === "intro") {
      setCurrentStep(0)
    } else if (currentStep === quizData.questions.length - 1) {
      setCurrentStep("summary")
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  // function to restart quiz
  const handleRestart = () => {
    setCurrentStep("intro")
    setAnswers({
      environment: "",
      weapon: "",
      chaos: 5,
    })
  }

  const currentQuestion = quizData.questions[currentStep]

  return (
    <div className="quiz-container">
      {/* INTRO/STARTPAGE */}
      {currentStep === "intro" && (
        <div className="step-card intro-card">
          <h1>Vilket nordiskt väsen är du?</h1>
          <p>Svara på våra mystiska frågor och ta reda på vilken kraft som döljer sig i ditt inre.</p>
          <button onClick={handleNextStep}>Starta din vandring</button>
        </div>
      )}

      {/* FRÅGOR */}
      {typeof currentStep === "number" && (
        <div className="step-card question-card">
          {/* Indicator of how far you are into the quiz*/}
          <span className="progress-text">Fråga {currentStep + 1} av {quizData.questions.length}</span>

          <h2>{currentQuestion.question}</h2>

          <div className="input-container">
            {/* Map of Input to next step */}
            <p style={{ color: "#aaa" }}>Inputs för typen "{currentQuestion.type}" kommer här...</p>
          </div>

          <button onClick={handleNextStep} className="next-btn">
            {currentStep === quizData.questions.length - 1 ? "Se ditt resultat" : "Gå vidare"}
          </button>
        </div>
      )}

      {/* RESULTS */}
      {currentStep === "summary" && (
        <div className="step-card summary-card">
          <h2>Ditt sanna väsen har avslöjats!</h2>
          <p>Här är en sammanfattning av dina val:</p>

          <div className="results-list">
            <p><strong>Miljö:</strong> {answers.environment || "Inget valt"}</p>
            <p><strong>Verktyg:</strong> {answers.weapon || "Inget valt"}</p>
            <p><strong>Kaos-energi:</strong> {answers.chaos} / 10</p>
          </div>

          <button onClick={handleRestart} className="restart-btn">Gör testet igen!</button>
        </div>
      )}
    </div>
  )
}
