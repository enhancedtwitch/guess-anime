class App {
    constructor() {
        this.events = new Map();

        this.chat = new Chat(this);
        this.gameManager = new GameManager(this);
        this.playerHandler = new PlayerHandler(this);
        this.timer = new Timer(this);
        this.uiHandler = new UIHandler(this);
        this.uiManager = new UIManager(this);

        this.correctAnswers = [];
    }

    emit (eventName, ...args) {
        const listeners = this.events.get(eventName) || [];
        for (const listener of listeners) {
            listener(...args);
        }
    }

    on (eventName, listener) {
        const listeners = this.events.get(eventName) || [];
        listeners.push(listener);
        this.events.set(eventName, listeners);
    }

    start () {
        this.gameManager.startRound();
    }
}