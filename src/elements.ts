// main containers
export const mainMenu = document.getElementById('main-menu') as HTMLElement;
export const instructions = document.getElementById('instructions') as HTMLElement;
export const game = document.getElementById('game') as HTMLElement;
export const board = document.getElementById('board') as HTMLElement;

// all buttons
export const startClassicButton = document.getElementById('start-classic') as HTMLButtonElement;
export const startCustomizedButton = document.getElementById('start-customized') as HTMLButtonElement;
export const exitInstructionsButton = document.getElementById('exit-instructions') as HTMLButtonElement;
export const restartButtons: Element[] = Array.from(document.getElementsByClassName('restart'));
export const dialogRestartButton = document.querySelector('#end-game .restart') as HTMLButtonElement;
export const returnButtons: Element[] = Array.from(document.getElementsByClassName('return'));

// customization form
export const customizationForm = document.querySelector('form');
export const validationErrMsgs = document.getElementById('validation-err-msgs') as HTMLDivElement;
export const widthInput = document.getElementById('width') as HTMLInputElement;
export const lengthInput = document.getElementById('length') as HTMLInputElement;
export const minesInput = document.getElementById('mines') as HTMLInputElement;

// timer
export const hourDisplay = document.getElementById('hour') as HTMLSpanElement;
export const minuteDisplay = document.getElementById('minute') as HTMLSpanElement;
export const secondDisplay = document.getElementById('second') as HTMLSpanElement;

// info
export const levelInfo = document.getElementById('level') as HTMLParagraphElement;
export const flaggedMinesInfo = document.getElementById('flagged-mines') as HTMLParagraphElement;
export const emoji = document.getElementById('emoji') as HTMLDivElement;

// end game dialog
export const endGameDialog = document.getElementById('end-game') as HTMLDialogElement;
export const dialogMessage = document.getElementById('end-game-msg') as HTMLParagraphElement
export const elapsedTime = document.getElementById('elapsed-time') as HTMLParagraphElement;
