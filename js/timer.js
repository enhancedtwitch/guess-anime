class Timer {
    constructor (app) {
        this.app = app;

        this.circle = document.getElementById("timer-circle");
        this.radius = this.circle.r.baseVal.value;
        this.circumference = this.radius * 2 * Math.PI;

        this.text = document.getElementById("timer-text");

        this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
        this.circle.style.strokeDashoffset = `${this.circumference}`;
    }
    
    initTimer () {
        console.log("[Timer] Time initied")
        this.currentProgress = 100;
        this.currentTime = 20;

        this.circleInterval = setInterval(() => {
            if (this.currentProgress != 0) {
                this.setTimerProgress(this.currentProgress - 1);
            } else {
                clearInterval(this.circleInterval);
            }
        }, 200)

        this.textInterval = setInterval(() => {
            if (this.currentTime != 0) {
                this.currentTime--;
                this.text.innerHTML = this.currentTime;
            } else {
                clearInterval(this.textInterval);
                console.log("[Timer] Timeout");
                this.app.emit("timeout");
            }
        }, 1000)
    }

    setTimerProgress (percent) {
        this.currentProgress = percent;
        const offset = this.circumference - percent / 100 * this.circumference;
        this.circle.style.strokeDashoffset = offset;
    }
}