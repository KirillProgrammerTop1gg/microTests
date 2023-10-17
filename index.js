const answerNum = document.querySelector(".answer-num");
const question = document.querySelector(".question");
const answer = document.querySelector(".input-answer");
const butCheck = document.querySelector(".but-check");
const isCorrect = document.querySelector(".isCorrect");
const nextBut = document.querySelector(".nextBut");

const quiz = [
    [
        ["H", "Водень", "Ґідроген", "Гідроген"],
        ["Водень", "H"],
        ["Ґідроген", "H"],
    ],
    [
        ["He", "Гелій"],
        ["Гелій", "He"],
    ],
    [
        ["Li", "Літій"],
        ["Літій", "Li"],
    ],
    [
        ["Be", "Берилій"],
        ["Берилій", "Be"],
    ],
    [
        ["B", "Бор"],
        ["Бор", "B"],
    ],
    [
        ["C", "Карбон", "Вуглець"],
        ["Карбон", "C"],
        ["Вуглець", "C"],
    ],
    [
        ["N", "Азот", "Нітроген", "Нітроґен"],
        ["Азот", "N"],
        ["Нітроґен", "N"],
    ],
    [
        ["O", "Кисень", "Оксиген", "Оксиґен"],
        ["Кисень", "O"],
        ["Оксиґен", "O"],
    ],
    [
        ["F", "Фтор", "Флюор"],
        ["Флюор", "F"],
        ["Фтор", "F"],
    ],
    [
        ["Ne", "Неон"],
        ["Неон", "Ne"],
    ],
    [
        ["Na", "Натрій"],
        ["Натрій", "Na"],
    ],
    [
        ["Mg", "Маґній", "Магній"],
        ["Маґній", "Mg"],
    ],
    [   
        ["Al", "Алюміній"],
        ["Алюміній", "Al"],
    ],
    [   
        ["Si", "Кремній", "Силіцій"],
        ["Кремній", "Si"],
        ["Силіцій", "Si"],
    ],
    [   
        ["P", "Фосфор"],
        ["Фосфор", "P"],
    ],
    [   
        ["S", "Сірка", "Сульфур"],
        ["Сірка", "S"],
        ["Сульфур", "S"],
    ],
    [   
        ["Cl", "Хлор"],
        ["Хлор", "Cl"],
    ],
    [   
        ["Ar", "Аргон", "Арґон"],
        ["Арґон", "Ar"],
    ],
    [
        ["K", "Калій"],
        ["Калій", "K"],
    ],
    [
        ["Ca", "Кальцій"],
        ["Кальцій", "Ca"],
    ],
    [
        ["Sc", "Скандій"],
        ["Скандій", "Sc"],
    ],
    [
        ["Ti", "Титан"],
        ["Титан", "Ti"],
    ],
    [
        ["V", "Ванадій"],
        ["Ванадій", "V"],
    ],
    [
        ["Cr", "Хром"],
        ["Хром", "Cr"],
    ],
    [   
        ["Mn", "Манган", "Манґан"],
        ["Манґан", "Mn"],
    ],
    [
        ["Fe", "Залізо", "Ферум"],
        ["Залізо", "Fe"],
        ["Ферум", "Fe"],
    ],
    [
        ["Co", "Кобальт"],
        ["Кобальт", "Co"],
    ],
    [
        ["Ni", "Нікель"],
        ["Нікель", "Ni"],
    ],
    [
        ["Cu", "Мідь", "Купрум"],
        ["Мідь", "Cu"],
        ["Купрум", "Cu"],
    ],
    [
        ["Zn", "Цинк"],
        ["Цинк", "Zn"],
    ],
    [
        ["Ga", "Ґалій", "Галій"],
        ["Ґалій", "Ga"],
    ],
    [
        ["Ge", "Ґалій", "Германій"],
        ["Ґалій", "Ge"],
    ],
    [
        ["As", "Арсен"],
        ["Арсен", "As"],
    ],
    [
        ["Se", "Селен"],
        ["Селен", "Se"],
    ],
    [
        ["Br", "Бром"],
        ["Бром", "Br"],
    ],
    [
        ["Kr", "Криптон"],
        ["Криптон", "Kr"],
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
    questionAndAnswers = quiz[counter][Math.round(Math.random() * (2 - 0) + 0)];
    question.innerHTML = questionAndAnswers[0];
}

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