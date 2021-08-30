let displayValue = 0; //am display angezeigt
let firOperand = 0; // nummer 1
let secOperand = 0; // nummer 2
let firOperator = ""; // operator 1
let result = 0;
let clicked = false; // disable decimal-button
let historyArr = [];

const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b == 0) {
    alert(">:(");
    alert("not devidable by 0");
    return 0;
  } else {
    return a / b;
  }
};

const operate = (a, op, b) => {
  if (op === "/") {
    return divide(a, b);
  } else if (op === "*") {
    return multiply(a, b);
  } else if (op === "+") {
    return add(a, b);
  } else if (op === "-") {
    return substract(a, b);
  }
};

// DOM
const calc = document.querySelector(".calc");
const display = document.querySelector(".displayVal");
const numbers = document.querySelectorAll(".num");
const deci = document.querySelector("#point");
const history = document.querySelector(".history");

window.addEventListener("keyup", (e) => {
  if (e.key === "Shift") {
    return;
  } else if (e.key === "=") {
    const key = document.querySelector(`button[data-key='Enter']`);
    key.click();
  } else {
    const key = document.querySelector(`button[data-key='${e.key}']`);
    key.click();
  }
});

const showHistory = (num1, opr, num2) => {
  if (opr === "/") {
    opr = `÷`;
  } else if (opr === "*") {
    opr = "×";
  }
  if (historyArr.join(" ").length >= 83) {
    while (historyArr.join(" ").length >= 45) {
      historyArr.shift();
    }
    history.textContent = `${historyArr.join(" ")}`;
  } else if (result === num1) {
    historyArr.push(" ", opr, num2);
  } else {
    historyArr.push(num1, opr, num2);
  }
  history.textContent = `${historyArr.join(" ")}`;
};

const outputDisplay = () => (display.textContent = `${displayValue}`); //zeigt die Nummer am display an
const outputResult = () => (display.textContent = `${result}`); //zeigt Ergebnis an

const operatorDecision = (e) => {
  if (e.target.getAttribute("id") === "divide") return "/";
  else if (e.target.getAttribute("id") === "multiply") return "*";
  else return `${e.target.innerText}`;
};

const giveResult = (num1, opr, num2) => {
  showHistory(num1, opr, num2);
  result = operate(Number(num1), opr, Number(num2));
  if (result % 1 !== 0) {
    result = parseFloat(result).toFixed(3);
  }
  outputResult();
  firOperand = result;

  secOperand = 0;
  displayValue = 0;
};
const enableDecimals = () => {
  displayValue = 0;
  clicked = false;
};
const checkDecimal = () => {
  if (displayValue % 1 !== 0) {
    clicked = true;
  } else {
    clicked = false;
  }
};

calc.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-type")) {
    if (displayValue == 0 && displayValue !== "0.") {
      displayValue = `${e.target.innerText}`;
    } else {
      displayValue += `${e.target.innerText}`;
    }
    return outputDisplay();
  } else if (e.target.hasAttribute("data-opr")) {
    if (firOperand && firOperator !== "" && !secOperand && !displayValue) {
      firOperator = operatorDecision(e);
    }
    if (!firOperator) {
      if (!displayValue) firOperand = result;
      else if (displayValue) firOperand = displayValue;
      enableDecimals();
      firOperator = operatorDecision(e);
    } else if (firOperand && firOperator !== "") {
      secOperand = displayValue;
      enableDecimals();
      giveResult(firOperand, firOperator, secOperand);
      firOperator = operatorDecision(e);
    } else if (!firOperand && firOperator && displayValue) {
      firOperand = 0;
      secOperand = displayValue;
      enableDecimals();
      giveResult(firOperand, firOperator, secOperand);
      firOperator = operatorDecision(e);
    }
  } else if (e.target.getAttribute("id") === "vz") {
    if (!displayValue) {
      result *= -1;
      outputResult();
    } else {
      displayValue *= -1;
      outputDisplay();
    }
  } else if (e.target.getAttribute("id") === "percent") {
    if (!displayValue) {
      result *= 0.01;
      outputResult();
    } else {
      displayValue *= 0.01;
      outputDisplay();
    }
  }
  if (e.target.getAttribute("id") === "point") {
    checkDecimal();
    if (!clicked) {
      displayValue = `${displayValue}.`;
      clicked = true;
      outputDisplay();
    } else return;
  } else if (e.target.getAttribute("id") === "equals") {
    if (!firOperator) {
      enableDecimals();
      return;
    } else if (firOperator) {
      if (!firOperand) firOperand = result;
      secOperand = displayValue;
      giveResult(firOperand, firOperator, secOperand);
    }
    firOperator = "";
  } else if (e.target.getAttribute("id") === "clear") {
    displayValue = 0;
    secOperand = 0;
    firOperand = 0;
    firOperator = "";
    historyArr = [];
    history.textContent = "";
    result = 0;
    clicked = false;

    outputDisplay();
  }
});
