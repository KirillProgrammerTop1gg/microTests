const testSection = document.querySelector(".test");
const testsSection = document.querySelector(".tests");
const resultSection = document.querySelector(".results");
const materialsSection = document.querySelector(".materials");
const answerNum = document.querySelector(".test__answerNum");
const question = document.querySelector(".test__question");
const answer = document.querySelector(".test__input");
const butCheck = document.querySelector(".test__check");
const isCorrect = document.querySelector(".test__isCorrect");
const nextBut = document.querySelector(".test__next");
const stopWatchElement = document.querySelector(".test_stopwatch");
const cardsElements = document.querySelector(".cards");

const quiz = [
    [
        [
            ["2+2", "4"],
            ["4", "2+2"],
        ],
        [
            ["0", "false"],
            ["false", "0"],
        ],
    ],
    [
        [
            ["yes", "no"],
            ["no", "yes"],
        ],
        [
            ["1", "true"],
            ["true", "1"],
        ],
    ],
    [
        [
            ["bro", "friend"],
            ["friend", "bro"],
        ],
        [
            ["+", "-"],
            ["-", "+"],
        ],
    ],
];

let counter = 0;
let mark = 0;
let isCor = false;
let questionAndAnswers = [];
let attemptNum = 2;
let testNum = undefined;

function shuffleArray(array) {
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i]) && Array.isArray(array[i][0])) {
      const subArray = array[i];
      for (let j = subArray.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [subArray[j], subArray[k]] = [subArray[k], subArray[j]];
      }
    }
  }
}

const showElement = (el) => {
    el.style.position = 'static';
    el.style.pointerEvents = 'all';
    el.style.opacity = '1';
};
const hideElement = (el) => {
    el.style.position = 'absolute';
    el.style.pointerEvents = 'none';
    el.style.opacity = '0';
};

function askQuestion() {
    isCor = false;
    isCorrect.innerHTML = `У вас осталось попыток: ${attemptNum}`;
    answerNum.innerHTML = `Вопрос номер ${counter + 1} / ${quiz[testNum].length} `;
    questionAndAnswers = quiz[testNum][counter][Math.round(Math.random() * ((quiz[testNum][counter].length - 1) - 0) + 0)];
    question.innerHTML = questionAndAnswers[0];
}

cardsElements.addEventListener('click', (e) => {
    if (e.target.getAttribute('class') == 'cards__button') {
        testNum = e.target.getAttribute('testnum');
        shuffleArray(quiz);
        stopWatchElement.testprogress = stopWatchElement.testprogress === '1' ? '0' : '1';
        askQuestion();
        hideElement(testsSection);
        hideElement(materialsSection);
        hideElement(resultSection);
        showElement(testSection);
    }
});

butCheck.addEventListener("click", () => {
    if (attemptNum > 0 && !isCor) {
        attemptNum--;
        for (let j = 1; j < questionAndAnswers.length; j++) {
            if (answer.value.toLowerCase().trim() === questionAndAnswers[j].toLowerCase().trim()) {
                isCor = true;
                mark++;
                break;
            }
            else {
                isCorrect.innerHTML = `Вопрос отвечен неправильно; Попробуйте еще, у вас осталось попыток: ${attemptNum}`;
            }
        }
    }
    if (isCor || attemptNum <= 0) {
        let answersAll = "";
        for (let k = 1; k < questionAndAnswers.length; k++) {
            k === questionAndAnswers.length - 1 ? answersAll += questionAndAnswers[k] + ";" : answersAll += questionAndAnswers[k] + ", ";
        }
        isCorrect.innerHTML = `Вопрос отвечено ${isCor ? "правильно" : "неправильно"}. Вот все варианты правильных ответов: ${answersAll}`;
        if (counter + 1 === quiz[testNum].length) {
            nextBut.innerHTML = "Закінчити";
        }
    }
});

nextBut.addEventListener("click", () => {
    if (attemptNum <= 0 || isCor) {
        counter++;
        isCor = false;
        attemptNum = 2;
        answer.value = "";
        if (counter < quiz[testNum].length) {
            askQuestion();
        } else {
            // alert(`Вы ответили правильно на ${mark} / ${quiz.length} вопросов`);
            // stopWatchElement.testprogress = stopWatchElement.testprogress === '1' ? '0' : '1';
            resultSection.innerHTML = String(Math.round(mark/quiz[testNum].length*100))+'%';
            showElement(resultSection);
            showElement(materialsSection);
            showElement(testsSection);
            hideElement(testSection);
            counter = 0;
            mark = 0;
            shuffleArray(quiz);
            askQuestion();
        }
    }
});

hideElement(resultSection);
hideElement(testSection);
window.onload = () => {
    materialsSection.style.transition = 'all 0.3s ease-in-out';
    testsSection.style.transition = 'all 0.3s ease-in-out';
    testSection.style.transition = 'all 0.3s ease-in-out';
    resultSection.style.transition = 'all 0.3s ease-in-out';
    for (let i = 0; i < quiz.length; i++) {
        let materialsList = `<ul class='materials__list'>`;
        for (let j = 0; j < quiz[i].length; j++){
            materialsList += `<li class=materials__item'>Питання ${j + 1}:`;
            let questnAndAnswers = `<ul class='questionAndAnswers'><li class='questionAndAnswers__question'>Основне питання: ${quiz[i][j][0][0]}, відповіді:</li>`;
            for (let a = 1; a < quiz[i][j][0].length; a++){
                questnAndAnswers += `<li class='questionAndAnswers__answer'>${quiz[i][j][0][a]}</li>`
            }
            questnAndAnswers += `</ul>`;
            materialsList += questnAndAnswers;  
            for (let k = 1; k < quiz[i][j].length; k++){             
                questnAndAnswers = `<ul class='questionAndAnswers'><li class='questionAndAnswers__question'>Альтернативне питання: ${quiz[i][j][k][0]}, відповіді:</li>`;
                for (let a = 1; a < quiz[i][j][k].length; a++){
                    questnAndAnswers += `<li class='questionAndAnswers__answer'>${quiz[i][j][k][a]}</li>`
                }
                questnAndAnswers += `</ul>`;
                materialsList += questnAndAnswers;  
            }
            materialsList += `</li>`;
        }
        materialsList += `</ul>`;
        materialsSection.innerHTML += `<h3 class='materials__subtitle'>Тест ${i + 1}:</h3>${materialsList}`;
    }

}