window.onload = function(){
    //1
    function delayedMessage(msg, time){
        setTimeout(()=>console.log(msg), time);
    }

    document.getElementById('showMessageBtn').onclick = function(){
        delayedMessage("Повідомлення через 3 секунди!", 3000);
    };

    //2
    const counterDisplay = document.getElementById('counterDisplay');
    let counter = 0;
    let counterInterval;

    document.getElementById('startCounterBtn').onclick = function(){
        counter = 0;
        counterDisplay.textContent = counter;
        clearInterval(counterInterval);
        counterInterval = setInterval(()=>{
            counter++;
            counterDisplay.textContent = counter;
            if(counter >= 10) clearInterval(counterInterval);
        },1000);
    };


    //3
    const colors = ['var(--color1)','var(--color2)','var(--color3)','var(--color4)','var(--color5)'];
    document.getElementById('randomColorBtn').onclick = function(){
        document.body.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
    };

    //bonus
    const circle = document.querySelector('.progress-ring__circle');
    const timerDisplay = document.getElementById('timerDisplay');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');

    const RADIUS = circle.r.baseVal.value;
    const CIRCUMFERENCE = 2*Math.PI*RADIUS;
    circle.style.strokeDasharray = `${CIRCUMFERENCE} ${CIRCUMFERENCE}`;
    circle.style.strokeDashoffset = CIRCUMFERENCE;

    const TOTAL_TIME = 25*60; 
    let timeLeft = TOTAL_TIME;
    let interval;

    function setProgress(percent){
        const offset = CIRCUMFERENCE - (percent/100)*CIRCUMFERENCE;
        circle.style.strokeDashoffset = offset;

        if(percent>50) circle.style.stroke = '#ffa300';
        else if(percent>20) circle.style.stroke = '#1dd1a1';
        else circle.style.stroke = '#ff6b6b';
    }

    function updateDisplay(){
        const minutes = Math.floor(timeLeft/60).toString().padStart(2,'0');
        const seconds = (timeLeft%60).toString().padStart(2,'0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
        setProgress((timeLeft/TOTAL_TIME)*100);
    }

    startBtn.onclick = function(){
        if(interval) return;
        interval = setInterval(()=>{
            if(timeLeft>0){
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(interval);
                interval = null;
                alert("Час вийшов!");
                timeLeft = TOTAL_TIME;
                updateDisplay();
            }
            
        },1000);
    };

    resetBtn.onclick = function(){
        clearInterval(interval);
        interval = null;
        timeLeft = TOTAL_TIME;
        updateDisplay();
    };

    updateDisplay();
}