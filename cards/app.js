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
async function part1() {
  let res = await axios
    .get(`${cardsURL}new/draw/`)
    .then((data) => {
      let { suit, value } = data.data.cards[0];
      console.log(
        `${capitalize(value.toLowerCase())} of ${capitalize(
          suit.toLowerCase()
        )}`
      );
    })
    .catch((err) => console.log(err));
}
part1();

// Step 2
async function part2() {
  let ranNums = await Promise.all([
    axios.get(`${cardsURL}new/draw/`),
    axios.get(`${cardsURL}new/draw/`),
  ]);
  for (i = 0; i < 2; i++) {
    let { suit, value } = ranNums[i].data.cards[0];
    console.log(
      `${capitalize(value.toLowerCase())} of ${capitalize(suit.toLowerCase())}`
    );
  }
}
part2();

// Step 3
let button = document.getElementById('give-me-button');

async function setup() {
  let deckData = await axios.get(`${cardsURL}new/shuffle/`);
  deckId = deckData.data.deck_id;
  button.style.display = '';

  button.onclick = async function () {
    let cardData = await axios
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
}
setup();
