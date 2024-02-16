const resultElement = document.getElementById('result')
const submitBtn = document.getElementById('submit')
const num1 = document.getElementById('num1')
const num2 = document.getElementById('num2')
let sign = ''
const buttonIds = ['plus', 'minus', 'mult', 'div']
const buttons = buttonIds.map(buttonIds => {
	const button = document.getElementById(buttonIds)
	return {
		title: buttonIds,
		sign: button.textContent,
		color: button.style.backgroundColor,
		width: button.style.width,
	}
})

buttons.forEach(function (button) {
	document.getElementById(button.title).onclick = function () {
		operation = button.title
		sign = button.sign
		console.log(sign)
		sizeChanger(operation)
	}
})

function sizeChanger(operation) {
	for (let i = 0; i < buttons.length; i++) {
		if (buttons[i].title === operation) {
			document.getElementById(buttons[i].title).style.width = '70%'
			document.getElementById(buttons[i].title).style.backgroundColor =
				buttons[i].color
		} else {
			document.getElementById(buttons[i].title).style.width = '10%'
			document.getElementById(buttons[i].title).style.backgroundColor =
				'rgb(37, 37, 37)'
		}
	}
}

submitBtn.onclick = function () {
	if (num1.value === '' || num2.value === '') {
		alert('Пожалуйста, заполните оба поля ввода.')
		return
	}
	if (sign === '') {
		alert('Пожалуйста, выберите действие')
	}
	const result = calcNumberWithOperations(num1, num2, sign)
	for (let i = 0; i < buttons.length; i++) {
		document.getElementById(buttons[i].title).style.width = buttons[i].width
		document.getElementById(buttons[i].title).style.backgroundColor =
			buttons[i].color
	}
	printResult(result)
}

function calcNumberWithOperations(inp1, inp2, sign) {
	const num1 = Number(inp1.value)
	const num2 = Number(inp2.value)
	if (sign === '+') {
		return num1 + num2
	} else if (sign === '-') {
		return num1 - num2
	} else if (sign === '*') {
		return num1 * num2
	} else if (sign === '/') {
		if (num2 === 0) {
			alert('На ноль делить нельзя')
		} else {
			return num1 / num2
		}
	}
}

function printResult(result) {
	resultElement.textContent = result
}
