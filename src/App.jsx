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

  // Function for get creature result 
  const getVasenResult = () => {
    const { environment, weapon, chaos } = answers

    // Loke (high chaos-energy + list or gästabudssal)
    if (chaos >= 7 || weapon === "wit") {
      return {
        name: "Loke",
        image: "/loki.jpg",
        wikiUrl: "https://sv.wikipedia.org/wiki/Loke",
        desc: "Du är listig, oförutsägbar och full av kaos-energi! Precis som Loke använder du din skärpa och dina ord för att vända situationer till din fördel. Ingen vet riktigt var de har dig, men tråkigt blir det aldrig."
      }
    }

    // Tor (Strength, hammer, stormy seas or mountains)
    if (weapon === "hammer" || environment === "sea" || environment === "mountain") {
      return {
        name: "Tor",
        image: "/tor.jpg",
        wikiUrl: "https://sv.wikipedia.org/wiki/Tor",
        desc: "Du är fylld av råstyrka, lojalitet och mod! Som asaguden Tor möter du utmaningar med huvudet först och backar aldrig för en storm. Du skyddar dina nära och kära med allt du har."
      }
    }
    // Oden (Wisdom, strategy, deep woods)
    if (weapon === "spear" || environment === "forest") {
      if (weapon === "magic") {
        // Skogsrået (Magic + forest)
        return {
          name: "Ett Skogsrå",
          image: "/skogsra.png",
          wikiUrl: "https://sv.wikipedia.org/wiki/Skogsr%C3%A5et",
          desc: "Du är mystisk, bunden till naturen och besitter en uråldrig intuition. Liksom Skogsrået trivs du bäst i det dolda, vaktar dina hemligheter noga och har en magisk dragningskraft som fascinerar andra."
        }
      }
      return {
        name: "Oden",
        image: "/odin.jpg",
        wikiUrl: "https://sv.wikipedia.org/wiki/Oden",
        desc: "Du är vis, strategisk och ständigt på jakt efter kunskap. Som Allfader Oden offrar du gärna det lilla för att förstå det stora hela. Du talar när det behövs och leder andra med din mentala styrka."
      }
    }
    // fallback if no match perfectly 
    return {
      name: "Ett uråldrigt väsen",
      image: "/urandligt.jpg",
      wikiUrl: "https://sv.wikipedia.org/wiki/Nordisk_mytologi",
      desc: "Du har en unik blandning av egenskaper från gamla tiders myter. Du är svårfångad, balanserad och bär på krafter som ännu inte har visat sitt fulla ansikte för världen."
    }
  }

  const vasen = getVasenResult();

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

          {/* Visual Progress Bar */}
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Indicator of how far you are into the quiz*/}
          <span className="progress-text">Steg {currentStep + 1} av {quizData.questions.length} ({progressPercentage}%)</span>

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
          <span style={{ color: "#dfb15b", fontSize: "1.2rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px" }}>Ditt sanna inre avslöjas...</span>

          <h1 style={{ marginTop: "10px", fontSize: "3rem" }}>{vasen.name}</h1>

          <div style={{ width: "100%", borderRadius: "8px", margin: "20px 0", border: "1px solid #334252", backgroundColor: "#151b24" }}>
            <img
              src={vasen.image}
              alt={vasen.name}
              style={{ width: "100%", height: "100%", maxHeight: "400px", objectFit: "contain", display: "block" }}
            />
          </div>

          <p className="vasen-desc" style={{ fontStyle: "italic", color: "#e2e8f0", marginBottom: "40px" }}>
            "{vasen.desc}"
          </p>

          <div style={{ marginBottom: "30px" }}>
            <a
              href={vasen.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#dfb15b", textDecoration: "underline", fontSize: "1rem", fontWeight: "500" }}
            >
              Läs mer om {vasen.name} på Wikipedia ↗
            </a>
          </div>

          <div className="results-list">
            <h3 style={{ color: "#dfb15b", marginBottom: "15px", fontSize: "1.1rem" }}>Dina gjorda val under vandringen:</h3>
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

          <button onClick={handleRestart} className="restart-btn">Vandra igen!</button>
        </div>
      )}
    </div>
  )
}
