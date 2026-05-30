import { EventEmitter } from "events";

export default class Theme extends EventEmitter {
    constructor() {
        super();

        this.theme = document.body.classList.contains("dark-theme")
            ? "dark"
            : "light";

        this.toggleButton = document.querySelector(".toggle-button");
        this.toggleCircle = document.querySelector(".toggle-circle");

        this.setEventListeners();
    }

    setEventListeners() {
        if (!this.toggleButton || !this.toggleCircle) return;

        this.onToggle = () => {
            this.toggleCircle.classList.toggle("slide");
            this.theme = this.theme === "light" ? "dark" : "light";
            document.body.classList.toggle("dark-theme", this.theme === "dark");
            document.body.classList.toggle("light-theme", this.theme === "light");

            window.dispatchEvent(
                new CustomEvent("portfolio-theme-change", {
                    detail: { theme: this.theme },
                })
            );
            this.emit("switch", this.theme);
        };

        this.toggleButton.addEventListener("click", this.onToggle);
    }

    destroy() {
        if (this.toggleButton && this.onToggle) {
            this.toggleButton.removeEventListener("click", this.onToggle);
        }
    }
}
