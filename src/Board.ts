'use strict';

type BoardRowStatus = 'notbomb'[] | 'bomb'[];

class Board {
    #sideLength = 0;
    #numBombs = 0;

    #boardStatus: BoardRowStatus[] = [];
    #bombCoordinates: number[][] = [];

    #flaggedBombs: number = 0;
    #errorMessage = '';

    constructor(sideLength: number, numBombs: number) {
        this.#sideLength = sideLength;
        this.#numBombs = numBombs;

        this.#bombCoordinates = this.#determineBombCoordinates();
        this.#initializeBoardStatus();
    }

    #getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    // returns an array with multiple subarrays, each subarray being the (x, y) coordinate of a bomb
    #determineBombCoordinates(): number[][] {
        let bombCoordinates: number[][] = [];
        for (let i = 0; i < this.#numBombs; i++) {
            let x = -1;
            let y = -1;
            while (bombCoordinates.some(coordinatePair => coordinatePair[0] == x && coordinatePair[1] == y) || (x == -1 && y == -1)) {
                x = this.#getRandomInt(this.#sideLength);
                y = this.#getRandomInt(this.#sideLength);
            };
            bombCoordinates[i] = [x, y];
        }
        return bombCoordinates;
    }

    // creates an array of arrays, where each array is a row
    // at each (i, j) is a word that describes the cell's status
    #initializeBoardStatus(): void {
        for (let i = 0; i < this.#sideLength; i++) {
            let row: BoardRowStatus = [];
            for (let j = 0; j < this.#sideLength; j++) {
                if (this.#bombCoordinates.some(coordinatePair => coordinatePair[0] == i && coordinatePair[1] == j)) {
                    row[j] = 'bomb';
                } else {
                    row[j] = 'notbomb';
                }
            }
            this.#boardStatus[i] = row;
        }
    }

    // returns cells surrounding the current coods, as long as each cell is within bounds and has not yet been checked
    #findAdjacentCells(x: number, y: number): HTMLButtonElement[] {
        let adjacentCells: HTMLButtonElement[] = [];
        for (let i = (x - 1); i <= (x + 1); i++) {
            // x outside of board
            if (i < 0 || i > this.#sideLength - 1) continue;
            for (let j = (y - 1); j <= (y + 1); j++) {
                // y outside of board
                if (j < 0 || j > this.#sideLength - 1) continue;
                // current i and j match current cell's coords
                if (i == x && j == y) continue;

                const cell: HTMLButtonElement | null = document.querySelector(`[data-x = '${i}'][data-y = '${j}']`);

                // cell has already been checked
                if (cell?.getAttribute('data-status') === 'unchecked') adjacentCells.push(cell);
            }
        }
        return adjacentCells;
    }

    #checkAdjacentCells(x: number, y: number): void {
        const currentCell: HTMLButtonElement = document.querySelector(`[data-x = '${x}'][data-y = '${y}']`)!;
        currentCell.setAttribute('data-status', 'checked');

        const adjacentCells = this.#findAdjacentCells(x, y);

        // calculate number of adjacent bombs
        let numAdjacentBombs = 0;
        for (const cell of adjacentCells) {
            const cellType = cell.getAttribute('data-type');
            if (cellType === 'bomb') numAdjacentBombs++;
        }
        
        // base case
        if (numAdjacentBombs > 0) {
            currentCell.innerHTML = String(numAdjacentBombs);
            return;
        } else {
            for (let i = 0; i < adjacentCells.length; i++) {
                let cell = adjacentCells[i];
                if (cell.getAttribute('data-status') === 'unchecked') this.#checkAdjacentCells(Number(cell.getAttribute('data-x')), Number(cell.getAttribute('data-y')));
            }
        }
    }

    #handleMouseDown(e: MouseEvent, x: number, y: number): void {
        e.preventDefault();
        const cell: HTMLButtonElement | null = document.querySelector(`[data-x = '${x}'][data-y = '${y}']`);
        // handle right click - cycle between unchecked, flag, and question
        if (e.button === 2) {
            switch (cell?.getAttribute('data-status')) {
                case 'unchecked':
                    cell.setAttribute('data-status', 'flag');
                    if (this.#bombCoordinates.some(coords => coords[0] === x && coords[1] === y)) this.#flaggedBombs++;
                    break;
                case 'flag':
                    cell.setAttribute('data-status', 'question');
                    if (this.#bombCoordinates.some(coords => coords[0] === x && coords[1] === y)) this.#flaggedBombs--;
                    break;
                case 'question':
                    cell.setAttribute('data-status', 'unchecked');
                    break;
            }
            this.#updateFlaggedBombs();
        // handle left click - game over if bomb
        } else if (e.button === 0) {
            // guards
            if (cell?.getAttribute('data-status') === 'flag' || cell?.getAttribute('data-status') === 'question') {
                this.#errorMessage = "This cell has been either flagged or question marked. Please toggle back to unchecked before attempting to check it.";
                this.#updateErrorMessage();
                return;
            } 
            if (cell?.getAttribute('data-status') === 'checked') {
                this.#errorMessage = "This cell has already been checked.";
                this.#updateErrorMessage();
                return;
            }

            if (cell?.getAttribute('data-type') === 'bomb') {
                // game over
            } else {
                this.#checkAdjacentCells(x, y);
            } 
        }
    }
    
    render() {
        const board: HTMLElement | null = document.getElementById('board');
        for (let x = 0; x < this.#sideLength; x++) {
            let columnDiv: HTMLDivElement = document.createElement('div');
            columnDiv.classList.add('row');
            for (let y = 0; y < this.#sideLength; y++) {
                // creating element and setting key attributes
                const cell: HTMLButtonElement = document.createElement('button');
                cell.setAttribute('data-x', String(x));
                cell.setAttribute('data-y', String(y));
                cell.setAttribute('data-status', 'unchecked'); // unchecked, checked, flag, question
                cell.setAttribute('data-type', this.#boardStatus[x][y]); // bomb, notbomb
                cell.addEventListener('mousedown', (e) => this.#handleMouseDown(e, x, y));

                // delete
                if (this.#boardStatus[x][y] === 'bomb') cell.innerHTML = 'B';

                columnDiv.appendChild(cell);
            }
            board?.appendChild(columnDiv);
        }

        this.#renderInfo();
    }

    #renderInfo() {
        const totalBombsInfo: HTMLElement | null = document.getElementById('total-bombs');
        if (totalBombsInfo) totalBombsInfo.textContent = "Total bombs: " + String(this.#numBombs);

        this.#updateFlaggedBombs();
        this.#updateErrorMessage();
    }

    #updateFlaggedBombs() {
        const flaggedBombsInfo: HTMLParagraphElement | HTMLElement = document.getElementById('flagged-bombs')!;
        flaggedBombsInfo.textContent = "Flagged bombs: " + String(this.#flaggedBombs);
    }

    #updateErrorMessage() {
        const errorMessageInfo: HTMLParagraphElement | HTMLElement = document.getElementById('err-msg')!;
        errorMessageInfo.textContent = "Error: " + this.#errorMessage;
    }

    clear() {
        const board: HTMLElement = document.getElementById('board')!;
        const info: HTMLElement = document.getElementById('info')!;

        board.innerHTML = '';
        info.innerHTML = '';
    }
}

export default Board;