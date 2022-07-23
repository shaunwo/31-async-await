let cardsURL = 'http://deckofcardsapi.com/api/deck/';
let cardArea = document.getElementById('cards');

// Capitalize function taken from https://attacomsian.com/blog/string-capitalize-javascript
const capitalize = (str) => {
  if (typeof str === 'string') {
    return str.replace(/^\w/, (c) => c.toUpperCase());
  } else {
    return '';
  }
};

// Step 1
axios
  .get(`${cardsURL}new/draw/`)
  .then((data) => {
    //console.log(data);
    let { suit, value } = data.data.cards[0];
    console.log(
      `${capitalize(value.toLowerCase())} of ${capitalize(suit.toLowerCase())}`
    );
  })
  .catch((err) => console.log(err));

// Step 2
let twoPromises = [];
for (let i = 0; i < 2; i++) {
  twoPromises.push(axios.get(`${cardsURL}new/draw/`));
}
Promise.all(twoPromises)
  .then((cardsArr) =>
    cardsArr.forEach((data) => {
      let { suit, value } = data.data.cards[0];
      console.log(
        `${capitalize(value.toLowerCase())} of ${capitalize(
          suit.toLowerCase()
        )}`
      );
    })
  )
  .catch((err) => console.log(err));

// Step 3
let deckId = null;
let button = document.getElementById('give-me-button');

axios
  .get(`${cardsURL}new/shuffle/`)
  .then((data) => {
    deckId = data.data.deck_id;
    button.style.display = '';
  })
  .catch((err) => console.log(err));

button.onclick = function () {
  axios
    .get(`${cardsURL}${deckId}/draw/`)
    .then((data) => {
      let cardSrc = data.data.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      document.getElementById(
        'cards'
      ).innerHTML = `<img src="${cardSrc}" style="transform: translate(${randomX}px, ${randomY}px) rotate(${angle}deg); margin-top: 50px;" />`;
      button.style.display = 'none';
    })
    .catch((err) => console.log(err));
};
