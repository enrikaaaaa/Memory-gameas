const cards = document.querySelectorAll(".card"); //visos kortos
let cardOne, cardTwo;
let disableDeck = false; //kad nebutu galima paspausti daugiau nei 2 kortu
let matchedCard = 0; //kiek jau sutapo kortu


function flipCard(e) {
  let clickedCard = e.target;
  if (clickedCard !== cardOne) {
    clickedCard.classList.add("flip"); // prie kiekvienos paspaustos korteles prisideda klase flip vietoje hoover
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;

    let cardOneImg = cardOne.querySelector("img").src,
      cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg); //tikrina ar vienodi img pavadinimai
  }
}

function matchCards(img1, img2) {
  //lygina ar sutampa
  if (img1 === img2) {
    matchedCard++;
    if (matchedCard == 8) {        
        setTimeout(() =>{
            shuffleCard();
        }, 1000);
    } //jei sutampa (laimi) visos kortos tada susimaiso
    

    cardOne.removeEventListener("click", flipCard); //jei sutampa nuima event listenerius
  cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = ''; //nuresetina kintamuosius
    return (disableDeck = false); //kad butu galima paspausti kitas korteles
}
  setTimeout(() => {
    cardOne.classList.add("shake"); //sprideda papurtymo klase
    cardTwo.classList.add("shake");
  }, 400);
  
  setTimeout(() => {
    cardOne.classList.remove("shake", "flip"); //prideda papurtymo klase kuri NEVEIKIA
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
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); //sumaiso kortas

    cards.forEach((card, i) => {
      card.classList.remove("flip");
      let imgTag = card.querySelector('.back-view img');
    imgTag.src = `Pictures/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
    });
    }
    shuffleCard();

cards.forEach((card) => {
   //card.classList.add("flip");
    
  card.addEventListener("click", flipCard); //event listeneri visom kortelem
});

// skaiciuoja ejimus

const counter = document.querySelector(".count");
let count = 0;
function countClicks() {
  count++;
  counter.innerHTML = 'Ėjimai: ' + count;
}
cards.forEach((card) => {
  card.addEventListener( "click", countClicks);
});
// skaiciuoja laika
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
    
// restartas
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

// Pauzes mygtukas
const pause = document.querySelector(".pause");
pause.addEventListener("click", () => {
  clearTimeout(t);
  disableDeck = true;
});

// Zaidimo tesimui po pauzes
const play = document.querySelector(".play");
play.addEventListener("click", () => {
  timerStart();
  disableDeck = false;
});







