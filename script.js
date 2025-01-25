const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            "London",
            "Paris",
            "Berlin",
            "Rome"
        ],
        correctAnswer: 1
    },
    {
        question: "What is the tallest mountain in the world?",
        answers: [
            "Mount Everest",
            "K2",
            "Kangchenjunga",
            "Lhotse"
        ],
        correctAnswer: 0
    },
    // Add more questions here
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 10; // Initial time in seconds
let timerInterval;

function displayQuestion() {
    const questionContainer = document.getElementById("quiz-container");
    questionContainer.innerHTML = "";

    const questionElement = document.createElement("h2");
    questionElement.textContent = questions[currentQuestion].question;
    questionContainer.appendChild(questionElement);

    const answerOptions = questions[currentQuestion].answers;
    for (let i = 0; i < answerOptions.length; i++) {
        const answerOption = document.createElement("div");
        answerOption.className = "answer-option";

        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "answer";
        radioInput.value = i;
        radioInput.id = `answer-${i}`;

        const answerLabel = document.createElement("label");
        answerLabel.textContent = answerOptions[i];
        answerLabel.htmlFor = `answer-${i}`;

        answerOption.appendChild(radioInput);
        answerOption.appendChild(answerLabel);

        questionContainer.appendChild(answerOption);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer-display").textContent = timeLeft; 

        if (timeLeft <= 0) { 
            clearInterval(timerInterval); 
            alert("Time's up!"); 
            submitQuiz(); 
        }
    }, 1000); 
}

displayQuestion();
startTimer(); 

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", submitQuiz);

function submitQuiz() {
    clearInterval(timerInterval); 

    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert("Please select an answer for each question!");
        return;
    }

    const userAnswer = parseInt(selectedOption.value);
    const correctAnswer = questions[currentQuestion].correctAnswer;

    if (userAnswer === correctAnswer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion === questions.length) {
        submitButton.disabled = true;
        const scoreMessage = document.getElementById("score-message");
        scoreMessage.textContent = `You scored ${score} out of ${questions.length} questions correctly.`;
    } else {
        displayQuestion();
    }
}