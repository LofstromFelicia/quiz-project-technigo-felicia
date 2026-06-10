export const quizData = {
  questions: [
    {
      id: "environment",
      question: "Välj den miljö där du känner dig mest hemma och i din fulla kraft:",
      type: "radio",
      options: [
        { value: "forest", label: "I djupa, tysta och mossbeklädda urskogar" },
        { value: "sea", label: "På stormiga hav bland piskande vågor" },
        { value: "mountain", label: "Uppe på höga, karga och snötäckta fjälltoppar" },
        { value: "hall", label: "I en livlig, fackelupplyst gästabudssal" }
      ]
    },
    {
      id: "weapon",
      question: "Om en konflikt skulle uppstå, vilket verktyg eller egenskap förlitar du dig på?",
      type: "select",
      options: [
        { value: "hammer", label: "Råstyrka och en tung hammare (Mjölnir)" },
        { value: "spear", label: "Visdom, strategi och ett träffsäkert spjut (Gugner)" },
        { value: "wit", label: "List, illusioner och snabba ordväxlingar" },
        { value: "magic", label: "Uråldrig magi, intuition och naturens krafter" }
      ]
    },
    {
      id: "chaos",
      question: "Hur mycket ren kaos-energi (Loke-nivå) besitter du en måndagsmorgon?",
      type: "range",
      min: 1,
      max: 10,
      labels: { min: "Helt harmonisk", max: "Fullständigt ragnarök" }
    }
  ]
}