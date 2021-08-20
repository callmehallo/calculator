"use script";

const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) return "ERROR";
  else return a / b;
};
const operate = (op, a, b) => {};
const calc = document.querySelector(".calc");
const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".num");
/* //numbers
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");
const zero = document.querySelector("#zero");
//operators
const clear = document.querySelector("#clear");
const vz = document.querySelector("#vz");
const percent = document.querySelector("#percent");
const times = document.querySelector("multiply");
const minus = document.querySelector("minus");
const plus = document.querySelector("plus");
const equals = document.querySelector("#equals");
const point = document.querySelector("point");
const divideSign = document.querySelector("#divide"); */
let dispVal = 0;
display.textContent = `${dispVal}`;
/* const calcFunc = e; */

calc.addEventListener("click", (e) => {
  if (e.target.getAttribute("id") === "clear") return (dispVal = "");
  else if (e.target.hasAttribute("data-type")) {
    dispVal = `${e.target.innerText}`;
    return (display.textContent = `${dispVal}`);
  }
});
