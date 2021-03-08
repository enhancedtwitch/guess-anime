class Chat {
    constructor (app) {
        this.app = app;
    }

    login (username) {
        this.username = username;
        this.app.emit("serverConnecting");

        this.client = new tmi.Client({
            options: { debug: false, messagesLogLevel: "info" },
            connection: {
                reconnect: true,
                secure: true
            },
            channels: [ username ]
        })

        this.client.connect().catch((e) => {
            this.app.emit("serverError", e);
        });

        this.client.on("connected", () => {
            this.app.emit("serverConnected");
        })

        this.client.on("join", () => {
            this.app.emit("chatJoined", username);
        })

        this.client.on('message', (channel, tags, message, self) => {
            this.app.playerHandler.handleMessage(tags.username, message);
        });
    }

}