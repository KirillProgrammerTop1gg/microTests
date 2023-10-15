const answerNum = document.querySelector(".answer-num");
const question = document.querySelector(".question");
const answer = document.querySelector(".input-answer");
const butCheck = document.querySelector(".but-check");
const isCorrect = document.querySelector(".isCorrect");
const nextBut = document.querySelector(".nextBut");

const quiz = [
    [
        ["2+2?", "4", "четыре"],
        ["что будет 4", "2+2"],
    ],
    [
        ["Кто такие аэробные организмы", "не знаю", "помогите", "они использают кислород"],
        ["что за люди, которые используют кислород при дыхании", "аэробы", "аэробные", "мне плохо"],
    ],
];

let counter = 0;
let mark = 0;
let isCor = false;
let questionAndAnswers = [];
let attemptNum = 2;

function askQuestion() {
    isCor = false;
    isCorrect.innerHTML = `У вас осталось попыток: ${attemptNum}`;
    answerNum.innerHTML = `Вопрос номер ${counter + 1} / ${quiz.length} `;
    questionAndAnswers = quiz[counter][Math.round(Math.random() * (1 - 0) + 0)];
    question.innerHTML = questionAndAnswers[0];
}

butCheck.addEventListener("click", () => {
    if (attemptNum > 0 && !isCor) {
        attemptNum--;
        for (let j = 1; j < questionAndAnswers.length; j++) {
            if (answer.value === questionAndAnswers[j]) {
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
        if (counter + 1 === quiz.length) {
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
        if (counter < quiz.length) {
            askQuestion();
        } else {
            alert(`Вы ответили правильно на ${mark} / ${quiz.length} вопросов`);
            counter = 0;
            mark = 0;
            askQuestion();
        }
    }
});

askQuestion();