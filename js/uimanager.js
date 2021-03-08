class UIManager {

    constructor (app) {
        this.app = app;
        this.currentUI = null;
    }

    showUI (name) {
        console.log("[UIManager] Showing UI " + name);
        this.app.emit("showui", name);

        if (this.currentUI) {
            this.currentUI.classList.add("hidden");
        }

        this.currentUI = document.getElementById("ui-" + name);
        this.currentUI.classList.remove("hidden");
    }

}