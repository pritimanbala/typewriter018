const URL = "https://random-word-api.vercel.app/api?words=30";
const paragraph = document.querySelector(".main");
const stats = document.querySelector(".stats");
const textArea = document.querySelector("textarea");
const reload = document.querySelector("svg");
const button = document.querySelector("#start");
const wpm = document.querySelector("#wpm");
const navdiv = document.querySelector(".navdiv");
const timeDiv = document.querySelector("#time");
const acc = document.querySelector("#acc");
const result = document.querySelector(".result");
const resultWpm = document.querySelector("#result-wpm");
const resultAcc = document.querySelector("#result-acc");
const img = document.querySelector("img");
let words = 0;
let first = true;
let started = false;
let correctWords = 0;
let timeLeft = 0;
const getWords = async () => {
    let response = await fetch(URL);
    let words = await response.json();
    paragraph.innerHTML = ""; 
    words.push(" ");
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const p = document.createElement("span");
        p.id = "word" + i;
        p.textContent = word + " ";
        paragraph.appendChild(p);
    }
    first = true;
    words = 0;
    checkWords();
    return words;
}


getWords();
const time = () => {
    setInterval(() => {
        if (started) {
            timeLeft++;
        }
        timeDiv.innerText = timeLeft + "s";
        wpm.innerText = Math.floor((correctWords / (timeLeft)) * 60);
        acc.innerText = Math.floor(((correctWords / (words + 0.0000001)) * 100) + 1) + "%";
    }, 1000);

};


const checkWords = () => {
    if (first) {
        document.querySelector("#word" + 0).style.borderBottom = "2px solid #00ffcc";
        first = false;
        return;
    }
    textArea.placeholder = "type the next word and press space";
    let text = textArea.value;
    let lastChar = text[text.length - 1];
    if (lastChar === " ") {
        textArea.value = "";
        let word = text.slice(0, -1);
        let wordContent = document.querySelector("#word" + words);
        words = words + 1;
        let nextWord = document.querySelector("#word" + words);
        if(word === wordContent.textContent.split(" ")[0]) {
            console.log("Correct");
            console.log(wordContent.textContent);
            console.log(word);
            nextWord.style.borderBottom = "2px solid #00ffcc";
            wordContent.style.borderBottom = "none";
            wordContent.style.color = "green";
            correctWords++;
            
        }else {
            console.log("Incorrect");
            console.log(wordContent.textContent);
            console.log(word);
            nextWord.style.borderBottom = "2px solid #00ffcc";
            wordContent.style.borderBottom = "none";
            wordContent.style.color = "red";
        }
    }
    if(words === 30) {
        writing();
    }
}

const writing = () => {
    started = !started;
    console.log("Started: " + started);
    if(started){
        time();
        textArea.disabled = false;
        textArea.focus();
        navdiv.style.visibility = "hidden";
        reload.style.visibility = "hidden";
        reload.style.pointerEvents = "none";
        button.innerText = "Stop";
        button.style.display = "block";
        button.addEventListener("mouseover", () => {
            button.style.border = "2px solid #ff0000";
            button.style.boxShadow = "0 0 10px #ff0000";
        });
        button.addEventListener("mouseout", () => { 
            button.style.border = "2px solid #1a1a1a";
            button.style.boxShadow = "";
        });
        result.style.display="none"
        stats.style.display = "flex";
        paragraph.style.display="block";

    }else if(!started || words === 20) {
        textArea.disabled = true;
        textArea.style.placeholder = "Press start test to Start typing";
        textArea.value = "";
        navdiv.style.visibility = "visible";
        reload.style.visibility = "visible";
        reload.style.pointerEvents = "auto";
        button.style.display = "none";
        button.addEventListener("mouseover", () => {
            button.style.border = "2px solid #00ffcc";
            button.style.boxShadow = "0 0 10px #00ffcc";
        });
        button.addEventListener("mouseout", () => { 
            button.style.border = "2px solid #1a1a1a";
            button.style.boxShadow = "";
        });
        resultWpm.innerText = "Wpm: " + Math.floor((correctWords / (timeLeft)) * 60);
        resultAcc.innerText = "Accuracy: " + Math.floor(((correctWords / (words + 0.0000001)) * 100) + 1) + "%";
        if(Math.floor((correctWords / (timeLeft)) * 60) > 30 || Math.floor(((correctWords / (words + 0.0000001)) * 100) + 1) < 40) {
            img.src = "https://cdn.pixabay.com/animation/2024/02/21/00/56/00-56-39-633_512.gif";
        }
        else if(Math.floor((correctWords / (timeLeft)) * 60) > 40) {
            img.src = "https://imgs.search.brave.com/tK8F9UptEzHaPDN9GMV5yIS0N2fvnnI5X15hL9TzgXY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YTEuZ2lwaHkuY29t/L21lZGlhL3YxLlky/bGtQVGM1TUdJM05q/RXhhM051ZDNjNU9Y/ZzNlSGxvZVhkdmRX/VTBlV2RsT1dsd1pU/UnNaVFF4YVRKemFE/bHBlWHBuWkNabGNE/MTJNVjluYVdaelgz/TmxZWEpqYUNaamRE/MW4vSWJDWnRiM3Zu/bDRCU1Bqb0V5L2dp/cGh5LmdpZg.gif"   
        }
        getWords();
        words = 0
        timeLeft = 0; 
        correctWords = 0;
        result.style.display = "flex";
        stats.style.display = "none";
        paragraph.style.display = "none";
    }
}
textArea.disabled = true;
reload.addEventListener("click", writing)
textArea.addEventListener("input", checkWords);
button.addEventListener("click", writing);
console.log("Script loaded successfully");
