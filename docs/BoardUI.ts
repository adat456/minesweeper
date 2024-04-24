import { board, flaggedMinesInfo, endGameDialog, dialogMessage, dialogRestartButton } from './elements';

type CellMouseDownHandler = (e: MouseEvent, x: number, y: number) => void;
type Mode = 'classic' | 'customized';
type Outcome = 'win' | 'lose';

export default class BoardUI {
    static renderInitialBoard(length: number, width: number, mouseDownHandler: CellMouseDownHandler) {
        for (let x = 0; x < length; x++) {
            let columnDiv: HTMLDivElement = document.createElement('div');
            columnDiv.classList.add('row');
            for (let y = 0; y < width; y++) {
                // creating element and setting key attributes
                const cell: HTMLButtonElement = document.createElement('button');
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

    static placeMines(mineCoords: number[][]) {
        for (const coordPair of mineCoords) {
            const cell = document.querySelector(`[data-x = '${coordPair[0]}'][data-y = '${coordPair[1]}']`) as HTMLButtonElement;
            cell.setAttribute('data-type', 'mine');
            cell.innerHTML = 'B'; // delete
        }
    }

    static renderInfo(totalMines: number, flaggedMines: number) {
        flaggedMinesInfo.textContent = `Flagged mines: ${flaggedMines}/${totalMines}`;
    }

    static clearBoardAndInfo() {
        board.innerHTML = '';
        flaggedMinesInfo.textContent = '';
    }

    static renderEndGameDialog(mode: Mode, outcome: Outcome, classicEnd: boolean) {
        dialogMessage.textContent = 
            outcome === 'lose' ? 'You exploded...' :
                classicEnd === false ? 'You survived!' : 'You made it through all the levels. Congrats!';
        if (classicEnd) {
            dialogRestartButton.classList.add('hidden');
        } else {
            dialogRestartButton.textContent = 
                mode === 'customized' ? 'Replay' :
                    outcome === 'win' ? 'Next level' : 'Replay level';
        }
        endGameDialog.showModal();
    }

    static resetEndGameDialog() {
        dialogMessage.textContent = '';
        dialogRestartButton.classList.remove('hidden');
        dialogRestartButton.textContent = '';
        endGameDialog.close();
    }
}