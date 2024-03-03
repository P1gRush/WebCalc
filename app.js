const listElement = document.getElementById('list')
const submitBtn = document.getElementById('submit')
const num1 = document.getElementById('num1')
const num2 = document.getElementById('num2')
let sign = ''
let operation
const lastResults = []
const buttonIds = ['plus', 'minus', 'mult', 'div']
const buttons = buttonIds.map((buttonIds) => {
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
		return
	}
	const result = calcNumberWithOperations(num1, num2, sign)
	for (let i = 0; i < buttons.length; i++) {
		document.getElementById(buttons[i].title).style.width = buttons[i].width
		document.getElementById(buttons[i].title).style.backgroundColor =
			buttons[i].color
	}
	lastResults.unshift(result)
	render()
	sign = ''
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

function render() {
	listElement.innerHTML = ''
	if (lastResults.length === 0) {
		listElement.innerHTML = '<p>Нет элементов</p>'
	}
	for (let i = 0; i < lastResults.length; i++) {
		listElement.insertAdjacentHTML(
			'beforeend',
			getResultsTemplate(lastResults[i], i),
		)
	}
}
function getResultsTemplate(result, index) {
	return `
	<li class="lastResults__item">
		<div class="lastResults__title">${result}</div>
		<div class="buttons" >
			<div class="buttons__copy-Btn">
				<img data-index = "${index}" data-type = "copy" id = "copy" src="svg/copy-file-icon.svg" alt="">
			</div>
			<div class="buttons__delete-Btn" >
				<img data-index = "${index}" data-type = "remove" id = "delete" src="svg/close-square-line-icon.svg" alt="">
			</div>
		</div>
	</li>
	`
}
listElement.onclick = function (event) {
	if (event.target.dataset.index) {
		const index = Number(event.target.dataset.index)
		const type = event.target.dataset.type
		if (type === 'copy') {
			navigator.clipboard
				.writeText(lastResults[index])
				.then(() => {
					console.log(
						'Значение скопировано в буфер обмена:',
						lastResults[index],
					)
					alert('Значение скопировано в буфер обмена!')
				})
				.catch((err) => {
					console.error('Ошибка копирования в буфер обмена:', err)
					alert('Ошибка копирования в буфер обмена!')
				})
		} else if (type === 'remove') {
			lastResults.splice(index, 1)
			render()
		}
	}
}
