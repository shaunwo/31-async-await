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
let multiNums = [14, 52, 63];
async function part2() {
	for (i = 0; i < multiNums.length; i++) {
		let res = await axios
			.get(`${numbersURL}/${multiNums}?json`)
			.then(
				({ data }) =>
					(outputArea.innerHTML += `  <p>${
						data[multiNums[i]]
					}</p>`)
			)
			.catch((err) => console.log(err));
	}
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
	for (i = 0; i < ranNums.length; i++) {
		outputArea.innerHTML += `  <p>${ranNums[i].data.text}</p>`;
	}
}
part3();
