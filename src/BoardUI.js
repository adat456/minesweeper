import { board, flaggedMinesInfo, endGameDialog, dialogMessage, elapsedTime, dialogRestartButton, emoji } from './elements';
export default class BoardUI {
    static renderInitialBoard(length, width, mouseDownHandler) {
        for (let x = 0; x < length; x++) {
            let columnDiv = document.createElement('div');
            columnDiv.classList.add('row');
            for (let y = 0; y < width; y++) {
                // creating element and setting key attributes
                const cell = document.createElement('button');
                cell.setAttribute('data-x', String(x));
                cell.setAttribute('data-y', String(y));
                cell.setAttribute('data-status', 'unchecked'); // unchecked, checked, flag, question
                cell.setAttribute('data-type', 'notmine'); // mine, notmine
                cell.addEventListener('mousedown', (e) => mouseDownHandler(e, x, y));
                columnDiv.appendChild(cell);
            }
            board.appendChild(columnDiv);
        }
    }
    static renderInfo(totalMines, flaggedMines) {
        flaggedMinesInfo.textContent = `${flaggedMines}/${totalMines}`;
    }
    static showAllMines() {
        const mineCells = Array.from(document.querySelectorAll(`[data-type = 'mine']`));
        for (const mineCell of mineCells)
            mineCell.setAttribute('data-status', 'bomb-reveal');
    }
    static clearBoardAndInfo() {
        board.innerHTML = '';
        flaggedMinesInfo.textContent = '';
    }
    static renderEndGameDialog(mode, outcome, time, classicEnd) {
        if (outcome === 'lose')
            emoji.classList.add('dead');
        dialogMessage.textContent =
            outcome === 'lose' ? 'You exploded...' :
                classicEnd === false ? 'You survived!' : 'You made it through all the levels. Congrats!';
        elapsedTime.textContent = `Elapsed time: ${time}`;
        if (classicEnd) {
            dialogRestartButton.classList.add('hidden');
        }
        else {
            dialogRestartButton.textContent =
                mode === 'customized' ? 'Replay' :
                    outcome === 'win' ? 'Next level' : 'Replay level';
        }
        endGameDialog.showModal();
    }
    static resetEndGameDialog() {
        emoji.classList.remove('dead');
        dialogMessage.textContent = '';
        elapsedTime.textContent = '';
        dialogRestartButton.classList.remove('hidden');
        dialogRestartButton.textContent = '';
        endGameDialog.close();
    }
}
