const quizData = [{
    "category": "Science: Computers",
    "type": "multiple",
    "difficulty": "easy",
    "question": "When Gmail first launched, how much storage did it provide for your email?",
    "correct_answer": "1GB",
    "incorrect_answers": ["512MB", "5GB", "1GB", "Unlimited"]
}, {
    "category": "Science: Computers",
    "type": "boolean", "difficulty": "easy",
    "question": "&quot;HTML&quot; stands for Hypertext Markup Language.",
    "correct_answer": "True",
    "incorrect_answers": ["False", "True"]
}, {
    "category": "Science: Computers",
    "type": "multiple",
    "difficulty": "easy",
    "question": "Which computer hardware device provides an interface for all other connected devices to communicate?",
    "correct_answer": "Motherboard",
    "incorrect_answers": ["Central Processing Unit", "Motherboard", "Hard Disk Drive", "Random Access Memory"]
}, {
    "category": "Science: Computers",
    "type": "multiple",
    "difficulty": "easy",
    "question": "The series of the Intel HD graphics generation succeeding that of the 5000 and 6000 series (Broadwell) is called:",
    "correct_answer": "HD Graphics 500",
    "incorrect_answers": ["HD Graphics 700 ", "HD Graphics 600", "HD Graphics 500", "HD Graphics 7000"]
}, {
    "category": "Science: Computers",
    "type": "multiple",
    "difficulty": "easy",
    "question": "On Twitter, what was the original character limit for a Tweet?",
    "correct_answer": "140",
    "incorrect_answers": ["140", "120", "160", "100",]
}]
const quizNode = document.getElementById('quiz');
const answerEles = document.getElementById('header');
const welcomeNode = document.querySelector('.welcome');
const submitButton = document.getElementById('submit');
const radios = document.getElementsByName('answer');
let currentQuestion = 0;
let score = 0;
const loadQuiz = function () {
    unSelectAnswer();
    let currentQuiz = quizData[currentQuestion];
    let h2Element = document.getElementById("question");
    { h2Element !== null && h2Element.parentNode.removeChild(h2Element); }
    let h2 = document.createElement('h2');
    h2.id = 'question';
    h2.innerText = currentQuestion + 1 + '.  ' + currentQuiz.question;
    answerEles.appendChild(h2);
    let listElements = document.querySelectorAll("#dynamicUL li");
    for (let i = 0; (li = listElements[i]); i++) {
        li.parentNode.removeChild(li);
    }
    let ul = document.createElement('ul');
    ul.id = "dynamicUL";
    for (let i = 0; i < currentQuiz.incorrect_answers.length; i++) {
        let li = document.createElement('li');
        let input = document.createElement('input')
        input.type = 'radio';
        input.name = 'answer';
        input.id = `srNo${i}`;
        input.value = currentQuiz.incorrect_answers[i];
        let label = document.createElement('label')
        label.innerText = currentQuiz.incorrect_answers[i];
        label.htmlFor = `srNo${i}`;
        li.appendChild(input);
        li.appendChild(label);
        ul.appendChild(li);
    }
    answerEles.appendChild(ul);
}
const unSelectAnswer = function () {
    for (i = 0; i < radios.length; i++) {
        radios[i].checked = false
    }
}
const getSelectedAnswer = function () {
    let answer;
    for (i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            answer = radios[i].value;
        }
    }
    return answer
}
submitButton.addEventListener('click', () => {
    const answer = getSelectedAnswer();
    console.log('answer:', answer);
    if (answer) {
        if (answer === quizData[currentQuestion].correct_answer) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuiz();
        } else {
            let percentage = (100 * score) / quizData.length;
            quizNode.style.textAlign = 'center';
            quizNode.style.paddingTop = '20px';
            quizNode.innerHTML = `<h1>Results</h1>
            <h3>Quiz completed successfully</h3>
            <h3>Score</h3>
            <h1>${percentage}%</h1>
            <h5>${score}/${quizData.length} questions</h5>
            <button onclick="location.reload()">Realod</button>
            `
        }
    } else {
        let welcomeNode = document.querySelector('.welcome');
        { welcomeNode !== null && answerEles.removeChild(welcomeNode) }
        submitButton.innerText = 'Sumbit'
        loadQuiz();
    }
})
window.onload = function () {
    let divNode = document.createElement('div');
    divNode.className = 'welcome';
    let h1 = document.createElement('h1');
    h1.innerText = 'Welcome!';
    let h2 = document.createElement('h2');
    h2.innerText = "Let's play quiz";
    let h4 = document.createElement('h4');
    h4.innerText = `Total questions: ${quizData.length}`
    divNode.appendChild(h1)
    divNode.appendChild(h2)
    divNode.appendChild(h4)
    answerEles.appendChild(divNode)
}
