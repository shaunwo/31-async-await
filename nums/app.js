let numbersURL = 'http://numbersapi.com';
let outputArea = document.getElementById('output');

// Step 1
let randomNum = 7;
async function part1() {
  let res = await axios
    .get(`${numbersURL}/${randomNum}?json`)
    .then(({ data }) => console.log(data.text))
    .catch((err) => console.log(err));
}
part1();

// Step 2
let multiNums = [14, 52, 9];
async function part2() {
  let res = await axios
    .get(`${numbersURL}/${multiNums}?json`)
    .then(
      ({ data }) =>
        (outputArea.innerHTML += `  <p>${data[14]}</p>
        <p>${data[52]}</p>
        <p>${data[9]}</p>`)
    )
    .catch((err) => console.log(err));
}
part2();

// Step 3
async function part3() {
  let ranNums = await Promise.all([
    axios.get(`${numbersURL}/random?json`),
    axios.get(`${numbersURL}/random?json`),
    axios.get(`${numbersURL}/random?json`),
    axios.get(`${numbersURL}/random?json`),
  ]);

  outputArea.innerHTML += `  <p>${ranNums[0].data.text}</p>`;
  outputArea.innerHTML += `  <p>${ranNums[1].data.text}</p>`;
  outputArea.innerHTML += `  <p>${ranNums[2].data.text}</p>`;
  outputArea.innerHTML += `  <p>${ranNums[3].data.text}</p>`;
}
part3();
