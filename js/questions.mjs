const questions = [
  {
    question: "Cтолица Франции?",
    choices: ["Париж", "Лондон", "Берлин", "Мадрид"],
    correctChoice: [0],
    multipleAnswers: false,
  },
  {
    question: "Какие бывают углы?",
    choices: ["Острый", "Тупой", "Глупый", "Прямой"],
    correctChoice: [0, 1, 3],
    multipleAnswers: true,
  },
  {
    question: "Кто является основателем Apple?",
    choices: ["Билл Гейтс", "Стив Джобс", "Илон Маск", "Джефф Безос"],
    correctChoice: [1],
    multipleAnswers: false,
  },
  {
    question:
      "Какие планеты являются газовыми гигантами в нашей солнечной системе?",
    choices: ["Земля", "Марс", "Юпитер", "Венера", "Сатурн", "Уран", "Нептун"],
    correctChoice: [2, 4, 5, 6],
    multipleAnswers: true,
  },
  {
    question: "Какой из этих элементов не является благородным газом?",
    choices: ["Гелий", "Неон", "Аргон", "Азот"],
    correctChoice: [3],
    multipleAnswers: false,
  },
];

export { questions };
