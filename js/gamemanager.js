class GameManager {

    constructor (app) {
        this.app = app;
    }

    showVideo (title, media) {
        const previousMedia = document.querySelectorAll("video");
        for (const media of previousMedia) {
            media.pause();
        }

        const container = document.getElementById("ui-video");
        container.innerHTML = "";

        const nameElement = document.createElement("h1");
        nameElement.classList.add("correct-answer");
        nameElement.innerHTML = title;
        container.appendChild(nameElement);

        const videoElement = document.createElement("video");
        videoElement.src = "videos/" + media;
        container.appendChild(videoElement);

        videoElement.play();
    }

    startRound () {
        let level = levels.shift();

        this.app.correctAnswers = level.names;
        this.showVideo(level.names[0], level.video);

        this.app.uiManager.showUI("timer");
        this.app.timer.initTimer();
    }

}