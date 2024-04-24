import { board, info, flaggedMinesInfo, endGameDialog, dialogMessage, dialogRestartButton } from './elements';

type CellType = 'notmine'[] | 'mine'[];
type CellMouseDownHandler = (e: MouseEvent, x: number, y: number) => void;
type Mode = 'classic' | 'customized';
type Outcome = 'win' | 'lose';

export default class BoardUI {
    static renderBoard(length: number, width: number, cellTypes: CellType[], mouseDownHandler: CellMouseDownHandler) {
        for (let x = 0; x < length; x++) {
            let columnDiv: HTMLDivElement = document.createElement('div');
            columnDiv.classList.add('row');
            for (let y = 0; y < width; y++) {
                // creating element and setting key attributes
                const cell: HTMLButtonElement = document.createElement('button');
                cell.setAttribute('data-x', String(x));
                cell.setAttribute('data-y', String(y));
                cell.setAttribute('data-status', 'unchecked'); // unchecked, checked, flag, question
                cell.setAttribute('data-type', cellTypes[x][y]); // mine, notmine
                cell.addEventListener('mousedown', (e) => mouseDownHandler(e, x, y));

                // delete
                if (cellTypes[x][y] === 'mine') cell.innerHTML = 'B';

                columnDiv.appendChild(cell);
            }
            board.appendChild(columnDiv);
        }
    }

    static renderInfo(totalMines: number, flaggedMines: number) {
        console.log('where the render at');
        flaggedMinesInfo.textContent = `Flagged mines: ${flaggedMines}/${totalMines}`;
    }

    static clearBoardAndInfo() {
        board.innerHTML = '';
        // info.innerHTML = '';
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