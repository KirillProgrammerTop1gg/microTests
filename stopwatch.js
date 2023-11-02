const stopWatchElement = document.querySelector(".test_stopwatch");
let startTime = new Date().getTime() / 1000;
let nowSeconds = 0;
let correctTime = ["00", "00", "00", "00"];
stopWatchElement.innerHTML = correctTime.join(":");
let oldProgressTest = stopWatchElement.testprogress;

let time1 = setInterval(() => {
    if (oldProgressTest !== stopWatchElement.testprogress) {
        startTime = new Date().getTime() / 1000;
        correctTime = ["00", "00", "00", "00"];
        stopWatchElement.innerHTML = correctTime.join(":");
        oldProgressTest = stopWatchElement.testprogress;
    }
}, 10);

let timer2 = setInterval(() => {
    nowSeconds = new Date().getTime() / 1000 - startTime;
    correctTime[0] = Math.floor(nowSeconds / 86400) < 10 ? "0"+String(Math.floor(nowSeconds / 86400)) : Math.floor(nowSeconds / 86400);
    correctTime[1] = Math.floor((nowSeconds % 86400) / 3600) < 10 ? "0"+String(Math.floor((nowSeconds % 86400) / 3600)) : Math.floor((nowSeconds % 86400) / 3600);
    correctTime[2] = Math.floor((nowSeconds % 3600) / 60) < 10 ? "0" + String(Math.floor((nowSeconds % 3600) / 60)) : Math.floor((nowSeconds % 3600) / 60);
    correctTime[3] = Math.floor(nowSeconds % 60) < 10 ? "0"+String(Math.floor(nowSeconds % 60)) : Math.floor(nowSeconds % 60);
    stopWatchElement.innerHTML = correctTime.join(":");
    oldProgressTest = stopWatchElement.testprogress;
}, 1000);