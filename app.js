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
    {
        question: "Qual é o antônimo de 'feliz'?",
        options: ["Triste", "Alegria", "Sorriso", "Feliz"],
        correct: 1
    },
    {
        question: "Qual a forma correta do plural de 'avião'?",
        options: ["Aviões", "Aviãos", "Aviãoses", "Aviãous"],
        correct: 1
    },
    {
        question: "Complete a frase: Ele _____ muito bem.",
        options: ["canta", "cantou", "cantará", "cantando"],
        correct: 1
    },
    {
        question: "Qual a forma correta de escrever?",
        options: ["Crescer", "Crescêr", "Crescer", "Cresse"],
        correct: 1
    },
    {
        question: "Escolha a frase com a gramática correta:",
        options: ["Eu vi eles ontem", "Eu vi eles ontem", "Eu vi ele ontem", "Eu vi ela ontem"],
        correct: 3
    },
    {
        question: "Qual dessas palavras é um adjetivo?",
        options: ["Correr", "Azul", "Andar", "Sorrir"],
        correct: 2
    },
    {
        question: "Qual é o verbo da frase: 'Ela está comendo o lanche'?",
        options: ["Ela", "comendo", "está", "lanche"],
        correct: 2
    },
    {
        question: "A palavra 'felicidade' é um exemplo de:",
        options: ["Verbo", "Substantivo", "Adjetivo", "Advérbio"],
        correct: 2
    }
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
    {
        question: "Quanto é 15 dividido por 3?",
        options: ["3", "4", "5", "6"],
        correct: 3
    },
    {
        question: "Quanto é 10 - 7?",
        options: ["2", "3", "4", "5"],
        correct: 2
    },
    {
        question: "Quanto é 12 + 8?",
        options: ["18", "19", "20", "21"],
        correct: 3
    },
    {
        question: "Qual é o produto de 8 x 7?",
        options: ["54", "56", "58", "60"],
        correct: 2
    },
    {
        question: "Quanto é 9 x 9?",
        options: ["80", "81", "82", "83"],
        correct: 2
    },
    {
        question: "Qual é a raiz quadrada de 81?",
        options: ["7", "8", "9", "10"],
        correct: 3
    },
    {
        question: "Quanto é 45 dividido por 5?",
        options: ["7", "8", "9", "10"],
        correct: 3
    },
    {
        question: "Quanto é 5 x 5?",
        options: ["15", "20", "25", "30"],
        correct: 3
    }
];

// Variáveis globais
let currentQuestionIndex = 0;
let currentSubject = "portuguese"; // 'portuguese' ou 'math'
let score = 0;
let studentName = "";

// Função para iniciar o quiz
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

// Função para mostrar a próxima pergunta
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

// Função para verificar a resposta
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

// Função para mostrar confetes (verdes ou vermelhos)
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

// Função para avançar para a próxima questão
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

// Função para reiniciar o quiz
function resetQuiz() {
    currentQuestionIndex = 0;
    currentSubject = "portuguese";
    score = 0;
    document.getElementById('intro-container').style.display = 'block';
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('score').textContent = '';
}
