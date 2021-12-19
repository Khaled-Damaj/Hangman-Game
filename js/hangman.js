let lettersBox = document.querySelector(".letters-box");
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

LETTERS.split("").forEach((letter) => {
  let span = document.createElement("span");
  span.setAttribute("class", "character");
  let textNode = document.createTextNode(letter);
  span.appendChild(textNode);
  lettersBox.appendChild(span);
});

const words = {
  Animals: [
    "lion",
    "whale",
    "Snake",
    "Bear",
    "Gorilla",
    "Giraffe",
    "Elephant",
    "Kangaroo",
    "Monkey",
    "Tiger",
    "Eagle",
    "Zebra",
  ],
  Movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  People: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
    "Nelson Mandela",
    "Steve Jobs",
  ],
  Countries: [
    "Syria",
    "Palestine",
    "Yemen",
    "Egypt",
    "Bahrain",
    "Qatar",
    "Lebanon",
    "Saudi",
  ],
};
let wordsKeys = Object.keys(words);
let randomPropertyIndex = Math.floor(Math.random() * wordsKeys.length);
let randomPropertyName = wordsKeys[randomPropertyIndex];

let randomValueIndex = Math.floor(
  Math.random() * words[randomPropertyName].length
);
let randomValueName = words[randomPropertyName][randomValueIndex];

let guessContainer = document.querySelector(".guess-letter");

let hint = Array.from(randomValueName);

hint.forEach((letter) => {
  let span = document.createElement("span");
  guessContainer.appendChild(span);
  if (letter === " ") {
    span.setAttribute("class", "space");
  }
});

document.querySelector(".category").innerHTML = randomPropertyName;
let drawContainer = document.querySelector(".draw");
let mistake = 0;
let attempt = 0;
document.addEventListener("click", function (e) {
  if (e.target.className === "character") {
    attempt++;
    let status = false;
    e.target.setAttribute("class", "clicked");
    let letterClicked = e.target.textContent.toLowerCase();
    hint.forEach((letter, index) => {
      if (letterClicked === letter.toLowerCase()) {
        status = true;
        guessContainer.children[index].innerHTML = letter;
      }
    });
    if (!status) {
      mistake++;
      document.querySelector(".mistake").innerHTML = mistake;
      drawContainer.classList.add(`wrong-${mistake}`);
    }
    if (mistake === 10) {
      lettersBox.classList.add("stop");
      failPopup();
    } else {
      let guessedLetter = "";
      document.querySelectorAll(".guess-letter span").forEach((span) => {
        guessedLetter += span.textContent;
      });

      if (guessedLetter === randomValueName) {
        popup();
      }
    }
  }
});

function popup() {
  let div = document.createElement("div");
  div.setAttribute("class", "popup");
  div.innerHTML = `
  <div class="box">
    <div class="circle"></div>
    <div class="info">
        <h2>Gongratulations !!</h2>
        <p>You win with ${attempt} attempt and ${mistake} mistakes</p>
    </div>
     <div class="submit">
        <span class="play">Play Again</span>
        <span class="cancel">Cancel</span>
     </div>
</div>
  `;
  document.body.appendChild(div);
  document.querySelector(".popup .play").onclick = () => {
    location.reload();
  };
  document.querySelector(".popup .cancel").onclick = () => {
    document.querySelector(".popup").remove();
  };
}

function failPopup() {
  let div = document.createElement("div");
  div.setAttribute("class", "popup", "fail");
  div.innerHTML = `
  <div class="box">
    <div class="circle">
        <span></span>
    </div>
    <div class="info">
        <h2>Game Over,</h2>
        <p>The Word is ${randomValueName}</p>
    </div>
    <div class="submit">
        <span class="play">Try Again</span>
        <span class="cancel">Cancel</span>
    </div>
</div>
    `;
  document.body.appendChild(div);
  document.querySelector(".popup .play").onclick = () => {
    location.reload();
  };
  document.querySelector(".popup .cancel").onclick = () => {
    document.querySelector(".popup").remove();
  };
}
