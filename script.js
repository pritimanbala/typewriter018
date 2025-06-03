const URL = "https://random-word-api.herokuapp.com/word?number=20";
const paragraph = document.querySelector(".main");
const textArea = document.querySelector("textarea");
const reload = document.querySelector("svg");
const getWords = async () => {
    let response = await fetch(URL);
    let words = await response.json();
    paragraph.innerHTML = ""; 
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const p = document.createElement("span");
        p.id = "word" + i;
        p.textContent = word + " ";
        paragraph.appendChild(p);
    }
    return words;
}




let words = 0;
const checkWords = () => {
    let text = textArea.value;
    let lastChar = text[text.length - 1];
    if (lastChar === " ") {
        textArea.value = "";
        let word = text.slice(0, -1);
        let wordContent = document.querySelector("#word" + words);
        words = words + 1;
        if(word === wordContent.textContent.split(" ")[0]) {
            console.log("Correct");
            wordContent.style.color = "green";
            console.log(wordContent.textContent);
            console.log(word);
        }else {
            console.log("Incorrect");
            wordContent.style.color = "red";
            console.log(wordContent.textContent);
            console.log(word);
        }
    }
}

reload.addEventListener("click", getWords)
textArea.addEventListener("input", checkWords);
// const addWords = async () => {
//     const words = await getWords();
//     const paragraph = (words) => {
//         for(let i= 0; i < words.length; i++) {
//             const word = words[i];
//             const p = document.createElement("p");
//             p.textContent = word;
//             document.body.appendChild(p);
//         }
//     }
//     return paragraph(words);
// }