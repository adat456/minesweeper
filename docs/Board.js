'use strict';
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Board_instances, _Board_width, _Board_length, _Board_numMines, _Board_firstClick, _Board_mineCoords, _Board_flaggedMines, _Board_getRandomInt, _Board_generateMineCoords, _Board_placeMines, _Board_findAdjacentCells, _Board_areAllNotMineCellsChecked, _Board_checkAdjacentCells, _Board_handleMouseDown;
import { startTimer, setOutcome, updateInfo } from "./main";
class Board {
    constructor(width, length, numMines) {
        _Board_instances.add(this);
        _Board_width.set(this, 0);
        _Board_length.set(this, 0);
        _Board_numMines.set(this, 0);
        _Board_firstClick.set(this, false);
        _Board_mineCoords.set(this, []);
        _Board_flaggedMines.set(this, 0);
        __classPrivateFieldSet(this, _Board_width, width, "f");
        __classPrivateFieldSet(this, _Board_length, length, "f");
        __classPrivateFieldSet(this, _Board_numMines, numMines, "f");
    }
    getLength() { return __classPrivateFieldGet(this, _Board_length, "f"); }
    getWidth() { return __classPrivateFieldGet(this, _Board_width, "f"); }
    getNumMines() { return __classPrivateFieldGet(this, _Board_numMines, "f"); }
    getMineCoords() { return __classPrivateFieldGet(this, _Board_mineCoords, "f"); }
    getFlaggedMines() { return __classPrivateFieldGet(this, _Board_flaggedMines, "f"); }
    getHandleMouseDownFunction() {
        const boundHandleMouseDown = __classPrivateFieldGet(this, _Board_instances, "m", _Board_handleMouseDown).bind(this);
        return boundHandleMouseDown;
    }
}
_Board_width = new WeakMap(), _Board_length = new WeakMap(), _Board_numMines = new WeakMap(), _Board_firstClick = new WeakMap(), _Board_mineCoords = new WeakMap(), _Board_flaggedMines = new WeakMap(), _Board_instances = new WeakSet(), _Board_getRandomInt = function _Board_getRandomInt(max) {
    return Math.floor(Math.random() * max);
}, _Board_generateMineCoords = function _Board_generateMineCoords(excludeX, excludeY) {
    // creates an array with multiple subarrays, each subarray being the (x, y) coordinate of a mine
    // avoids generating repeat coords and coord of first click button
    let mineCoords = [];
    for (let i = 0; i < __classPrivateFieldGet(this, _Board_numMines, "f"); i++) {
        let x = -1;
        let y = -1;
        while (mineCoords.some(coordinatePair => coordinatePair[0] == x && coordinatePair[1] == y) ||
            (x == -1 && y == -1) ||
            (x == excludeX && y == excludeY)) {
            x = __classPrivateFieldGet(this, _Board_instances, "m", _Board_getRandomInt).call(this, __classPrivateFieldGet(this, _Board_length, "f"));
            y = __classPrivateFieldGet(this, _Board_instances, "m", _Board_getRandomInt).call(this, __classPrivateFieldGet(this, _Board_width, "f"));
        }
        ;
        mineCoords[i] = [x, y];
    }
    __classPrivateFieldSet(this, _Board_mineCoords, mineCoords, "f");
}, _Board_placeMines = function _Board_placeMines() {
    for (const coordPair of __classPrivateFieldGet(this, _Board_mineCoords, "f")) {
        const cell = document.querySelector(`[data-x = '${coordPair[0]}'][data-y = '${coordPair[1]}']`);
        cell.setAttribute('data-type', 'mine');
        // cell.innerHTML = 'B'; // delete
    }
}, _Board_findAdjacentCells = function _Board_findAdjacentCells(x, y) {
    // returns cells surrounding the current coods, as long as each cell is within bounds and has not yet been checked
    let adjacentCells = [];
    for (let i = (x - 1); i <= (x + 1); i++) {
        // x outside of board
        if (i < 0 || i > __classPrivateFieldGet(this, _Board_length, "f") - 1)
            continue;
        for (let j = (y - 1); j <= (y + 1); j++) {
            // y outside of board
            if (j < 0 || j > __classPrivateFieldGet(this, _Board_width, "f") - 1)
                continue;
            // current i and j match current cell's coords
            if (i == x && j == y)
                continue;
            const cell = document.querySelector(`[data-x = '${i}'][data-y = '${j}']`);
            // cell has already been checked
            if ((cell === null || cell === void 0 ? void 0 : cell.getAttribute('data-status')) === 'unchecked')
                adjacentCells.push(cell);
        }
    }
    return adjacentCells;
}, _Board_areAllNotMineCellsChecked = function _Board_areAllNotMineCellsChecked() {
    const notMineCells = document.querySelectorAll(`[data-type = 'notmine']`);
    return Array.from(notMineCells).every(cell => cell.getAttribute('data-status') === 'checked');
}, _Board_checkAdjacentCells = function _Board_checkAdjacentCells(x, y) {
    const currentCell = document.querySelector(`[data-x = '${x}'][data-y = '${y}']`);
    currentCell.setAttribute('data-status', 'checked');
    const adjacentCells = __classPrivateFieldGet(this, _Board_instances, "m", _Board_findAdjacentCells).call(this, x, y);
    // calculate number of adjacent mines
    let numAdjacentMines = 0;
    for (const cell of adjacentCells) {
        const cellType = cell.getAttribute('data-type');
        if (cellType === 'mine')
            numAdjacentMines++;
    }
    // base case
    if (numAdjacentMines > 0) {
        currentCell.innerHTML = String(numAdjacentMines);
    }
    else {
        for (let i = 0; i < adjacentCells.length; i++) {
            let cell = adjacentCells[i];
            if (cell.getAttribute('data-status') === 'unchecked')
                __classPrivateFieldGet(this, _Board_instances, "m", _Board_checkAdjacentCells).call(this, Number(cell.getAttribute('data-x')), Number(cell.getAttribute('data-y')));
        }
    }
    // check if all not mine cells are all checked --> end game
    if (__classPrivateFieldGet(this, _Board_instances, "m", _Board_areAllNotMineCellsChecked).call(this)) {
        setOutcome('win');
    }
}, _Board_handleMouseDown = function _Board_handleMouseDown(e, x, y) {
    var _a, _b;
    e.preventDefault();
    // responsible for generating the mines on the first click
    if (__classPrivateFieldGet(this, _Board_firstClick, "f") === false) {
        __classPrivateFieldSet(this, _Board_firstClick, true, "f");
        __classPrivateFieldGet(this, _Board_instances, "m", _Board_generateMineCoords).call(this, x, y);
        __classPrivateFieldGet(this, _Board_instances, "m", _Board_placeMines).call(this);
        startTimer();
    }
    const cell = document.querySelector(`[data-x = '${x}'][data-y = '${y}']`);
    // handle right click - cycle between unchecked, flag, and question
    if (e.button === 2) {
        switch (cell === null || cell === void 0 ? void 0 : cell.getAttribute('data-status')) {
            case 'unchecked':
                cell.setAttribute('data-status', 'flag');
                if (__classPrivateFieldGet(this, _Board_mineCoords, "f").some(coords => coords[0] === x && coords[1] === y)) {
                    __classPrivateFieldSet(this, _Board_flaggedMines, (_a = __classPrivateFieldGet(this, _Board_flaggedMines, "f"), _a++, _a), "f");
                    updateInfo();
                }
                break;
            case 'flag':
                cell.setAttribute('data-status', 'question');
                if (__classPrivateFieldGet(this, _Board_mineCoords, "f").some(coords => coords[0] === x && coords[1] === y)) {
                    __classPrivateFieldSet(this, _Board_flaggedMines, (_b = __classPrivateFieldGet(this, _Board_flaggedMines, "f"), _b--, _b), "f");
                    updateInfo();
                }
                break;
            case 'question':
                cell.setAttribute('data-status', 'unchecked');
                break;
        }
        // handle left click - game over if mine
    }
    else if (e.button === 0) {
        // guard clause
        if ((cell === null || cell === void 0 ? void 0 : cell.getAttribute('data-status')) !== 'unchecked')
            return;
        if ((cell === null || cell === void 0 ? void 0 : cell.getAttribute('data-type')) === 'mine') {
            setOutcome('lose');
        }
        else {
            __classPrivateFieldGet(this, _Board_instances, "m", _Board_checkAdjacentCells).call(this, x, y);
        }
    }
};
export default Board;
