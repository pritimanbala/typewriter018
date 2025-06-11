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
const img = document.querySelector("#image");
let wordsNum = 0;
let wordsTotal = 0;
let first = true;
let started = false;
let correctWords = 0;
let timeLeft = 0;
const getWords = async () => {
    const oceanParagraph = ["Artificial intelligence has evolved from simple rule-based systems to complex neural networks capable of human-like reasoning.",
  "Machine learning algorithms now detect patterns in data with superhuman accuracy, diagnosing diseases from X-rays better than radiologists.",
  "Large language models like GPT-4 can generate coherent text, but still struggle with true understanding of meaning and context.",
  "Computer vision systems identify objects with 99% precision, yet fail comically when shown optical illusions that trick human brains.",
  "AI ethics debates rage about algorithmic bias, where training data can perpetuate racial or gender stereotypes invisibly.",
  "Reinforcement learning lets AI master complex games like Go through self-play, developing strategies no human has ever conceived.",
  "The 'black box' problem persists: even creators often can't explain why deep learning models make specific decisions.",
  "Generative adversarial networks (GANs) create photorealistic fake faces indistinguishable from real people to the naked eye.",
  "AI now writes code, composes music, and paints in the style of Van Gogh—blurring lines between human and machine creativity.",
  "Autonomous weapons systems raise dystopian concerns about machines making life-or-death decisions without human oversight.",
  "Quantum machine learning promises exponential speedups by harnessing qubits to process multidimensional data simultaneously.",
  "Neuralink's brain-computer interfaces aim to merge human cognition with AI, potentially creating symbiotic consciousness.",
  "The Turing Test, once the gold standard for AI, is now considered outdated as chatbots mimic conversation without true intelligence.",
  "AI winter periods of reduced funding alternate with hype cycles, as the field oscillates between breakthroughs and overpromises.",
  "Explainable AI (XAI) techniques attempt to make decision-making transparent, crucial for healthcare and criminal justice applications.",
    "Humanity's journey into space began in 1957 with the launch of Sputnik, a tiny metal orb that sparked the cosmic rivalry of the Cold War.",
  "The vacuum of space is not truly empty—it teems with quantum particles, cosmic rays, and microscopic dust forged in ancient supernovae.",
  "Astronauts experience time dilation: after a year on the International Space Station, they return 0.01 seconds younger than Earthbound peers due to relativity.",
  "Jupiter's moon Europa hides a subsurface ocean with twice Earth's liquid water, its icy crust scarred by cracks from gravitational tides.",
  "Black holes warp spacetime so severely that light cannot escape, yet they emit Hawking radiation—a whisper of particles bleeding energy over eons.",
  "The Voyager probes carry golden records with sounds of Earth, including whale songs and Chuck Berry's 'Johnny B. Goode,' now drifting between stars.",
  "Mars sunsets are blue, a result of fine dust scattering sunlight in the thin CO₂ atmosphere like prismatic twilight.",
  "Dark matter, invisible and intangible, comprises 27% of the universe—its presence revealed only by gravitational effects on galaxies.",
  "Spacecraft navigating the asteroid belt face odds likened to 'flying through a shooting gallery where the bullets are 1 million miles apart.'",
  "The Pillars of Creation, a stellar nursery 7,000 light-years away, were likely destroyed by a supernova 6,000 years ago—we just haven't seen it yet.",
  "Solar flares can unleash energy equivalent to a billion hydrogen bombs, threatening satellites with electromagnetic tsunamis.",
  "Astrobiology seeks life in extreme environments like Saturn's moon Enceladus, where geysers spew organic-rich water into space.",
  "The James Webb Telescope detects infrared light from 13.5 billion years ago, capturing photons that began traveling when the universe was an infant.",
  "Neutron stars are so dense that a sugar-cube-sized fragment would weigh as much as all humans on Earth combined.",
  "The expansion of the universe accelerates due to dark energy—a force so enigmatic it may rewrite physics as we know it.",
  "The ocean, covering more than 70% of Earth's surface, is a realm of perpetual enigma, its depths hiding secrets that defy human imagination.",
  "Beneath the sunlit shallows where coral reefs pulse with life, the water grows colder and darker, descending into the midnight zone, where sunlight cannot penetrate and pressure crushes all but the most adapted creatures.",
  "Here, in the abyssal plains, bioluminescent organisms flicker like stars in a submerged cosmos—anglerfish with glowing lures, jellyfish that pulse with eerie blue light, and shrimp that spew clouds of luminescent ink to confuse predators.",
  "The Mariana Trench, the deepest known point on Earth, plunges nearly 36,000 feet, a chasm so vast that Mount Everest could fit inside with room to spare.",
  "In this alien landscape, giant amoebas called xenophyophores grow to the size of dinner plates, while translucent snailfish dart between hydrothermal vents that spew superheated, mineral-rich water, creating oases of life in the crushing dark.",
  "These vents, nicknamed \"black smokers,\" host ecosystems fueled not by sunlight but by chemosynthesis, where bacteria convert toxic chemicals into energy, supporting tube worms as tall as humans and crabs with hairy claws.",
  "Yet for all its wonders, the ocean floor remains largely unexplored—less than 20% has been mapped in detail, leaving vast stretches uncharted.",
  "Shipwrecks like the Titanic rest in silent ruin, slowly consumed by rust and deep-sea microbes, while mythical creatures like the giant squid, once dismissed as sailor's tales, have been captured on camera only in the last two decades.",
  "The ocean's mysteries extend beyond biology: strange sounds like the \"Bloop,\" a ultra-low-frequency noise recorded in 1997, sparked theories of colossal sea monsters until scientists traced it to cracking icebergs.",
  "Even the water itself holds puzzles—brine pools, lakes of hypersaline water so dense they form eerie, shimmering floors on the seabed, lethal to any fish that swim into them.",
  "Climate change now threatens these hidden worlds, as rising temperatures acidify the water and disrupt currents that have flowed for millennia.",
  "Meanwhile, nations race to exploit the deep sea for minerals like cobalt and manganese, sparking ethical debates over mining these fragile ecosystems.",
  "And perhaps most haunting is the realization that the ocean's greatest secret might be its own past—sunken continents like Zealandia, lost civilizations hinted at by underwater ruins, and the possibility that life itself began around those volcanic vents, in the darkness where Earth's crust cracks open.",
  "To study the deep is to confront the limits of human knowledge, a reminder that our planet's final frontier isn't in space, but beneath the waves, where pressure and time have sculpted a world as alien as any exoplanet."
];
    let words = oceanParagraph[Math.floor(Math.random() * oceanParagraph.length)].split(" ");
    wordsTotal = words.length;
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
    wordsNum = 0;
    return words;
}

getWords();
const time = () => {
    intervalID = setInterval(() => {
        if (started) {
            timeLeft++;
        }
        timeDiv.innerText = timeLeft + "s";
        wpm.innerText = Math.floor((correctWords / (timeLeft)) * 60);
        acc.innerText = Math.floor(((correctWords / (wordsNum + 0.0001)) * 100) + 1) + "%";
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
        let wordContent = document.querySelector("#word" + wordsNum);
        wordsNum = wordsNum + 1;
        let nextWord = document.querySelector("#word" + wordsNum);
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
    if(wordsNum === wordsTotal) {
        writing();
    }
}

if (first) {
        checkWords();
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

    }else if(!started || wordsNum === wordsTotal) {
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
        resultAcc.innerText = "Accuracy: " + Math.floor(((correctWords / (wordsNum + 0.0001)) * 100) + 1) + "%";
        if(Math.floor((correctWords / (timeLeft)) * 60) >= 30 && Math.floor((correctWords / (timeLeft)) * 60) <= 40) {
            img.src = "octopus.webp";
            console.log("octopus")
        }
        else if(Math.floor((correctWords / (timeLeft)) * 60) > 40) {
            console.log(Math.floor((correctWords / (timeLeft)) * 60) )
            img.src = "trex.gif"   
            console.log("Trex")
        }
        console.log(Math.floor((correctWords / (timeLeft)) * 60) )
        getWords();
        wordsNum = 0
        timeLeft = 0; 
        correctWords = 0;
        result.style.display = "flex";
        stats.style.display = "none";
        paragraph.style.display = "none";
        clearInterval(intervalID);
    }
}
textArea.disabled = true;
reload.addEventListener("click", writing)
textArea.addEventListener("input", checkWords);
button.addEventListener("click", writing);
console.log("Script loaded successfully");
