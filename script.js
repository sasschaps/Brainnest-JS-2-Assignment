const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

const updateDisplay = () => {
    const display = document.querySelector('.screen');
    display.value = calculator.displayValue;
};
updateDisplay();

const inputDigit = (digit) => {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = 
        displayValue === '0' ? digit : displayValue + digit;
    }
};

const inputDecimal = (decimal) => {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }
    if (!calculator.displayValue.includes(decimal)) {
        calculator.displayValue += decimal;
    }
};

const handleOperator = (nextOperator) => {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }
    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    }   else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(6))}`
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
};

const calculate = (firstOperand, secondOperand, operator) => {
    if(operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }
    return secondOperand;
    };

const resetCalculator = () => {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    };


    const calculatePercentage = () => {
        const currentValue = parseFloat(calculator.displayValue);
        const percentageValue = currentValue / 100;
        calculator.displayValue = percentageValue.toString();
    };

    const inputDoubleZero = () => {
        const { displayValue, waitingForSecondOperand } = calculator;

        if (waitingForSecondOperand === true) {
            calculator.displayValue = '0';
            calculator.waitingForSecondOperand = false;
        } else {
            calculator.displayValue = 
            displayValue === '0' ? '0' : displayValue + '00';
        }
    };

const keys = document.querySelector('.keys')
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    if (target.classList.contains('percent')) {
        deleteLastDigit();
        updateDisplay();
    }

    if (target.classList.contains('double-zero')) {
        inputDoubleZero();
        updateDisplay();
        return;
    }

    inputDigit(target.value)
    updateDisplay();
});
