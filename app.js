// Definição de questões de Português e Matemática
const portugueseQuestions = [
    {
        question: "Qual é o plural de 'cão'?",
        options: ["Cães", "Cãos", "Cãeses", "Cãess"],
        correct: 1
    },
    {
        question: "Qual dessas palavras está corretamente escrita?",
        options: ["Emfim", "Enfim", "Em fim", "Enfim"],
        correct: 2
    },
    // Adicionar outras 8 perguntas de português
];

const mathQuestions = [
    {
        question: "Quanto é 5 + 3?",
        options: ["7", "8", "9", "6"],
        correct: 2
    },
    {
        question: "Qual é o resultado de 6 x 6?",
        options: ["36", "12", "18", "24"],
        correct: 1
    },
    // Adicionar outras 8 perguntas de matemática
];

let currentQuestionIndex = 0;
let currentSubject = "portuguese"; // 'portuguese' ou 'math'
let score = 0;
let studentName = "";

// Iniciar o questionário
function startQuiz() {
    studentName = document.getElementById('student-name').value;
    if (!studentName) {
        alert("Por favor, insira seu nome.");
        return;
    }
    document.getElementById('intro-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    nextQuestion();
}

// Exibir a próxima questão
function nextQuestion() {
    const currentQuestions = currentSubject === "portuguese" ? portugueseQuestions : mathQuestions;
    const currentQuestion = currentQuestions[currentQuestionIndex];
    document.getElementById('question-title').textContent = currentSubject === "portuguese" ? "Pergunta de Português" : "Pergunta de Matemática";
    document.getElementById('question-text').textContent = currentQuestion.question;

    const optionsList = document.getElementById("options");
    optionsList.innerHTML = ""; // Limpar opções anteriores
    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.onclick = function() { checkAnswer(index + 1); }; // Passa o índice da resposta
        optionsList.appendChild(li);
    });

    document.getElementById('next-button').style.display = 'none';
}

// Verificar a resposta
function checkAnswer(selectedOption) {
    const currentQuestions = currentSubject === "portuguese" ? portugueseQuestions : mathQuestions;
    const correctOption = currentQuestions[currentQuestionIndex].correct;
    if (selectedOption === correctOption) {
        score++;
        showConfetti(true);
    } else {
        showConfetti(false);
    }

    document.getElementById('score').textContent = `Pontuação: ${score}`;
    document.getElementById('next-button').style.display = 'inline-block';
}

// Mostrar confetes (verdes ou vermelhos)
function showConfetti(isCorrect) {
    const confettiSettings = {
        angle: isCorrect ? 90 : 270,
        spread: 360,
        startVelocity: 30,
        elementCount: 100,
        dragFriction: 0.1,
        duration: 3000,
        delay: 0,
        colors: isCorrect ? ['#0a0', '#60c', '#00f'] : ['#f00', '#600', '#900']
    };
    confetti(confettiSettings);
}

// Avançar para a próxima questão
function nextQuestion() {
    const currentQuestions = currentSubject === "portuguese" ? portugueseQuestions : mathQuestions;

    currentQuestionIndex++;
    if (currentQuestionIndex >= currentQuestions.length) {
        if (currentSubject === "portuguese") {
            currentSubject = "math";  // Mudar para as questões de matemática
            currentQuestionIndex = 0;
        } else {
            alert(`${studentName}, o quiz acabou! Sua pontuação final é ${score}`);
            resetQuiz();
            return;
        }
    }
    nextQuestion();
}

// Reiniciar o quiz
function resetQuiz() {
    currentQuestionIndex = 0;
    currentSubject = "portuguese";
    score = 0;
    document.getElementById('intro-container').style.display = 'block';
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('score').textContent = '';
}
