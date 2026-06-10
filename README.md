# Which Norse Entity Are You? 🌌

An interactive and atmospheric quiz built with React and Vite. Users navigate through a series of mystical questions to reveal which Norse god or mythological creature hides within their inner self.

## View it live
🔗 [Check out the live project here!](INSERT_YOUR_NETLIFY_OR_VERCEL_LINK_HERE)

---

## About the Project

This project is an assignment focused on mastering dynamic state management, conditional rendering, and complex input handling (radio buttons, select dropdowns, and range sliders) in React.

### My Approach & Design Choices
* **Theme & Aesthetics:** I chose to move away from generic minimalism to create a "dark and moody" visual experience inspired by Norse mythology and the Northern Lights. The background features a vibrant aurora borealis, and the main card utilizes a subtle teal glow to seamlessly blend into the environment.
* **Historical Illustrations:** Instead of modern stock icons, I integrated classic, historical paintings by renowned artists like John Bauer and Mårten Eskil Winge. These images are hosted locally within the project to ensure rapid loading times and give the result page an authentic, mythological weight.
* **Code Architecture:** The quiz is fully data-driven via an external `quizData` module. User responses are dynamically saved into a single state object within `App.jsx`. Upon completion, a custom matching function evaluates the combined parameters (environment, choice of tool, and level of chaos energy) to output the perfect mythical match.

### Next Steps (If I Had More Time)
If I were to expand upon this project in the future, I would like to:
1.  Implement smooth page transitions and micro-animations between questions to elevate the user experience.
2.  Add a wider array of questions and expand the entity gallery for an even more precise and complex outcome.

---

## Tools & Tech Stack
* **React & JSX** – Component structure and core state logic
* **Vite** – Fast and modern development frontend tooling
* **CSS3** – Flexbox, custom gradients, and tailored styling for dark mode
* **Vanilla JS** – Advanced conditional logic for result calculation

## Credits & Attributions
* **Favicon:** [Rune icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/rune)
---