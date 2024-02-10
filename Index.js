const cards = document.querySelectorAll(".card"); 
let cardOne, cardTwo;
let disableDeck = false; 
let matchedCard = 0; 


function flipCard(e) {
  let clickedCard = e.target;
  if (clickedCard !== cardOne) {
    clickedCard.classList.add("flip"); 
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;

    let cardOneImg = cardOne.querySelector("img").src,
      cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg); 
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++;
    if (matchedCard == 8) {        
        setTimeout(() =>{
            shuffleCard();
        }, 1000);
    } 
    
cardOne.removeEventListener("click", flipCard);
cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = ''; 
    return (disableDeck = false); 
}
  setTimeout(() => {
    cardOne.classList.add("shake"); 
    cardTwo.classList.add("shake");
  }, 400);
  
  setTimeout(() => {
    cardOne.classList.remove("shake", "flip"); 
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = ''; 
  }, 1200);
  disableDeck = false;
}
function shuffleCard() {
    matchedCard = 0;
    cardOne = cardTwo = '';
    disableDeck = false;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); 

    cards.forEach((card, i) => {
      card.classList.remove("flip");
      let imgTag = card.querySelector('.back-view img');
    imgTag.src = `Pictures/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
    });
    }
    shuffleCard();

cards.forEach((card) => {
card.addEventListener("click", flipCard); 
});

const counter = document.querySelector(".count");
let count = 0;
function countClicks() {
  count++;
  counter.innerHTML = 'Ėjimai: ' + count;
}
cards.forEach((card) => {
  card.addEventListener( "click", countClicks);
});

const timer = document.querySelector(".timer");
let seconds = 0;
let minutes = 0;
let hours = 0;
let t;
function add() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }
  timer.textContent =
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds > 9 ? seconds : "0" + seconds);
  timerStart();
}
function timerStart() {
    t = setTimeout(add, 1000);
    }
cards.forEach((card) => {
    card.addEventListener("click", timerStart);
    }
);

const restart = document.querySelector(".restart");
restart.addEventListener("click", () => {
  clearTimeout(t);
  timer.textContent = "00:00:00";
  seconds = 0;
  minutes = 0;
  hours = 0;
  count = 0;
  counter.innerHTML = 'Ėjimai: ' + count;
  shuffleCard();
  
});

const pause = document.querySelector(".pause");
pause.addEventListener("click", () => {
  clearTimeout(t);
  disableDeck = true;
});

const play = document.querySelector(".play");
play.addEventListener("click", () => {
  timerStart();
  disableDeck = false;
});







