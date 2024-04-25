import { hourDisplay, minuteDisplay, secondDisplay } from './elements';

export default class Timer {
    #minute = 0;
    #second = 0;
    #intervalId;

    constructor() {}

    #timer() {
        if ((this.#second += 1) == 60) {
            this.#second = 0;
            this.#minute++;
        }
        this.#updateDisplays();
    }

    #formatTime(input: number) {
        return input >= 10 ? String(input) : `0${input}`
    }

    #updateDisplays() {
        minuteDisplay.textContent = this.#formatTime(this.#minute);
        secondDisplay.textContent = this.#formatTime(this.#second);
    }

    start() {
        this.reset();
        this.#intervalId = setInterval(() => this.#timer(), 1000);
    }

    pause() {
        clearInterval(this.#intervalId);
    }

    reset() {
        clearInterval(this.#intervalId);
        this.#minute = 0;
        this.#second = 0;
        this.#updateDisplays();
    }

    getTimeString() {
        return `${this.#minute > 0 ? `${Number(this.#minute)} minute${this.#minute > 1 ? 's' : ''}, ` : ''}${Number(this.#second)} second${this.#second != 1 ? 's' : ''}`;
    }
}