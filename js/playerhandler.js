class PlayerHandler {

    constructor (app) {
        this.app = app;
        this.joined = [];
        this.players = [];

        this.winners = [];
    }

    addPlayer (username) {
        if (!this.joined.includes(username)) {
            this.joined.push(username);

            this.players.push({
                wins: 0,
                losses: 0,
                xp: 0,
                username
            });

            this.app.emit("playerJoined", username);
            console.log("[+] " + username + " has joined.");
        }
    }

    addWinToPlayer (username) {
        console.log("[PlayerHandler] Added win to " + username + " and " + (this.app.timer.currentTime * 10) + "XP")
        for (let player of this.players) {
            if (player.username == username) {
                player.wins += 1;
                player.xp += this.app.timer.currentTime * 10;
            }
        }
    }

    addLossToNoWinners () {
        console.log("[PlayerHandler] Added loss to no winners.")
        for (let player of this.players) {
            if (!this.winners.includes(player.username)) {
                player.losses += 1;
            }
        }
    }

    handleMessage (username, message) {
        if (!this.joined.includes(username)) {
            if (message.toLowerCase().startsWith("!join")) {
                this.addPlayer(username);
            }

            return;
        }

        if (!this.winners.includes(username) && this.app.timer.currentTime >= 1) {
            for (let answer of this.app.correctAnswers) {
                if (message.toLowerCase().includes(answer.toLowerCase())) {
                    this.addWinToPlayer(username);
                    return this.winners.push(username);
                }
            }
        }

        console.log("[Chat] " + username + ": " + message);
    }

    buildLeaderboard () {
        console.log("[PlayerHandler] Showing leaderboard")
        const dom = document.getElementById("leaderboard");
        const board = this.players.sort((a, b) => (a.points < b.points) ? 1 : -1);

        dom.innerHTML = "";

        for (let player of board) {
            dom.innerHTML += `
            <div class="leader-item">
                <div class="inline">
                    <div class="block">
                        <h3 class="leader-position">#1</h3>
                    </div>
                </div>

                <div class="inline">
                    <div class="block">
                        <span class="leader-username">${player.username}</span>
                    </div>

                    <div class="block">
                        <div class="inline">PTS: <span class="leader-pts">${player.xp}</span></div>
                        <div class="inline">WINS: <span class="leader-wins">${player.wins}</span></div>
                        <div class="inline">LOSS: <span class="leader-loss">${player.losses}</span></div>
                    </div>
                </div>
            </div>
            `
        }
    }

    resetResults () {
        console.log("[PlayerHandler] Resetting results.")
        this.addLossToNoWinners();
        this.winners = [];
    }
}