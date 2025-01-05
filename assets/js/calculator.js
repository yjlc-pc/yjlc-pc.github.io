document.addEventListener("DOMContentLoaded", function () {
  const calculatorContainer = document.getElementById("calculator-app");

  // 创建计算器界面
  calculatorContainer.innerHTML = `
    <div class="calculator">
      <input type="text" class="calculator-display" id="calculator-display" disabled />
      <div class="calculator-buttons">
        <button class="btn">1</button>
        <button class="btn">2</button>
        <button class="btn">3</button>
        <button class="btn operator">÷</button>
        <button class="btn">4</button>
        <button class="btn">5</button>
        <button class="btn">6</button>
        <button class="btn operator">×</button>
         <button class="btn">7</button>
        <button class="btn">8</button>
        <button class="btn">9</button>
        <button class="btn operator">-</button>
        <button class="btn">0</button>
        <button class="btn">.</button>
        <button class="btn operator">+</button>
        <button class="btn operator">=</button>
        <button class="btn operator">AC</button>
      </div>
    </div>
  `;

  const display = document.getElementById("calculator-display");
  let currentInput = "";
  let operator = null;
  let operand1 = null;

  document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function () {
      const value = this.textContent;

      if (!isNaN(value) || value === ".") {
        currentInput += value;
        display.value = currentInput;
      } else if (value === "C") {
        currentInput = "";
        operator = null;
        operand1 = null;
        display.value = "";
      } else if (value === "=") {
        if (operator && operand1 !== null) {
          const operand2 = parseFloat(currentInput);
          let result;

          switch (operator) {
            case "+":
              result = operand1 + operand2;
              break;
            case "-":
              result = operand1 - operand2;
              break;
            case "*":
              result = operand1 * operand2;
              break;
            case "/":
              result = operand1 / operand2;
              break;
          }

          display.value = result;
          currentInput = result.toString();
          operator = null;
          operand1 = null;
        }
      } else {
        if (currentInput) {
          operand1 = parseFloat(currentInput);
          operator = value;
          currentInput = "";
        }
      }
    });
  });
});
