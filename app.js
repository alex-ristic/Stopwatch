// Variables - Buttons

const startStopBtn = document.querySelector ("#startStopBtn");
const startStopBtnI = document.querySelector ("#startStopBtn i");
const resetBtn = document.querySelector ("#resetBtn");

// Variables - Time / Clock

let time = document.querySelector (".time p");

// Variables - seconds that are counted
let seconds = 0;
let minutes = 0;
let hours = 0;

// Variables - (adds 0 at the start 01/02/03... and not just 1/2/3/4)
let showingSeconds
let showingMinutes
let showingHours

// Variables - Button status and intervalId
let btnStatus = "stopped"
let intervalId

//Variables - To start the interval at the next second (when we have paused it), not right away
let currentMs;
let delay;


//Countdown function
function stopWatch () {
    // add sec
    seconds++;
    // add min
    if (seconds/60 === 1){
        minutes++
        seconds = 0
    }
    // add hour
    if (minutes/60 === 1){
        hours++
        minutes = 0
    }

    //to show 01/02/03... not just 1/2/3/4
    if (seconds < 10){
        showingSeconds = `0${seconds}`
    } else {
        showingSeconds = seconds
    }

    if (minutes < 10){
        showingMinutes = `0${minutes}`
    } else {
        showingMinutes = minutes
    }

    if (hours < 10){
        showingHours = `0${hours}`
    } else {
        showingHours = hours
    }

    time.innerText = `${showingHours}:${showingMinutes}:${showingSeconds}`
}

// Event listener to start/stop the function when we click the start/pause button
startStopBtn.addEventListener ("click", ()=>{
    // We can just have intervalId = window.setInterval (stopWatch, 1000) ; but all this code is so that the stopwatch flows smoothly. So that it starts right away when the clock is 00:00:00. And that it remembers how much we have till the next second (when we click the stop button)

    if (btnStatus === "stopped"){
        setTimeout ( () => {
            stopWatch()
            intervalId = window.setInterval (stopWatch, 1000)
        }, (1000-(currentMs % 1000)))

        startStopBtnI.classList.remove ("fa-play")
        startStopBtnI.classList.add ("fa-pause")

        btnStatus = "counting"

    } else {
        window.clearInterval (intervalId)

        startStopBtnI.classList.remove ("fa-pause")
        startStopBtnI.classList.add ("fa-play")

        btnStatus = "stopped"

        currentMs = Date.now();
    }
})

resetBtn.addEventListener ("click", ()=>{
    window.clearInterval (intervalId)

    startStopBtnI.classList.remove ("fa-pause")
    startStopBtnI.classList.add ("fa-play")

    btnStatus = "stopped"

    time.innerText = `00:00:00`
    seconds = 0;
    minutes = 0;
    hours = 0;

    currentMs = 999;
    // I could've said reset this to 0. and then above when i click the startstopbtn if time.innerText = `00:00:00` then just run without setTimeout else do the setTimeout but this is simpler and it basically does the same thing


})

