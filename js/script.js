const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calc-btn');
const clearButton = document.getElementById('clear');
const equalButton = document.getElementById('equals');

let currentInput = '';

buttons.forEach((button) => {
	button.addEventListener('click', () => {
		currentInput += button.textContent;
		display.value = currentInput;
	});
});

clearButton.addEventListener('click', () => {
	currentInput = '';
	display.value = '';
});

equalButton.addEventListener('click', () => {
	try {
		currentInput = eval(currentInput);
		console.log(currentInput);
		// display.value = currentInput;
	} catch (error) {
		display.value = 'Error';
		currentInput = '';
	}
});
