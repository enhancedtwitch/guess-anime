/**
 * This is the Main controller script
 */

const app = new App();

let joined = false;

app.uiManager.showUI("login");

app.on("chatJoined", (username) => {
    document.getElementById("tw-username").innerHTML = username;
    document.getElementById("tw-username").href = "https://twitch.tv/" + username;

    if (!joined) {
        joined = true;
        app.uiManager.showUI("join");
    }
});

app.on("timeout", () => {
    app.uiManager.showUI("video");
    setTimeout(() => {
        app.playerHandler.resetResults();
        app.playerHandler.buildLeaderboard();
        let leader = document.getElementById("leaderboard");
        leader.style.display = "block";

        setTimeout(() => {
            leader.style.display = "none";
            app.gameManager.startRound();
        }, 6 * 1000);
    }, 6 * 1000);
})

app.on("error", (e) => {
    alert(e);
})