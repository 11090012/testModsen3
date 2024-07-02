import { questions } from "./questions.mjs";
const quizContainer = document.getElementById("quiz-container");
const resultsContainer = document.getElementById("results-container");
const questionText = document.getElementById("question-text");
const answerChoices = document.getElementById("answer-choices");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const currentQuestion = document.getElementById("current-question");
const totalQuestions = document.getElementById("total-questions");
const correctAnswers = document.getElementById("correct-answers");
const prevButton = document.getElementById("prev-button");
const endButton = document.getElementById("end-button");
const answerButton = document.getElementById("answer-button");
const answerInstruction = document.getElementById("answer-instruction");
const remainingTimeSpan = document.getElementById("remaining-time");
const themeToggleButton = document.getElementById("theme-toggle-button");
const themeLink = document.getElementById("theme");

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let remainingTime;
let timerInterval;

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  questionText.textContent = question.question;
  answerChoices.innerHTML = "";

  currentQuestion.textContent = currentQuestionIndex + 1;
  answerInstruction.style.display = question.multipleAnswers ? "block" : "none";
  answerButton.style.display = question.multipleAnswers ? "block" : "none";

  question.choices.forEach((choice, index) => {
    const choiceElement = document.createElement("div");
    choiceElement.className = "answer-choice";
    choiceElement.textContent = choice;
    choiceElement.dataset.index = index;

    if (question.multipleAnswers) {
      if (
        userAnswers[currentQuestionIndex] &&
        userAnswers[currentQuestionIndex].includes(index)
      ) {
        choiceElement.classList.add("selected");
        choiceElement.classList.add(
          question.correctChoice.includes(index) ? "correct" : "incorrect"
        );
        choiceElement.removeEventListener("click", toggleAnswerSelection);
        choiceElement.addEventListener("click", function () {
          alert("Вы уже ответили на этот вопрос!");
        });
      } else {
        choiceElement.addEventListener("click", toggleAnswerSelection);
      }
    } else {
      if (userAnswers[currentQuestionIndex] === index) {
        choiceElement.className =
          "answer-choice " +
          (question.correctChoice.includes(index) ? "correct" : "incorrect");
      } else {
        choiceElement.addEventListener("click", selectAnswer);
      }
    }

    answerChoices.appendChild(choiceElement);
  });

  if (userAnswers[currentQuestionIndex]) {
    answerButton.style.display = "none";
  } else {
    answerButton.style.display = question.multipleAnswers ? "block" : "none";
  }
}

function selectAnswer(event) {
  const selectedIndex = parseInt(event.target.dataset.index);

  if (userAnswers[currentQuestionIndex] !== undefined) {
    alert("Вы уже ответили на этот вопрос!");
    return;
  }

  const isCorrect =
    questions[currentQuestionIndex].correctChoice.includes(selectedIndex);

  event.target.className = isCorrect
    ? "answer-choice correct"
    : "answer-choice incorrect";

  if (isCorrect) {
    score++;
  }

  userAnswers[currentQuestionIndex] = selectedIndex;
}

function toggleAnswerSelection(event) {
  const selectedIndex = parseInt(event.target.dataset.index);
  const selectedAnswers = userAnswers[currentQuestionIndex] || [];

  if (selectedAnswers.includes(selectedIndex)) {
    userAnswers[currentQuestionIndex] = selectedAnswers.filter(
      (answer) => answer !== selectedIndex
    );
    event.target.classList.remove("selected");
    event.target.classList.remove("correct");
    event.target.classList.remove("incorrect");
  } else {
    userAnswers[currentQuestionIndex] = [...selectedAnswers, selectedIndex];
    event.target.classList.add("selected");
  }
}

function checkAnswers() {
  const question = questions[currentQuestionIndex];
  const selectedAnswers = userAnswers[currentQuestionIndex] || [];

  if (selectedAnswers.length === 0) {
    alert("Вы не выбрали ни одного варианта ответа.");
    return;
  }

  const isCorrect = question.correctChoice.every((correctIndex) =>
    selectedAnswers.includes(correctIndex)
  );

  if (isCorrect) {
    score++;
  }

  Array.from(answerChoices.children).forEach((choice) => {
    const index = parseInt(choice.dataset.index);
    choice.className = "";

    if (question.correctChoice.includes(index)) {
      if (selectedAnswers.includes(index)) {
        choice.className = "answer-choice correct";
      } else {
        choice.className = "answer-choice incorrect";
      }
    } else {
      if (selectedAnswers.includes(index)) {
        choice.className = "answer-choice incorrect";
      } else {
        choice.className = "answer-choice correct";
      }
    }
  });

  nextButton.disabled = false;
  answerButton.style.display = "none";
  Array.from(answerChoices.children).forEach((choice) => {
    choice.addEventListener("click", function () {
      alert("Вы уже ответили на этот вопрос!");
    });
  });
}

function showResults() {
  quizContainer.style.display = "none";
  resultsContainer.style.display = "block";
  correctAnswers.textContent = `${score} из ${questions.length}`;
  totalQuestions.textContent = questions.length;
}

function restartQuiz() {
  clearInterval(timerInterval);

  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  loadQuestion();
  quizContainer.style.display = "block";
  resultsContainer.style.display = "none";

  remainingTime = questions.length * 10;
  updateTimer();
  startTimer();
}

function confirmEndQuiz() {
  clearInterval(timerInterval);

  const answeredQuestions = userAnswers.filter(
    (answer) => answer !== undefined
  ).length;
  if (answeredQuestions < questions.length) {
    const confirmation = confirm(
      `Вы ответили на ${answeredQuestions} из ${questions.length} вопросов. Вы уверены, что хотите закончить?`
    );
    if (confirmation) {
      showResults();
    }
  } else {
    showResults();
  }
}

function updateTimer() {
  remainingTimeSpan.textContent = remainingTime;
}

function startTimer() {
  timerInterval = setInterval(() => {
    remainingTime--;
    updateTimer();

    if (remainingTime <= 0) {
      showResults();
    }
  }, 1000);
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex >= questions.length) {
    currentQuestionIndex = 0;
  }

  loadQuestion();
});

prevButton.addEventListener("click", () => {
  currentQuestionIndex--;

  if (currentQuestionIndex < 0) {
    currentQuestionIndex = questions.length - 1;
  }

  loadQuestion();
});

endButton.addEventListener("click", confirmEndQuiz);

restartButton.addEventListener("click", restartQuiz);

answerButton.addEventListener("click", checkAnswers);

themeToggleButton.addEventListener("click", () => {
  if (themeLink.getAttribute("href") === "css/dark.css") {
    themeLink.href = "css/styles.css";
  } else {
    themeLink.href = "css/dark.css";
  }
});

remainingTime = questions.length * 10;
updateTimer();
startTimer();

loadQuestion();
totalQuestions.textContent = questions.length;
