
const timer = document.querySelector('.timer h2')
const playButton = document.querySelector('.play')
const pauseButton = document.querySelector('.pause')
const stopButton = document.querySelector('.stop')
const retryButton = document.querySelector('.retry')
const buttons = document.querySelectorAll('.buttons')
const upButton = document.querySelectorAll('.up')
const downButton = document.querySelectorAll('.down')
const title = document.querySelector('.title')

let minutes = 25
let seconds = 0

let timerIsOn = true
let breakIsOn = false


function hideTitle() {
	title.style.transform = "scale(0.05)"
	title.style.opacity = 0
}

function addPlayTitle() {
	hideTitle()
	setTimeout(()=> {
		title.textContent = "WORK";
		title.style.transform = "scale(1)"
		title.style.opacity = 1
	}, 1000)
	return null
}

function addPauseTitle() {
	hideTitle()
	setTimeout(()=> {
		title.textContent = "PAUSE";
		title.style.transform = "scale(1)"
		title.style.opacity = 1
	}, 1000)
	return null
}

function addStopTitle() {
	hideTitle()
	setTimeout(()=> {
		title.textContent = "POMODORO";
		title.style.transform = "scale(1)"
		title.style.opacity = 1
	}, 1000)
	return null
}

function addBreakTitle() {
	hideTitle()
	setTimeout(()=> {
		title.textContent = "BREAK";
		title.style.transform = "scale(1)"
		title.style.opacity = 1
	}, 1000)
	
}

// Controlling timer

let zeroMinString = " "
let zeroSecString = " "
let checkParentClass;
upButton.forEach((up) => up.addEventListener('click', addSecMin ))
downButton.forEach((up) => up.addEventListener('click', subSecMin ))

function addSecMin(e) {
	checkParentClass = e.target.parentElement.className
	if (checkParentClass == 'arrows minutes') {
		minutes++
	} else {
		seconds++
	}
	fixZeroPlus()
}

function subSecMin(e) {
	checkParentClass = e.target.parentElement.className
	if (checkParentClass == 'arrows minutes') {
		minutes--
	} else {
		console.log(e)
		seconds--
	}
	fixZeroMinus()
	}

function fixZeroPlus() {
		if (minutes <= 9) {
		zeroMinString = "0"
	} else {
		zeroMinString = ""
	}
	if (seconds <= 9){
		zeroSecString = "0"
	} else {
		zeroSecString = ""
	}
	if (seconds > 59) {
		zeroSecString = "0"
		seconds = 0
		minutes++
	}
		timer.textContent = `${zeroMinString}${minutes}:${zeroSecString}${seconds}`
}


function fixZeroMinus() {
	if (minutes <= 9) {
		zeroMinString = "0"
	} else {
		zeroMinString = ""
	}
	if (seconds <= 9){
		zeroSecString = "0"
	} else {
		zeroSecString = ""
	}
	if (minutes < 0) {
		minutes = 0
	}
	if (seconds < 0 && minutes != 0) {
		zeroSecString = ""
		seconds = 59
		minutes--
	}
	if (seconds < 0){
		seconds = 0
	}
	timer.textContent = `${zeroMinString}${minutes}:${zeroSecString}${seconds}`
}

// Counters, play, pause, stop, refresh



function counter() {
	fixZeroMinus()
	fixZeroPlus()
	colorGreen()
	seconds--
	if((minutes == "00")&&(seconds == "00")&&(breakIsOn == false)){
		startBreak()
	}

}



function startBreak() {
	clearInterval(interval)
	minutes = 10
	seconds = 0
	interval = setInterval(counter, 1000)
	addBreakTitle()
	breakIsOn = !breakIsOn
	timerIsOn = !timerIsOn
	if((minutes == 0)&&(seconds == 0 )){
		retryTimer()
	}
}
let interval;

function changePlayPauseButton(e) {
	buttons.forEach((button)=>{
		button.children[0].classList.remove('far')
		button.children[0].classList.add('fas')
	})
	if (e != retryButton){
	 e.children[0].classList.add('far') 
	} else {
		playButton.children[0].classList.add('far')
	}
}


function playTimer(){
	clearInterval(interval)
 	interval = setInterval(counter, 1000)
	 changePlayPauseButton(this)
	 addPlayTitle()
}


function pauseTimer() {
	clearInterval(interval)
	colorYellow()
	changePlayPauseButton(this)
	addPauseTitle()
}

function stopTimer() {
	minutes = 25
	seconds = 0
	fixZeroPlus()
	clearInterval(interval)
	changePlayPauseButton(this)
	colorDefault();
	addStopTitle();
}
let functionForbounding;

function retryTimer() {
	colorRed()
	clearInterval(interval)
	minutes = 25;
	seconds = 0
	interval = setInterval(counter, 1000)
	changePlayPauseButton(this)
	addPlayTitle()
	
}




playButton.addEventListener('click', playTimer)

pauseButton.addEventListener('click', pauseTimer)

stopButton.addEventListener('click', stopTimer)

retryButton.addEventListener('click', retryTimer)


// colors 

function colorGreen() {
	timer.style.color = "green"
}

function colorYellow() {
	timer.style.color = "yellow"
}

function colorDefault() {
	timer.style.color = "var(--light)"
}

function colorRed() {
	timer.style.color = "red"
}