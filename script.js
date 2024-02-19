const gameContainer = document.getElementById("game");
noClicking=false;
let card1=null;
let card2=null;
let cardsFlipped = 0;  
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
// TODO: Implement this function!
function handleCardClick(event) {
  console.log("you just clicked", event.target);
  if (noClicking) return;
  let selectedCard = event.target.className;
  event.target.style.backgroundColor = selectedCard;
  let card=event.target;
  if (!card1 || !card2) {
    card.classList.add('flipped');
    card1 = card1 || card;
    card.classList.add('flipped');
    card2 = card === card1 ? null : card;
  }
  if (card1 && card2) {
    noClicking = true;
  }

  if(card1.className===card2.className){
    noClicking=false;
    cardsFlipped+=2
    console.log(cardsFlipped);
    card1 = null;
    card2 = null;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = 'white';
        card2.style.backgroundColor = 'white';
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
  };
  console.log(COLORS.length);
  if(cardsFlipped === COLORS.length){
    alert('GAME OVER!You Win!')
    const restart = document.createElement('button');
    restart.innerText = 'RESTART'
    let header = document.querySelector('h1');
    header.appendChild(restart);
    restart.addEventListener('click',function(e){
      let allCards = document.querySelectorAll('.flipped');
      for(let i=0; i<allCards.length; i++){
        let card = allCards[i];
        card.style.backgroundColor = 'white';
        card.classList.remove('flipped');
      }
      cardsFlipped = 0;
      gameContainer.innerHTML = ""; 
      let shuffledColors = shuffle(COLORS);
      createDivsForColors(shuffledColors);
    });
  }
}  

// when the DOM loads
createDivsForColors(shuffledColors);
