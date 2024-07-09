let startTime;
let updatedTime;
let difference;
let running = false;
let laps = [];

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        running = true;
        updateDisplay();
    }
}

function pauseStopwatch() {
    if (running) {
        running = false;
        difference = new Date().getTime() - startTime;
    }
}

function resetStopwatch() {
    running = false;
    startTime = 0;
    difference = 0;
    document.getElementById('display').innerText = '00:00:00';
    laps = [];
    document.getElementById('laps').innerHTML = '';
}

function lapStopwatch() {
    if (running) {
        const lapTime = new Date().getTime() - startTime;
        laps.push(lapTime);
        displayLaps();
    }
}

function updateDisplay() {
    if (running) {
        updatedTime = new Date().getTime();
        // Speed factor: multiply the real difference by 10
        difference = (updatedTime - startTime) * 20;

        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('display').innerText =
            (hours < 10 ? "0" + hours : hours) + ":" +
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds < 10 ? "0" + seconds : seconds);

        setTimeout(updateDisplay, 10);
    }
}

function displayLaps() {
    const lapsContainer = document.getElementById('laps');
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('div');
        const hours = Math.floor((lap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((lap % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((lap % (1000 * 60)) / 1000);
        lapElement.innerText = `Lap ${index + 1}: ${(hours < 10 ? "0" + hours : hours)}:${(minutes < 10 ? "0" + minutes : minutes)}:${(seconds < 10 ? "0" + seconds : seconds)}`;
        lapsContainer.appendChild(lapElement);
    });
}
