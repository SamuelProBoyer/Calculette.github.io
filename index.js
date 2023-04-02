let runningTotal = 0;
let buffer = "0";
let previousOperator;


const screen = document.querySelector(".screen");

function onBtnClick(value) {
    //La propriété globale NaN est une valeur utilisée pour représenter une quantité qui n'est pas un nombre (Not a Number en anglais)
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    //innerText returns all text contained by an element and all its child elements. innerHtml returns all text, including html tags, that is contained by an element.
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            break;
        case "=":
            if (previousOperator === null) {
                return
            }
            flushOpreation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.toString(0, buffer.length - 1);
            }
            break;
        case "+":
        case "−":
        case "×":
        case "÷":
            handleMath(symbol);
            break;

    }
}


function handleMath(symbol) {
    if (buffer === "0") {
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;

    } else {
        flushOpreation(intBuffer);
    }

    previousOperator = symbol;
    buffer = "0";
}


function flushOpreation(intBuffer) {
    if(previousOperator === "+") {
        runningTotal += intBuffer;

    } else if (previousOperator === "−") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;
    } else if (previousOperator === "÷") {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if(buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector(".calc-btn").addEventListener("click", function(event){
        onBtnClick(event.target.innerText);
    });
}



init();


// Added function from ChatGPT
// Define the function that will play the song
function playSong() {
    // Replace the URL with the location of your song file
    var audio = new Audio('audio/LoL.mp3');
    audio.play();
  }
  
  // Keep track of the keys that have been pressed
  var keysPressed = [];
  
  // Add an event listener to the document to detect key presses
  document.addEventListener('keydown', function (event) {
    // Check if the pressed key is q, w, e or r
    if (event.key === 'q' || event.key === 'w' || event.key === 'e' || event.key === 'r') {
      // Add the key to the array of keys pressed
      keysPressed.push(event.key);
      // If q w e r have been pressed in sequence, call the playSong function
      if (keysPressed.join('') === 'qwer') {
        playSong();
        // Reset the array of keys pressed
        keysPressed = [];
      }
    } else {
      // Reset the array of keys pressed if any other key is pressed
      keysPressed = [];
    }
  });