const display = document.getElementById('display');

const buttons = document.querySelectorAll('.calc-btn');
const btnBackslash = document.getElementById('backslash');
const savedValuesAll = document.getElementById('savedValuesAll');

let displayValue = '';
let savedValues = [];

buttons.forEach((btn) => {
	btn.addEventListener('click', () => {
		let value = btn.value.trim();
		if (value === 'AC') value = 'clear';
		handleInput(value);
	});
});

btnBackslash.addEventListener('click', () => {
	backspace();
});

function handleInput(value) {
	switch (value) {
		case '=':
			calculateResult();
			break;

		case 'clear':
			clearDisplay();
			break;

		case 'save':
			saveValue();
			break;

		case '±':
			toggleSign();
			break;

		default:
			appendValue(value);
			break;
	}

	updateDisplay();
}

function appendValue(val) {
	if (val === '×') val = '*';
	if (val === '÷') val = '/';
	if (val === '−') val = '-';
	if (val === '∙') val = '.';

	displayValue += val;
}

function calculateResult() {
	try {
		let result = eval(displayValue);

		displayValue = String(result);
	} catch (error) {
		displayValue = 'Error';
	}
}

function clearDisplay() {
	displayValue = '';
}

function saveValue() {
	if (displayValue !== '') {
		savedValues.push(displayValue);
		savedValuesAll.innerText = savedValues.join('\n');
	}
}

function toggleSign() {
	if (!displayValue) return;

	if (displayValue.startsWith('-')) {
		displayValue = displayValue.slice(1);
	} else {
		displayValue = '-' + displayValue;
	}
}

function backspace() {
	if (displayValue === '') return;
	displayValue = displayValue.slice(0, -1);
	if (displayValue === '') {
		displayValue = '0';
	}

	updateDisplay();
}

function updateDisplay() {
	display.value = displayValue;
}
