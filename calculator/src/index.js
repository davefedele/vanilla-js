const app = document.getElementById("app");
const display = document.querySelector(".display");
const clear = document.querySelector(".clear");

let operand;
let variable1 = "";
let variable2 = "";

let operands = {
  "+": "+",
  "-": "-",
  "×": "*",
  "÷": "/"
};

app.addEventListener("click", (e) => {
  let pressed = e.target.innerHTML;
  handlePressed(pressed);
});

function handlePressed(pressed) {
  if (pressed === "C") {
    // clearing last variable
    variable2 = "";
    display.innerHTML = "";
    clear.innerHTML = "AC";
    return;
  }

  if (pressed === "AC") {
    // clearing last variable
    operand = "";
    variable1 = "";
    variable2 = "";
    display.innerHTML = "";
    clear.innerHTML = "C";
    return;
  }

  if (pressed === "=") {
    // compute the value
    display.innerHTML = computeValue();
    // save result to first variable for further calcs
    variable1 = display.innerHTML;
    variable2 = "";
    return;
  }

  if (!!operands[pressed]) {
    // store the desired operation
    operand = operands[pressed];
  } else {
    // store the number being entered
    if (!variable1 || (variable1 && !operand)) {
      variable1 += pressed;
      display.innerHTML = variable1;
    } else {
      variable2 += pressed;
      display.innerHTML = variable2;
    }
  }
}

function computeValue() {
  // avoid eval and return calculated value
  switch (operand) {
    case "+":
      return Number(variable1) + Number(variable2);
    case "-":
      return Number(variable1) - Number(variable2);
    case "*":
      return Number(variable1) * Number(variable2);
    case "/":
      return Number(variable1) / Number(variable2);
    default:
      console.warn("something went wrong");
  }
}

window.addEventListener("keyup", function (e) {
  let allowed = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "Enter",
    "=",
    "+",
    "-",
    "/",
    "*",
    ".",
    "Backspace"
  ];

  if (allowed.indexOf(e.key) !== -1) {
    switch (e.key) {
      case "Backspace":
        handlePressed(clear.innerHTML);
        break;
      case "Enter":
        handlePressed("=");
        break;
      case "/":
        handlePressed("÷");
        break;
      case "*":
        handlePressed("×");
        break;
      default:
        handlePressed(e.key);
    }
  }
});
