const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Transfer Main Language",
            "Home Tool Markup Language"
        ],
        correctAnswer: "Hyper Text Markup Language"
    },

    {
        question: "Which language is used to style webpages?",
        options: [
            "HTML",
            "CSS",
            "Java",
            "Python"
        ],
        correctAnswer: "CSS"
    },

    {
        question: "Which keyword declares a variable?",
        options: [
            "define",
            "variable",
            "let",
            "declare"
        ],
        correctAnswer: "let"
    },

    {
        question: "Which method selects an element by ID?",
        options: [
            "getElementById()",
            "getElementByClass()",
            "getElement()",
            "selectId()"
        ],
        correctAnswer: "getElementById()"
    },

    {
        question: "Which method adds an element to the end of an array?",
        options: [
            "pop()",
            "shift()",
            "push()",
            "remove()"
        ],
        correctAnswer: "push()"
    }
];

document.body.style.backgroundColor = "lightblue";

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 20;
let timerInterval = null;
let answered = false;

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const timerDisplay = document.getElementById("timer");

const finalScore = document.getElementById("final-score");
const correctCount = document.getElementById("correct-count");
const wrongCount = document.getElementById("wrong-count");
const percentage = document.getElementById("percentage");
const performanceMessage = document.getElementById("performance-message");

function startQuiz() {
    welcomeScreen.hidden = true;
    quizScreen.hidden = false;
    resultScreen.hidden = true;

    currentQuestionIndex = 0;
    score = 0;

    loadQuestion();
}

startBtn.addEventListener("click", startQuiz);

function loadQuestion() {
    answered = false;
    timeLeft = 20;

    nextBtn.disabled = true;
    optionsContainer.innerHTML = "";

    const currentQuestion = questions[currentQuestionIndex];

    questionNumber.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    questionText.textContent = currentQuestion.question;

    currentQuestion.options.forEach(function(option) {

        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option-btn");

        button.addEventListener("click", function() {
            checkAnswer(button, option);
        });

        optionsContainer.appendChild(button);
    });

    startTimer();
}

function checkAnswer(button, selectedOption) {

    if (answered) {
        return;
    }

    answered = true;

    const correctAnswer =
        questions[currentQuestionIndex].correctAnswer;

    const allButtons =
        optionsContainer.querySelectorAll("button");

    allButtons.forEach(function(btn) {
        btn.disabled = true;
    });

    if (selectedOption === correctAnswer) {

        score++;

        button.classList.add("correct");

    } else {

        button.classList.add("wrong");

        allButtons.forEach(function(btn) {
            if (btn.textContent === correctAnswer) {
                btn.classList.add("correct");
            }
        });
    }

    nextBtn.disabled = false;
}

function nextQuestion() {

    clearInterval(timerInterval);

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {

        loadQuestion();

    } else {

        showResult();
    }
}

nextBtn.addEventListener("click", nextQuestion);

function startTimer() {

    clearInterval(timerInterval);

    timerDisplay.textContent = timeLeft;

    timerInterval = setInterval(function() {

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            if (!answered) {
                answered = true;

                const allButtons =
                    optionsContainer.querySelectorAll("button");

                allButtons.forEach(function(btn) {
                    btn.disabled = true;
                });

                const correctAnswer =
                    questions[currentQuestionIndex].correctAnswer;

                allButtons.forEach(function(btn) {
                    if (btn.textContent === correctAnswer) {
                        btn.classList.add("correct");
                    }
                });
            }

            nextQuestion();
        }

    }, 1000);
}

function showResult() {

    clearInterval(timerInterval);

    quizScreen.hidden = true;
    welcomeScreen.hidden = true;
    resultScreen.hidden = false;
    document.body.style.backgroundColor = "#d3f2de";

    const totalQuestions = questions.length;
    const wrongAnswers = totalQuestions - score;
    const percent = (score / totalQuestions) * 100;

    finalScore.textContent =
        `Your Score: ${score} / ${totalQuestions}`;

    correctCount.textContent =
        `Correct Answers: ${score}`;

    wrongCount.textContent =
        `Wrong Answers: ${wrongAnswers}`;

    percentage.textContent =
        `Percentage: ${percent}%`;

    if (percent === 100) {

        performanceMessage.textContent =
            "Excellent! You got all answers correct!";

    } else if (percent >= 80) {

        performanceMessage.textContent =
            "Very Good! You have excellent knowledge!";

    } else if (percent >= 50) {

        performanceMessage.textContent =
            "Good effort! Keep practicing!";

    } else {

        performanceMessage.textContent =
            "Keep learning and try again!";
    }
}

function restartQuiz() {

    clearInterval(timerInterval);

    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 20;
    answered = false;

    resultScreen.hidden = true;
    welcomeScreen.hidden = false;
    quizScreen.hidden = true;
    document.body.style.backgroundColor = "#f1f5f9";

    nextBtn.disabled = true;
}

restartBtn.addEventListener("click", restartQuiz);