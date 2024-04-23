'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = require("./Board");
document.addEventListener('contextmenu', function (e) { return e.preventDefault(); }, false);
var mainMenu = document.getElementById('main-menu');
var game = document.getElementById('game');
var customizationForm = document.querySelector('form');
var validationErrMsgs = document.getElementById('validation-err-msgs');
var width = document.getElementById('width');
var length = document.getElementById('length');
var mines = document.getElementById('mines');
var gameOver = false;
var gameActive = false;
var gameBoard = null;
var mode = 'classic';
var widthInput = 0;
var lengthInput = 0;
var minesInput = 0;
var startClassicButton = document.getElementById('start-classic');
startClassicButton.addEventListener('click', function () {
    mode = 'classic';
    gameBoard = new Board_1.default(8, 10);
    gameActive = true;
    render();
});
var startCustomizedButton = document.getElementById('start-customized');
startCustomizedButton.addEventListener('click', function () {
    validationErrMsgs.innerHTML = '';
    var widthInputTemp = Number(width.value);
    var lengthInputTemp = Number(length.value);
    var minesInputTemp = Number(mines.value);
    var errMsgs = validateCustomizedInputs(widthInputTemp, lengthInputTemp, minesInputTemp);
    if (errMsgs.length === 0) {
        mode = 'customized';
        widthInput = widthInputTemp;
        lengthInput = lengthInputTemp;
        minesInput = minesInputTemp;
        customizationForm === null || customizationForm === void 0 ? void 0 : customizationForm.reset();
        gameBoard = new Board_1.default(widthInput, minesInput);
        gameActive = true;
        render();
    }
    else {
        for (var _i = 0, errMsgs_1 = errMsgs; _i < errMsgs_1.length; _i++) {
            var errMsg = errMsgs_1[_i];
            var errMsgItem = document.createElement('p');
            errMsgItem.textContent = errMsg;
            validationErrMsgs.appendChild(errMsgItem);
        }
    }
});
function validateCustomizedInputs(width, length, mines) {
    var errMsgs = [];
    if (width <= 0 || width > 30)
        errMsgs.push('Width must be between 1 and 30 cells.');
    if (length <= 0 || length > 30)
        errMsgs.push('Length must be between 1 and 30 cells.');
    if (mines <= 0 || mines >= width * length)
        errMsgs.push('Number of mines must be greater than 0 and less than the total number of cells.');
    return errMsgs;
}
var restartButton = document.getElementById('restart');
restartButton.addEventListener('click', function () {
    if (mode === 'classic')
        gameBoard = new Board_1.default(8, 10);
    if (mode === 'customized')
        gameBoard = new Board_1.default(widthInput, minesInput);
    render();
});
var returnButton = document.getElementById('return');
returnButton.addEventListener('click', function () {
    gameActive = false;
    render();
});
function render() {
    gameBoard === null || gameBoard === void 0 ? void 0 : gameBoard.clear();
    if (!gameActive) {
        mainMenu.classList.remove('hidden');
        game.classList.add('hidden');
    }
    else {
        mainMenu.classList.add('hidden');
        game.classList.remove('hidden');
        gameBoard === null || gameBoard === void 0 ? void 0 : gameBoard.render();
    }
}
render();
