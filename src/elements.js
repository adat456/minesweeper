// main containers
export const mainMenu = document.getElementById('main-menu');
export const instructions = document.getElementById('instructions');
export const game = document.getElementById('game');
export const board = document.getElementById('board');
// all buttons
export const startClassicButton = document.getElementById('start-classic');
export const startCustomizedButton = document.getElementById('start-customized');
export const exitInstructionsButton = document.getElementById('exit-instructions');
export const restartButtons = Array.from(document.getElementsByClassName('restart'));
export const dialogRestartButton = document.querySelector('#end-game .restart');
export const returnButtons = Array.from(document.getElementsByClassName('return'));
// customization form
export const customizationForm = document.querySelector('form');
export const validationErrMsgs = document.getElementById('validation-err-msgs');
export const widthInput = document.getElementById('width');
export const lengthInput = document.getElementById('length');
export const minesInput = document.getElementById('mines');
// timer
export const hourDisplay = document.getElementById('hour');
export const minuteDisplay = document.getElementById('minute');
export const secondDisplay = document.getElementById('second');
// info
export const levelInfo = document.getElementById('level');
export const flaggedMinesInfo = document.getElementById('flagged-mines');
export const emoji = document.getElementById('emoji');
// end game dialog
export const endGameDialog = document.getElementById('end-game');
export const dialogMessage = document.getElementById('end-game-msg');
export const elapsedTime = document.getElementById('elapsed-time');
