const audioContext = new AudioContext();

const osc = Array(11).fill();
const gainNode = Array(11).fill();
const isStop = Array(11).fill();

osc.forEach(function(elem, index) {
    gainNode[index] = audioContext.createGain();
    gainNode[index].gain.value = 0.04;
    isStop[index] = true;
});

const app_wrapper = document.getElementById("app");
const playControl = app_wrapper.getElementsByTagName("button");
const volumeControl = app_wrapper.getElementsByTagName("input");

[...volumeControl].forEach(function(elem, index) {
    elem.addEventListener('input', () => {
        gainNode[index].gain.value = volumeControl[index].value * 0.01;
    }, false);
});

[...playControl].forEach(function(elem, index) {
    elem.addEventListener('click', () => {
        play(index);
    })
})

function play(index) {
    if (isStop[index]) {
        isStop.forEach(function(elem, _index) {
            if (!elem) {
                osc[_index].stop();
                playControl[_index].classList.toggle('play');
                isStop[_index] = !isStop[_index];
            }
        })
        osc[index] = new OscillatorNode(audioContext);
        osc[index].type = "sine";
        osc[index].frequency.value = 1000 / (2 ** (6 - index));
        console.log(osc[index].frequency.value);
        osc[index].connect(gainNode[index]).connect(audioContext.destination);
        osc[index].start();
    } else {
        osc[index].stop();
    }
    playControl[index].classList.toggle('play');
    isStop[index] = !isStop[index];
}