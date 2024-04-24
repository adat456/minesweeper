import { hourDisplay, minuteDisplay, secondDisplay } from './elements';

export default class Timer {
    #hour = 0;
    #minute = 0;
    #second = 0;
    #intervalId;

    constructor() {}

    #timer() {
        if ((this.#second += 1) == 60) {
            this.#second = 0;
            this.#minute++;
        } 
        if (this.#minute == 60) {
            this.#minute = 0;
            this.#hour++;
        }
        this.#updateDisplays();
    }

    #formatTime(input: number) {
        return input >= 10 ? String(input) : `0${input}`
    }

    #updateDisplays() {
        hourDisplay.textContent = this.#formatTime(this.#hour);
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
        this.#hour = 0;
        this.#minute = 0;
        this.#second = 0;
        this.#updateDisplays();
    }

    getTimeString() {
        return `${this.#hour > 0 ? `${Number(this.#hour)} hour${this.#hour > 1 ? 's' : ''}, ` : ''}${this.#minute > 0 ? `${Number(this.#minute)} minute${this.#minute > 1 ? 's' : ''}, ` : ''}${this.#second > 0 ? `${Number(this.#second)} second${this.#second > 1 ? 's' : ''}` : ''}`;
    }
}