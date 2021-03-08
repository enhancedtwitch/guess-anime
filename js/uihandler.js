class UIHandler {
    constructor(app) {
        document.getElementById("login-btn").addEventListener("click", () => {
            let username = document.getElementById("tw-username-input").value;
            app.chat.login(username);
        })

        app.on("serverConnecting", () => {
            document.getElementById("login-status").innerText = "Connecting to server..."
        });

        app.on("serverConnected", () => {
            document.getElementById("login-status").innerText = "Logging in to Twitch Account..."
        });

        app.on("serverError", (e) => {
            document.getElementById("login-status").innerText = "Server error: " + e
        });

        app.on("playerJoined", (username) => {
            document.getElementById("last-action-join").innerHTML = `<a href="#">${username}</a> has joined the game.`;
            document.getElementById("btn-start").innerHTML = `Start the game with ${app.playerHandler.joined.length} players`;
        })
    }
}