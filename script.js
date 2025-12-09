
window.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.main-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > 0) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
        
        lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    });
});
function showPage(pageName) {
    // Esconde todas as páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Mostra a página selecionada
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Scroll para o topo
    window.scrollTo(0, 0);
}

// BASE DE PERGUNTAS DO QUIZ


const allQuestions = [
    {
        id: 1,
        question: "Quantas notas existem na escala cromática?",
        options: ["7 notas", "12 notas", "8 notas", "10 notas"],
        correct: 1
    },
    {
        id: 2,
        question: "O que é síntese de voz?",
        options: [
            "Gravação de voz humana",
            "Geração artificial de fala por computador",
            "Edição de áudio",
            "Mixagem de sons"
        ],
        correct: 1
    },
    {
        id: 3,
        question: "MIDI significa:",
        options: [
            "Music Internet Digital Interface",
            "Musical Instrument Digital Interface",
            "Media Input Digital Integration",
            "Music Internal Data Interface"
        ],
        correct: 1
    },
    {
        id: 4,
        question: "Qual a frequência padrão da nota Lá (A4)?",
        options: ["220 Hz", "440 Hz", "880 Hz", "110 Hz"],
        correct: 1
    },
    {
        id: 5,
        question: "O que é timbre?",
        options: [
            "Volume do som",
            "Altura da nota",
            "Qualidade que distingue sons de mesma altura",
            "Duração da nota"
        ],
        correct: 2
    },
    {
        id: 6,
        question: "Quantos bits tem um áudio de qualidade CD?",
        options: ["8 bits", "16 bits", "24 bits", "32 bits"],
        correct: 1
    },
    {
        id: 7,
        question: "O que é sample rate (taxa de amostragem)?",
        options: [
            "Tamanho do arquivo",
            "Número de amostras de áudio por segundo",
            "Volume do áudio",
            "Qualidade da gravação"
        ],
        correct: 1
    },
    {
        id: 8,
        question: "Qual a taxa de amostragem padrão de um CD de áudio?",
        options: ["22.05 kHz", "44.1 kHz", "48 kHz", "96 kHz"],
        correct: 1
    },
    {
        id: 9,
        question: "O que são formantes na síntese de voz?",
        options: [
            "Tipos de microfones",
            "Picos de energia em frequências específicas",
            "Efeitos de áudio",
            "Gravações de voz"
        ],
        correct: 1
    },
    {
        id: 10,
        question: "Qual o intervalo de frequências audíveis pelo ser humano?",
        options: [
            "20 Hz a 20 kHz",
            "10 Hz a 10 kHz",
            "100 Hz a 10 kHz",
            "20 Hz a 40 kHz"
        ],
        correct: 0
    },
    {
        id: 11,
        question: "O que é um sintetizador?",
        options: [
            "Aparelho que grava som",
            "Instrumento que gera sons eletronicamente",
            "Programa de edição",
            "Tipo de microfone"
        ],
        correct: 1
    },
    {
        id: 12,
        question: "O que significa MP3?",
        options: [
            "Music Player 3",
            "MPEG-1 Audio Layer 3",
            "Media Protocol 3",
            "Music Processing 3"
        ],
        correct: 1
    },
    {
        id: 13,
        question: "Qual a função de um envelope ADSR em síntese?",
        options: [
            "Gravar áudio",
            "Controlar a evolução temporal do som",
            "Aumentar volume",
            "Adicionar eco"
        ],
        correct: 1
    },
    {
        id: 14,
        question: "O que é uma oitava em música?",
        options: [
            "8 instrumentos tocando juntos",
            "Intervalo de 8 notas onde a frequência dobra",
            "8 compassos",
            "Uma escala musical"
        ],
        correct: 1
    },
    {
        id: 15,
        question: "Qual a principal vantagem do formato MIDI?",
        options: [
            "Alta qualidade de áudio",
            "Arquivos pequenos e editáveis",
            "Melhor para voz",
            "Mais natural que áudio digital"
        ],
        correct: 1
    },

    {
        id: 16,
        question: "Qual é a técnica fundamental da Animação 2D Tradicional, onde cada imagem é desenhada individualmente?",
        options: [
            "Modelagem por polígonos",
            "Captura de movimento (Motion Capture)",
            "Desenho quadro a quadro (Frame-by-frame drawing)",
            "Renderização em tempo real"
        ],
        correct: 2
    },
    {
        id: 17,
        question: "Qual é o processo em Animação 3D que consiste em aplicar texturas, iluminação e sombra para criar a imagem final?",
        options: [
            "Rigging",
            "Modelagem (Modeling)",
            "Renderização (Rendering)",
            "Keyframing"
        ],
        correct: 2
    },
    {
        id: 18,
        question: "Qual é a característica principal que distingue um Vídeo Vlog de outros formatos de vídeo?",
        options: [
            "Alta qualidade de produção e roteiro estrito",
            "Foco em instrução técnica detalhada",
            "Conteúdo informal, pessoal e em formato de diário",
            "Uso exclusivo de efeitos especiais e trilhas sonoras complexas"
        ],
        correct: 2
    },
    {
        id: 19,
        question: "O objetivo principal de um Vídeo Tutorial é:",
        options: [
            "Documentar eventos sociais",
            "Apresentar uma opinião pessoal",
            "Vender um produto diretamente",
            "Ensinar o espectador a realizar uma tarefa passo a passo"
        ],
        correct: 3
    }
];


// VARIÁVEIS DO QUIZ

let selectedQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

// FUNÇÕES DO QUIZ

// Sorteia 5 perguntas da base 
function getRandomQuestions() {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
}

// Inicia o quiz
function startQuiz() {
    selectedQuestions = getRandomQuestions();
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    
    document.getElementById('quizIntro').style.display = 'none';
    document.getElementById('quizQuestions').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    
    showQuestion();
}

// Mostra a pergunta atual
function showQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    const questionContainer = document.getElementById('questionContainer');
    
    // Atualiza número da questão
    document.getElementById('currentQuestionNum').textContent = currentQuestionIndex + 1;
    
    // Atualiza barra de progresso
    const progress = ((currentQuestionIndex + 1) / 5) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Monta HTML da pergunta
    let html = `
        <div class="question-text">${question.question}</div>
        <div class="options">
    `;
    
    question.options.forEach((option, index) => {
        html += `
            <button class="option-btn" onclick="selectAnswer(${index})">
                ${option}
            </button>
        `;
    });
    
    html += '</div>';
    questionContainer.innerHTML = html;
    
    // Esconde botão "Próxima"
    document.getElementById('nextBtn').style.display = 'none';
}

// Seleciona uma resposta
function selectAnswer(optionIndex) {
    const question = selectedQuestions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.option-btn');
    
    // Desabilita todos os botões
    buttons.forEach(btn => btn.disabled = true);
    
    // Marca resposta selecionada
    buttons[optionIndex].classList.add('selected');
    
    // Mostra resposta correta e incorreta
    buttons[question.correct].classList.add('correct');
    if (optionIndex !== question.correct) {
        buttons[optionIndex].classList.add('incorrect');
    }
    
    // Salva resposta do usuário
    userAnswers[currentQuestionIndex] = {
        question: question.question,
        selected: optionIndex,
        correct: question.correct,
        isCorrect: optionIndex === question.correct
    };
    
    if (optionIndex === question.correct) {
        score++;
    }
    
    // Mostra botão "Próxima" ou "Ver Resultado"
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.style.display = 'block';
    
    if (currentQuestionIndex === 4) {
        nextBtn.textContent = 'Ver Resultado';
    } else {
        nextBtn.textContent = 'Próxima Questão';
    }
}

// Avança para próxima questão ou mostra resultados
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < 5) {
        showQuestion();
    } else {
        showResults();
    }
}

// Mostra resultados finais
function showResults() {
    document.getElementById('quizQuestions').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    // Calcula percentual
    const percentage = (score / 5) * 100;
    document.getElementById('scorePercentage').textContent = percentage.toFixed(0) + '%';
    
    // Texto de feedback
    let feedbackText = '';
    if (percentage === 100) {
        feedbackText = '🎉 Perfeito! Você domina o assunto!';
    } else if (percentage >= 80) {
        feedbackText = '👏 Excelente! Muito bom desempenho!';
    } else if (percentage >= 60) {
        feedbackText = '👍 Bom trabalho! Continue estudando!';
    } else if (percentage >= 40) {
        feedbackText = '📚 Você pode melhorar! Revise o conteúdo!';
    } else {
        feedbackText = '💪 Continue tentando! Estude mais o material!';
    }
    
    document.getElementById('scoreText').textContent = 
        `Você acertou ${score} de 5 questões. ${feedbackText}`;
    
    // Mostra revisão das respostas
    showAnswersReview();
}

// Mostra revisão detalhada das respostas
function showAnswersReview() {
    const reviewContainer = document.getElementById('answersReview');
    let html = '<h3>Revisão das Respostas:</h3>';
    
    userAnswers.forEach((answer, index) => {
        const question = selectedQuestions[index];
        const cssClass = answer.isCorrect ? 'correct' : 'incorrect';
        const icon = answer.isCorrect ? '✓' : '✗';
        
        html += `
            <div class="answer-item ${cssClass}">
                <strong>${icon} Questão ${index + 1}: ${answer.question}</strong>
                <p>Sua resposta: ${question.options[answer.selected]}</p>
                ${!answer.isCorrect ? `<p>Resposta correta: ${question.options[answer.correct]}</p>` : ''}
            </div>
        `;
    });
    
    reviewContainer.innerHTML = html;
}

// Reinicia o quiz
function restartQuiz() {
    startQuiz();
}

// Cria contexto de áudio
let audioContext = null;

function getAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

// Frequências das notas musicais
const noteFrequencies = {
    'C': 261.63,  // Dó
    'D': 293.66,  // Ré
    'E': 329.63,  // Mi
    'F': 349.23,  // Fá
    'G': 392.00,  // Sol
};

// Toca uma nota MIDI sintetizada
function playMidiNote(note) {
    const ctx = getAudioContext();
    const frequency = noteFrequencies[note];
    
    if (!frequency) return;
    
    // Cria oscilador
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Configura som
    oscillator.type = 'sine'; // Tipo de onda
    oscillator.frequency.value = frequency;
    
    // Envelope ADSR simples
    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01); // Attack
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);  // Decay
    gainNode.gain.linearRampToValueAtTime(0, now + 0.5);    // Release
    
    // Toca nota
    oscillator.start(now);
    oscillator.stop(now + 0.5);
    
    
};
