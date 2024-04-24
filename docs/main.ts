'use strict';
import { mainMenu, startClassicButton, startCustomizedButton, restartButtons, returnButtons, game, customizationForm, validationErrMsgs, widthInput, lengthInput, minesInput, endGameDialog, levelInfo } from "./elements";
import Board from "./Board";
import BoardUI from "./BoardUI";

type Outcome = 'win' | 'lose';

document.addEventListener('contextmenu', e => e.preventDefault(), false);

const classicDifficultyProgression = [
    {width: 10, length: 10, mines: 10, level: 'Easy #1'},
    {width: 9, length: 9, mines: 9, level: 'Easy #2'},
    {width: 8, length: 8, mines: 10, level: 'Easy #3'},
    {width: 16, length: 16, mines: 40, level: 'Intermediate #1'},
    {width: 15, length: 15, mines: 40, level: 'Intermediate #2'},
    {width: 14, length: 14, mines: 40, level: 'Intermediate #3'},
    {width: 16, length: 30, mines: 99, level: 'Expert'},
]

let gameActive = false; // responsible for switching between main menu and game
let gameBoard: Board | null = null;
let mode: 'classic' | 'customized' = 'classic';
let classicDifficultyLevel = 0;

let width = 0;
let length = 0;
let mines = 0;

// LOGIC
function validateCustomizedInputs(widthVal: number, lengthVal: number, minesVal: number): string[] {
    // generates error message array and, if valid, stores values
    const errMsgs: string[] = [];
    if (widthVal <= 0 || widthVal > 30) errMsgs.push('Width must be between 1 and 30 cells.');
    if (lengthVal <= 0 || lengthVal > 30) errMsgs.push('Length must be between 1 and 30 cells.');
    if (minesVal <= 0 || minesVal >= widthVal * lengthVal) errMsgs.push('Number of mines must be greater than 0 and less than the total number of cells.');

    if (errMsgs.length === 0) {
        width = widthVal;
        length = lengthVal;
        mines = minesVal;
    }

    return errMsgs;
}

// UI
function clearCustomizedInputErrMsgs() {
    validationErrMsgs.innerHTML = '';
}
// UI
function renderCustomizedInputErrMsgs(errMsgs: string[]) {
    for (const errMsg of errMsgs) {
        const errMsgItem = document.createElement('p');
        errMsgItem.textContent = errMsg;
        validationErrMsgs.appendChild(errMsgItem);
    }
}

export function placeMines() {
    if (gameBoard) BoardUI.placeMines(gameBoard.getMineCoords());
}

export function updateInfo() {
    if (gameBoard) BoardUI.renderInfo(gameBoard.getNumMines(), gameBoard.getFlaggedMines());
}   

export function setOutcome(outcome: Outcome) {
    if (mode === 'classic' && outcome === 'win') classicDifficultyLevel++;

    if (mode === 'classic' && classicDifficultyLevel > classicDifficultyProgression.length) {
        BoardUI.renderEndGameDialog(mode, outcome, true);
    } else {
        BoardUI.renderEndGameDialog(mode, outcome, false);
    }
    
}

startClassicButton.addEventListener('click', () => {
    mode = 'classic';
    const boardDetails = classicDifficultyProgression[classicDifficultyLevel];
    gameBoard = new Board(boardDetails.width, boardDetails.length, boardDetails.mines);
    gameActive = true;
    renderMain();
});

startCustomizedButton.addEventListener('click', () => {
    clearCustomizedInputErrMsgs();
    const errMsgs = validateCustomizedInputs(Number(widthInput.value), Number(lengthInput.value), Number(minesInput.value));

    if (errMsgs.length > 0) {
        renderCustomizedInputErrMsgs(errMsgs);
        return;
    }

    mode = 'customized';
    customizationForm?.reset();
    gameBoard = new Board(width, length, mines);
    gameActive = true;
    renderMain();
});

restartButtons.forEach(button => 
    button.addEventListener('click', () => {
        if (mode === 'classic') {
            const boardDetails = classicDifficultyProgression[classicDifficultyLevel];
            gameBoard = new Board(boardDetails.width, boardDetails.length, boardDetails.mines);
        }
        if (mode === 'customized') gameBoard = new Board(width, length, mines);

        endGameDialog.close();
        renderMain();
    })
);

returnButtons.forEach(button => 
    button.addEventListener('click', () => {
        if (mode === 'classic') classicDifficultyLevel = 0;
        BoardUI.resetEndGameDialog();
        gameActive = false;
        renderMain();
    })
);

function renderMain() {
    BoardUI.clearBoardAndInfo();
    if (!gameActive) {
        mainMenu.classList.remove('hidden');
        game.classList.add('hidden');
    } else {
        mainMenu.classList.add('hidden');
        game.classList.remove('hidden');
        levelInfo.textContent = mode === 'classic' ? `Level: ${classicDifficultyProgression[classicDifficultyLevel].level}` : '';
        if (gameBoard) {
            BoardUI.renderInitialBoard(gameBoard.getLength(), gameBoard.getWidth(), gameBoard.getHandleMouseDownFunction());
            updateInfo();
        }
    }
}

renderMain();