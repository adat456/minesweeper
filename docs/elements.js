// main containers
export const mainMenu = document.getElementById('main-menu');
export const game = document.getElementById('game');
export const board = document.getElementById('board');
// all buttons
export const startClassicButton = document.getElementById('start-classic');
export const startCustomizedButton = document.getElementById('start-customized');
export const restartButtons = Array.from(document.getElementsByClassName('restart'));
export const dialogRestartButton = document.querySelector('#end-game .restart');
export const returnButtons = Array.from(document.getElementsByClassName('return'));
export const nextLevelButton = document.getElementById('next-level');
// customization form
export const customizationForm = document.querySelector('form');
export const validationErrMsgs = document.getElementById('validation-err-msgs');
export const widthInput = document.getElementById('width');
export const lengthInput = document.getElementById('length');
export const minesInput = document.getElementById('mines');
// info
export const levelInfo = document.getElementById('level');
export const flaggedMinesInfo = document.getElementById('flagged-mines');
// end game dialog
export const endGameDialog = document.getElementById('end-game');
export const dialogMessage = document.getElementById('end-game-msg');
