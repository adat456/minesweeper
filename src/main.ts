'use strict';
import Board from "./Board";

document.addEventListener('contextmenu', e => e.preventDefault(), false);

const mainMenu = document.getElementById('main-menu') as HTMLElement;
const game = document.getElementById('game') as HTMLElement;
const customizationForm = document.querySelector('form');
const validationErrMsgs = document.getElementById('validation-err-msgs') as HTMLDivElement;
const width = document.getElementById('width') as HTMLInputElement;
const length = document.getElementById('length') as HTMLInputElement;
const mines = document.getElementById('mines') as HTMLInputElement;

let gameOver = false;
let gameActive = false;
let gameBoard: Board | null = null;
let mode: 'classic' | 'customized' = 'classic';
let widthInput = 0;
let lengthInput = 0;
let minesInput = 0;

const startClassicButton: HTMLElement = document.getElementById('start-classic')!;
startClassicButton.addEventListener('click', () => {
    mode = 'classic';
    gameBoard = new Board(8, 10);
    gameActive = true;
    render();
});

const startCustomizedButton: HTMLElement = document.getElementById('start-customized')!;
startCustomizedButton.addEventListener('click', () => {
    validationErrMsgs.innerHTML = '';

    const widthInputTemp = Number(width.value);
    const lengthInputTemp = Number(length.value);
    const minesInputTemp = Number(mines.value);

    const errMsgs = validateCustomizedInputs(widthInputTemp, lengthInputTemp, minesInputTemp);
    if (errMsgs.length === 0) {
        mode = 'customized';
        widthInput = widthInputTemp;
        lengthInput = lengthInputTemp;
        minesInput = minesInputTemp;
        customizationForm?.reset();
        gameBoard = new Board(widthInput, minesInput);
        gameActive = true;
        render();
    } else {
        for (const errMsg of errMsgs) {
            const errMsgItem = document.createElement('p');
            errMsgItem.textContent = errMsg;
            validationErrMsgs.appendChild(errMsgItem);
        }
    }
});

function validateCustomizedInputs(width: number, length: number, mines: number): string[] {
    const errMsgs: string[] = [];
    if (width <= 0 || width > 30) errMsgs.push('Width must be between 1 and 30 cells.');
    if (length <= 0 || length > 30) errMsgs.push('Length must be between 1 and 30 cells.');
    if (mines <= 0 || mines >= width * length) errMsgs.push('Number of mines must be greater than 0 and less than the total number of cells.');
    return errMsgs;
}

const restartButton: HTMLElement = document.getElementById('restart')!;
restartButton.addEventListener('click', () => {
    if (mode === 'classic') gameBoard = new Board(8, 10);
    if (mode === 'customized') gameBoard = new Board(widthInput, minesInput);
    render();
});

const returnButton: HTMLElement = document.getElementById('return')!;
returnButton.addEventListener('click', () => {
    gameActive = false;
    render();
});

function render() {
    gameBoard?.clear();
    if (!gameActive) {
        mainMenu.classList.remove('hidden');
        game.classList.add('hidden');
    } else {
        mainMenu.classList.add('hidden');
        game.classList.remove('hidden');
        gameBoard?.render();
    }
}

render();
