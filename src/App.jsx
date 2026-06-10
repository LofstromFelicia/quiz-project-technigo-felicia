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

  // counting % for progress bar 
  const totalQuestions = quizData.questions.length
  const progressPercentage = typeof currentStep === "number"
    ? Math.round(((currentStep + 1) / totalQuestions) * 100)
    : currentStep === "summary" ? 100 : 0

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
            {currentQuestion.type === "radio" && (
              <div className="radio-group">
                {currentQuestion.options.map((option) => (
                  <label key={option.value} className="radio-label">
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={option.value}
                      checked={answers[currentQuestion.id] === option.value}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === "select" && (
              <div className="select-group">
                <select
                  value={answers[currentQuestion.id]}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                >
                  <option value="">-- Välj ett alternativ --</option>
                  {currentQuestion.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {currentQuestion.type === "range" && (
              <div className="range-group">
                <div className="range-labels">
                  <span>{currentQuestion.labels.min}</span>
                  <span>{currentQuestion.labels.max}</span>
                </div>
                <input
                  type="range"
                  min={currentQuestion.min}
                  max={currentQuestion.max}
                  value={answers[currentQuestion.id]}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, Number(e.target.value))}
                />
                <div className="range-current-value">
                  Valt värde: <strong>{answers[currentQuestion.id]}</strong>
                </div>
              </div>
            )}
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
            <p>
              <strong>Miljö:</strong>{" "}
              {answers.environment === "forest" && "I djupa, tysta och mossbeklädda urskogar"}
              {answers.environment === "sea" && "På stormiga hav bland piskande vågor"}
              {answers.environment === "mountain" && "Uppe på höga, karga och snötäckta fjälltoppar"}
              {answers.environment === "hall" && "I en livlig, fackelupplyst gästabudssal"}
              {answers.environment || "Inget valt"}
            </p>
            <p>
              <strong>Verktyg:</strong>{" "}
              {answers.weapon === "hammer" && "Råstyrka och en tung hammare (Mjölnir)"}
              {answers.weapon === "spear" && "Visdom, strategi och ett träffsäkert spjut (Gungner)"}
              {answers.weapon === "wit" && "List, illusioner och snabba ordväxlingar"}
              {answers.weapon === "magic" && "Uråldrig magi, intuition och naturens krafter"}
              {answers.weapon || "Inget valt"}
            </p>
            <p>
              <strong>Kaos-energi:</strong> <span>{answers.chaos} av 10</span>
            </p>
          </div>

          <button onClick={handleRestart} className="restart-btn">Gör testet igen!</button>
        </div>
      )}
    </div>
  )
}
