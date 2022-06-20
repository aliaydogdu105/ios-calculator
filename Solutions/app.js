/*  1) first print the keypad to the screen
    2) blocking spaces when pressed outside the keypad
    3) prevent concatition when printing numbers
    4) The event of throwing to the 2nd screen when 4 operations are pressed
    5) math oparation on the 2nd screen
    6) AC clear event
    7) Equals function
    8) Check if it prints from the keyboard */

//? Screens
const prevDisp = document.querySelector('.previous-display');
const currDisp = document.querySelector('.current-display');

//?Button container
const btnContainer = document.querySelector('.buttons-container');

//? Variable definitions for intermediate values
let currOperand = '';
let previousOperand = '';
let operation = '';

let equalOrPercentPressed = '';

//? Event definition for the container carrying the buttons
btnContainer.addEventListener('click', (e) => {
  //? If any number (num) has been clicked
  if (e.target.classList.contains('num')) {
    appendNumber(e.target.textContent);
    updateDisplay();
  }

  //? If any operator button (+,-,x,/) is clicked
  if (e.target.classList.contains('operator')) {
    chooseOperator(e.target.textContent);
    updateDisplay();
  }
  //? If the equal button is clicked
  if (e.target.classList.contains('equal')) {
    calculate();
    updateDisplay();
    equalOrPercentPressed = true;
  }

  //? If the AC button is clicked
  if (e.target.classList.contains('ac')) {
    previousOperand = '';
    currOperand = '';
    operation = '';
    updateDisplay();
  }

  //? If the PM button is clicked
  if (e.target.classList.contains('pm')) {
    if(!currOperand) return;
    currOperand = currOperand / 100;
    updateDisplay();
  }

  //? If the Percent button is clicked
  if (e.target.classList.contains('percent')) {
    previousOperand = '';
    currOperand = '';
    operation = '';
    updateDisplay();
    equalOrPercentPressed = true;
  }
});

const appendNumber = (num) => {
  //? Return if 0 is entered before and 0 is entered again
  if (currOperand === '0' && num === '0') return;

 /* If 0 is entered first and then '.' If another number is entered, 
 just transfer the entered new number to the variable.*/
  
  if (currOperand === '0' && num !== '.') {
    currOperand = num;
    return;
  }

  //? If the current num is '.' and the previous entered num is '.' come back if it does
  if (num === '.' && currOperand.includes('.')) return;

  if (currOperand.length > 10) return;

  if (equalOrPercentPressed){
    currOperand = num;
    equalOrPercentPressed = false;
    return;
  }
  //? Concat entered numbers
  currOperand += num;
};

const updateDisplay = () => {
    if(currOperand.toString().length > 11){
        currOperand = Number(currOperand).toExponential(3);
    }
  currDisp.textContent = currOperand;
  prevDisp.textContent = `${previousOperand} ${operation}`;
};

const chooseOperator = (op) => {
  //? perform operations after the first number entry
  if (previousOperand) {
    calculate();
  }

  //? variable swapping
  operation = op;
  previousOperand = currOperand;
  currOperand = '';
};

const calculate = () => {
  let calculation = 0;

  const prev = Number(previousOperand);
  const current = Number(currOperand);

  switch (operation) {
    case '+':
      calculation = prev + current;
      break;
    case '-':
      calculation = prev - current;
      break;
    case 'x':
      calculation = prev * current;
      break;
    case '÷':
      calculation = prev / current;
      break;
    default:
      return;
  }

  currOperand = calculation;

  /* When the Equal button is clicked, the previousOperand and 
  operation must be deleted so that it does not appear on the screen*/
  previousOperand = '';
  operation = '';
};