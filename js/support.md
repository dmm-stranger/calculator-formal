# support AI logics:

### script.js\_\_\_

```
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calc-btn');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');
const backspaceBtn = document.querySelector('.cut');
const expressionDisplay = document.querySelector('.calc-child3 p');

// STATE
let currentNumber = '0';
let firstNumber = null;
let operator = null;
let waiting = false;
let expression = '';

// UPDATE DISPLAY
function updateDisplay() {
	display.value = currentNumber;
	expressionDisplay.innerText = expression;
}

// INPUT NUMBER
function inputNumber(num) {
	if (waiting) {
		currentNumber = num;
		waiting = false;
	} else {
		currentNumber = currentNumber === '0' ? num : currentNumber + num;
	}
}

// DECIMAL
function inputDecimal() {
	if (waiting) {
		currentNumber = '0.';
		waiting = false;
		updateDisplay(); // ✅ FIX
		return;
	}

	if (!currentNumber.includes('.')) {
		currentNumber += '.';
	}

	updateDisplay(); // ✅ FIX
}

// OPERATOR
function handleOperator(op) {
	if (operator && !waiting) {
		calculate();
	}

	firstNumber = currentNumber;
	operator = op;
	waiting = true;

	expression = `${firstNumber} ${op}`; // ✅ show operation

	updateDisplay();
}
// CALCULATE
function calculate() {
	if (!operator || waiting) return;

	let a = Number(firstNumber);
	let b = Number(currentNumber);
	let result;

	switch (operator) {
		case '+':
			result = a + b;
			break;
		case '-':
			result = a - b;
			break;
		case '×':
			result = a * b;
			break;
		case '÷':
			result = b === 0 ? 'Error' : a / b;
			break;
	}

	// ✅ SHOW FULL EXPRESSION
	expression = `${firstNumber} ${operator} ${currentNumber}`;

	currentNumber = String(result);

	firstNumber = null;
	operator = null;
	waiting = false;

	updateDisplay();
}
// CLEAR
function clearAll() {
	currentNumber = '0';
	firstNumber = null;
	operator = null;
	waiting = false;
	expression = '';

	updateDisplay();
}

// BACKSPACE
function backspace() {
	if (waiting) return;

	if (currentNumber.length === 1) {
		currentNumber = '0';
	} else {
		currentNumber = currentNumber.slice(0, -1);
	}
}

// SIGN (+/-)
function toggleSign() {
	if (currentNumber === '0') return;

	currentNumber = currentNumber.startsWith('-')
		? currentNumber.slice(1)
		: '-' + currentNumber;
}

// BUTTON EVENTS
buttons.forEach((btn) => {
	btn.addEventListener('click', () => {
		let value = btn.innerText.trim();

		// FIX SYMBOLS
		if (value === '−') value = '-';
		if (value === '∙') value = '.'; // ✅ important
		if (value === '±') value = '±';

		// NUMBER
		if (!isNaN(value)) {
			inputNumber(value);
		}
		// DECIMAL
		else if (value === '.') {
			inputDecimal();
		}
		// SIGN
		else if (value === '±') {
			toggleSign();
		}
		// OPERATOR
		else if (['+', '-', '×', '÷'].includes(value)) {
			handleOperator(value);
		}

		updateDisplay(); // ✅ always update
	});
});

// SPECIAL BUTTONS
clearBtn.addEventListener('click', () => {
	clearAll();
	updateDisplay();
});

equalsBtn.addEventListener('click', () => {
	calculate();
	updateDisplay();
});

backspaceBtn.addEventListener('click', () => {
	backspace();
	updateDisplay();
});

// INIT
updateDisplay();

```
