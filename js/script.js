// catch display:
const display = document.getElementById('display'); // #dis

// catch all type buttons:
const buttons = document.querySelectorAll('.calc-btn'); // #btn
const btnBackslash = document.getElementById('backslash'); // #btn

// buttons addEventListener:
buttons.forEach((btn) => {
	// #btn
	btn.addEventListener('click', () => {
		// display.innerText += btn.innerText;
		const displayText = btn.innerText; // todo
		console.log(displayText);
		changeDisplay(displayText);
	});
});

btnBackslash.addEventListener('click', () => {
	console.log(btnBackslash.value);
});

// func: change display value: #dis
const changeDisplay = (innerText) => {
	display.value += innerText; //todo
};
