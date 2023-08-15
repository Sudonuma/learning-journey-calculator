
let buffer = '0'
let newBuffer = '0'
let runningTotal = 0
let previousOp = ''
const screen = document.querySelector('.screen')

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender()

}
function handleNumber (number) {
    if (previousOp === '=') {
        buffer = number
        previousOp = ''
        return
    }
    if (buffer === '0') {
        buffer = number
    } else {
        buffer += number
    }
    
} 

const handleMath = (symbol) =>  { 
    const intBuffer = parseInt(buffer)
    if (buffer === '0') {
        return;
    } 
    if (runningTotal === 0) {
        runningTotal = intBuffer
    } else {
        doOperation(intBuffer) 
    }
    previousOp = symbol
    buffer = '0'
    
    }

const doOperation = (intBuffer) => {
    if (previousOp === '+') {
        runningTotal += intBuffer
    } else if (previousOp === '-') {
        runningTotal -= intBuffer
    } else if (previousOp === '×') {
        runningTotal *= intBuffer
    } else if (previousOp === '÷') {
        runningTotal /= intBuffer
    } 
    }

function handleSymbol (symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0'
            break;

        case '←':
            if (buffer !== '0' && buffer.length > 1) {
            buffer = buffer.substring(0, buffer.length - 1)
            } else {
                buffer = '0'
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':    
            handleMath(symbol)
            break;
        case '=':
            if (previousOp === '') {
                return;
            }
            doOperation(parseInt(buffer))
            previousOp = '='
            buffer = runningTotal
            runningTotal = 0
            break;

}
} 

function init () {

    document
        .querySelector('.calc-buttons')
        .addEventListener("click", event => buttonClick(event.target.innerText))
}

function rerender () {
    screen.innerText = buffer;
}
init();