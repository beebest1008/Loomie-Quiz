document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".question button");
  const resultSection = document.querySelector(".result");

  const scores = {
    Judicio: 0,
    Conquero: 0,
    Socio: 0,
    Origino: 0
  };

  const allQuestions = document.querySelectorAll(".question");
  const mainQuestions = Array.from(allQuestions).filter(q => !q.hasAttribute("data-bonus"));
  const bonusQuestions = Array.from(allQuestions).filter(q => q.hasAttribute("data-bonus"));

  let currentQuestion = 0;

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      const parent = this.closest(".question");
      const type = this.getAttribute("data-type");

      // Add to score if it's a scored answer
      if (type && scores.hasOwnProperty(type)) {
        scores[type]++;
      }

      // Hide current question
      parent.style.display = "none";

      // If it's a bonus question, stop here
      if (parent.hasAttribute("data-bonus")) {
        return;
      }

      // Go to next main question
      currentQuestion++;
      const next = mainQuestions[currentQuestion];

      if (next) {
        next.style.display = "block";
      } else {
        showResult();
      }
    });
  });

  function showResult() {
    let topScore = 0;
    let resultType = "";

    // Find the personality with the highest score
    for (let type in scores) {
      if (scores[type] > topScore) {
        topScore = scores[type];
        resultType = type;
      }
    }

    // Hide non-matching results
    const resultBlocks = resultSection.querySelectorAll("h3");
    resultBlocks.forEach(block => {
      if (!block.textContent.includes(resultType)) {
        block.style.display = "none";
        block.nextElementSibling.style.display = "none";
      }
    });

    // Show result section
    resultSection.style.display = "block";
    resultSection.scrollIntoView({ behavior: "smooth" });

    // Reveal bonus questions
    bonusQuestions.forEach(q => {
      q.style.display = "block";
    });
  }

  // Start with only the first main question visible
  allQuestions.forEach(q => {
    q.style.display = "none";
  });

  if (mainQuestions.length > 0) {
    mainQuestions[0].style.display = "block";
  }
});
