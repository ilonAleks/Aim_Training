const startButton = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const circle = document.querySelectorAll('.circle')

const colors = ['#00ffff', '#b0e0e6', '#afeeee', '#7fffd4', '#40e0d0', '#48d1cc', '#00ced1', '#add8e6', '#87ceeb', '#87cefa', '#00bfff', '#b0c4de', '#4682b4', '#5f9ea0']

let time = 0
let score = 0

startButton.addEventListener('click', (event) => {
	event.preventDefault()
	screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'))
		screens[1].classList.add('up')
		startGame()
	}
})

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++
		event.target.remove()
		createRandomCircle()
	}
})


function startGame() {
	setInterval(decreaseTime, 1000)
	createRandomCircle()
	circle.addEventListener('', setColor)
	setTime(time)
}

function decreaseTime() {
	if (time === 0) {
		finishGame()
	} else {
		let current = --time
		if (current < 10) {
			current = `0${current}`
		}
		setTime(current)
	}
}

function setTime(value) {
	timeEl.innerHTML = `00:${value}`
}

function finishGame() {
	timeEl.parentNode.classList.add('hide')
	board.innerHTML = `<h1>Result: <span class='primary'>${score}</span></h1>`
}

function createRandomCircle() {
	const color = getRandomColor()
	const circle = document.createElement('div')
	const size = getRandomNumber(30, 80)
	const { width, height } = board.getBoundingClientRect()
	const x = getRandomNumber(0, width - size)
	const y = getRandomNumber(0, height - size)

	circle.classList.add('circle')
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`

	circle.style.top = `${y}px`
	circle.style.left = `${x}px`

	circle.style.background = color

	board.append(circle)
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
	return colors[Math.floor(Math.random() * colors.length)]
}

function winTheGame() {
	function kill() {
		const circle = document.querySelector('.circle')
		if (circle) {
			circle.click()
		}
	}
	setInterval(kill, 10)
}
