type BoardRowStatus = 'notbomb'[] | 'bomb'[];

class Board {
    #sideLength = 0;
    #numBombs = 0;
    #boardStatus: BoardRowStatus[] = [];
    #bombCoordinates: number[][] = [];

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
    #determineBombCoordinates() {
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

    // does not return anything; creates an array of arrays, where each array is a row
    // at each (i, j) is a word that describes the cell's status
    #initializeBoardStatus() {
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

    // returns an array of cells (not coord pairs) surrounding the cell with the current coord pair, as long as each cell is within bounds and has not yet been checked
    #findAdjacentCells(x: number, y: number) {
        let adjacentCells: HTMLButtonElement[] = [];
        x = Number(x);
        y = Number(y);
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
                if (cell?.getAttribute('data-checked') === 'true') continue;
                // cell is unchecked and within board
                if (cell) adjacentCells.push(cell);
            }
        }
        return adjacentCells;
    }

    #checkAdjacentCells(x, y) {
        const currentCell: HTMLButtonElement | null = document.querySelector(`[data-x = '${x}'][data-y = '${y}']`);
        const adjacentCells = this.#findAdjacentCells(x, y);

        // calculate number of adjacent bombs
        let numAdjacentBombs = 0;
        for (const cell of adjacentCells) {
            const cellType = cell.getAttribute('data-type');
            if (cellType === 'bomb') numAdjacentBombs++;
        }

        if (currentCell) {
            if (numAdjacentBombs > 0) currentCell.innerHTML = String(numAdjacentBombs)
            currentCell.setAttribute('data-checked', String(true));
        }
        
        // base case
        if (numAdjacentBombs > 0) {
            return;
        } else {
            for (let i = 0; i < adjacentCells.length; i++) {
                let cell = adjacentCells[i];
                if (cell.getAttribute('data-checked') !== 'true') {
                    this.#checkAdjacentCells(cell.getAttribute('data-x'), cell.getAttribute('data-y'));
                }
            }
        }
        
        // check cells around initial cell, looking for bombs
            // if no bombs
                // switch attribute checked to true
                // generate coordinate pairs of surrounding cells
                // recursively check each
            // if bombs
                // switch attribute checked to false
                // set button text to number of bombs
                // exit (base case)
    }

    #handleCellClick(e: MouseEvent, x: number, y: number, cellType: 'notbomb' | 'bomb') {
        if (cellType === 'bomb') {
            // game over
        } else {
            this.#checkAdjacentCells(x, y);
        } 
    }
    
    render() {
        const board: HTMLElement | null = document.getElementById('board');
        for (let x = 0; x < this.#sideLength; x++) {
            let columnDiv: HTMLDivElement = document.createElement('div');
            columnDiv.classList.add('row');
            for (let y = 0; y < this.#sideLength; y++) {
                // creating element and setting key attributes
                const cellType = this.#boardStatus[x][y];

                const cell: HTMLButtonElement = document.createElement('button');
                cell.setAttribute('data-x', String(x));
                cell.setAttribute('data-y', String(y));
                cell.setAttribute('data-checked', String(false));
                cell.setAttribute('data-type', cellType);
                cell.addEventListener('click', (e) => this.#handleCellClick(e, x, y, cellType));

                switch (cellType) {
                    case 'bomb':
                        // remove next line
                        cell.innerHTML = 'B';
                        
                        break;
                    case 'notbomb':
                        break;
                    default:
                        break;
                }
                columnDiv.appendChild(cell);
            }
            board?.appendChild(columnDiv);
        }
    }
}

export default Board;