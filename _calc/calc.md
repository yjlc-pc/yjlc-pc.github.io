---
title: 计算器
layout: post
date: 2025-01-01 +0800
permalink: /calc/
toc: false
---
<style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
        }
        .calculator {
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            padding: 20px;
            width: 300px;
        }
        .display {
            font-size: 2em;
            margin-bottom: 10px;
            padding: 10px;
            background-color: #f0f0f0;
            border: 1px solid #ddd;
            border-radius: 5px;
            text-align: right;
        }
        .button {
            font-size: 1.5em;
            padding: 10px;
            margin: 5px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #e0e0e0;
        }
        .operator {
            background-color: #4caf50;
            color: white;
        }
        .operator:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>

<div class="calculator">
    <div class="display" id="display">0</div>
    <div>
        <button class="button operator" onclick="clearDisplay()">C</button>
        <button class="button operator" onclick="appendToDisplay('+')">+</button>
        <button class="button operator" onclick="appendToDisplay('-')">-</button>
        <button class="button operator" onclick="appendToDisplay('*')">×</button>
        <button class="button operator" onclick="appendToDisplay('/')">÷</button>
    </div>
    <div>
        <button class="button" onclick="appendToDisplay('1')">1</button>
        <button class="button" onclick="appendToDisplay('2')">2</button>
        <button class="button" onclick="appendToDisplay('3')">3</button>
    </div>
    <div>
        <button class="button" onclick="appendToDisplay('4')">4</button>
        <button class="button" onclick="appendToDisplay('5')">5</button>
        <button class="button" onclick="appendToDisplay('6')">6</button>

    </div>
    <div>
        
        <button class="button" onclick="appendToDisplay('7')">7</button>
        <button class="button" onclick="appendToDisplay('8')">8</button>
        <button class="button" onclick="appendToDisplay('9')">9</button>

    </div>
    
    <div>
        <button class="button" onclick="appendToDisplay('0')">0</button>
        <button class="button" onclick="calculate()">=</button>

    </div>
</div>

<script>
    function clearDisplay() {
        document.getElementById('display').innerText = '0';
    }

    function appendToDisplay(value) {
        let display = document.getElementById('display');
        if (display.innerText === '0') {
            display.innerText = value;
        } else {
            if (display.interText === '错误') {
            display.innerText = value;
            } else {
                display.innerText += value;
            }
        }
    }

    function calculate() {
        let display = document.getElementById('display');
        try {
            display.innerText = eval(display.innerText);
        } catch (e) {
            display.innerText = '错误';
        }
    }
</script>

</body>
