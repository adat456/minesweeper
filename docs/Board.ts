'use strict';
import { placeMines, setOutcome, updateInfo } from "./main";

export default class Board {
    #width = 0;
    #length = 0;
    #numMines = 0;
    #firstClick = false;
    #mineCoords: number[][] = [];
    #flaggedMines: number = 0;

    constructor(width: number, length: number, numMines: number) {
        this.#width = width;
        this.#length = length;
        this.#numMines = numMines;
    }

    #getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }
    
    #generateMineCoords(excludeX: number, excludeY: number): void {
        // creates an array with multiple subarrays, each subarray being the (x, y) coordinate of a mine
        // avoids generating repeat coords and coord of first click button
        let mineCoords: number[][] = [];
        for (let i = 0; i < this.#numMines; i++) {
            let x = -1;
            let y = -1;
            while (
                mineCoords.some(coordinatePair => coordinatePair[0] == x && coordinatePair[1] == y) || 
                (x == -1 && y == -1) || 
                (x == excludeX && y == excludeY)
            ) {
                x = this.#getRandomInt(this.#length);
                y = this.#getRandomInt(this.#width);
            };
            mineCoords[i] = [x, y];
        }
        this.#mineCoords = mineCoords;
    }
 

    #findAdjacentCells(x: number, y: number): HTMLButtonElement[] {
        // returns cells surrounding the current coods, as long as each cell is within bounds and has not yet been checked
        let adjacentCells: HTMLButtonElement[] = [];
        for (let i = (x - 1); i <= (x + 1); i++) {
            // x outside of board
            if (i < 0 || i > this.#length - 1) continue;
            for (let j = (y - 1); j <= (y + 1); j++) {
                // y outside of board
                if (j < 0 || j > this.#width - 1) continue;
                // current i and j match current cell's coords
                if (i == x && j == y) continue;

                const cell: HTMLButtonElement | null = document.querySelector(`[data-x = '${i}'][data-y = '${j}']`);

                // cell has already been checked
                if (cell?.getAttribute('data-status') === 'unchecked') adjacentCells.push(cell);
            }
        }
        return adjacentCells;
    }

    #areAllNotMineCellsChecked(): boolean {
        const notMineCells: NodeListOf<HTMLButtonElement> = document.querySelectorAll(`[data-type = 'notmine']`);
        return Array.from(notMineCells).every(cell => cell.getAttribute('data-status') === 'checked');
    }

    // minor UI manipulation
    #checkAdjacentCells(x: number, y: number): void {
        const currentCell: HTMLButtonElement = document.querySelector(`[data-x = '${x}'][data-y = '${y}']`)!;
        currentCell.setAttribute('data-status', 'checked');

        const adjacentCells = this.#findAdjacentCells(x, y);

        // calculate number of adjacent mines
        let numAdjacentMines = 0;
        for (const cell of adjacentCells) {
            const cellType = cell.getAttribute('data-type');
            if (cellType === 'mine') numAdjacentMines++;
        }
        
        // base case
        if (numAdjacentMines > 0) {
            currentCell.innerHTML = String(numAdjacentMines);
        } else {
            for (let i = 0; i < adjacentCells.length; i++) {
                let cell = adjacentCells[i];
                if (cell.getAttribute('data-status') === 'unchecked') this.#checkAdjacentCells(Number(cell.getAttribute('data-x')), Number(cell.getAttribute('data-y')));
            }
        }

        // check if all not mine cells are all checked --> end game
        if (this.#areAllNotMineCellsChecked()) {
            setOutcome('win');
        }
    }

    // minor UI manipulation
    #handleMouseDown(e: MouseEvent, x: number, y: number): void {
        e.preventDefault();

        // guard clause - responsible for generating the mines on the first click
        if (this.#firstClick === false) {
            this.#firstClick = true;
            this.#generateMineCoords(x, y);
            placeMines();
            return;
        }

        const cell: HTMLButtonElement | null = document.querySelector(`[data-x = '${x}'][data-y = '${y}']`);
        // handle right click - cycle between unchecked, flag, and question
        if (e.button === 2) {
            switch (cell?.getAttribute('data-status')) {
                case 'unchecked':
                    cell.setAttribute('data-status', 'flag');
                    if (this.#mineCoords.some(coords => coords[0] === x && coords[1] === y)) {
                        this.#flaggedMines++;
                        updateInfo();
                    }
                    break;
                case 'flag':
                    cell.setAttribute('data-status', 'question');
                    if (this.#mineCoords.some(coords => coords[0] === x && coords[1] === y)) {
                        this.#flaggedMines--;
                        updateInfo();
                    }
                    break;
                case 'question':
                    cell.setAttribute('data-status', 'unchecked');
                    break;

            }
        // handle left click - game over if mine
        } else if (e.button === 0) {
            // guard clause
            if (cell?.getAttribute('data-status') !== 'unchecked') return;

            if (cell?.getAttribute('data-type') === 'mine') {
                setOutcome('lose');
            } else {
                this.#checkAdjacentCells(x, y);
            } 
        }
    }

    getLength() { return this.#length; }

    getWidth() { return this.#width; }

    getNumMines() { return this.#numMines; }

    getMineCoords() { return this.#mineCoords; }

    getFlaggedMines() { return this.#flaggedMines; }

    getHandleMouseDownFunction(): (e: MouseEvent, x: number, y: number) => void {
        const boundHandleMouseDown = this.#handleMouseDown.bind(this);
        return boundHandleMouseDown;
    }
}