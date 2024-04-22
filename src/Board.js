"use strict";
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
var _Board_instances, _Board_sideLength, _Board_numBombs, _Board_boardStatus, _Board_bombCoordinates, _Board_getRandomInt, _Board_determineBombCoordinates, _Board_initializeBoardStatus, _Board_findAdjacentCells, _Board_checkAdjacentCells, _Board_handleCellClick;
Object.defineProperty(exports, "__esModule", { value: true });
var Board = /** @class */ (function () {
    function Board(sideLength, numBombs) {
        _Board_instances.add(this);
        _Board_sideLength.set(this, 0);
        _Board_numBombs.set(this, 0);
        _Board_boardStatus.set(this, []);
        _Board_bombCoordinates.set(this, []);
        __classPrivateFieldSet(this, _Board_sideLength, sideLength, "f");
        __classPrivateFieldSet(this, _Board_numBombs, numBombs, "f");
        __classPrivateFieldSet(this, _Board_bombCoordinates, __classPrivateFieldGet(this, _Board_instances, "m", _Board_determineBombCoordinates).call(this), "f");
        __classPrivateFieldGet(this, _Board_instances, "m", _Board_initializeBoardStatus).call(this);
    }
    Board.prototype.render = function () {
        var _this = this;
        var board = document.getElementById('board');
        var _loop_1 = function (x) {
            var columnDiv = document.createElement('div');
            columnDiv.classList.add('row');
            var _loop_2 = function (y) {
                // creating element and setting key attributes
                var cellType = __classPrivateFieldGet(this_1, _Board_boardStatus, "f")[x][y];
                var cell = document.createElement('button');
                cell.setAttribute('data-x', String(x));
                cell.setAttribute('data-y', String(y));
                cell.setAttribute('data-checked', String(false));
                cell.setAttribute('data-type', cellType);
                cell.addEventListener('click', function (e) { return __classPrivateFieldGet(_this, _Board_instances, "m", _Board_handleCellClick).call(_this, e, x, y, cellType); });
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
            };
            for (var y = 0; y < __classPrivateFieldGet(this_1, _Board_sideLength, "f"); y++) {
                _loop_2(y);
            }
            board === null || board === void 0 ? void 0 : board.appendChild(columnDiv);
        };
        var this_1 = this;
        for (var x = 0; x < __classPrivateFieldGet(this, _Board_sideLength, "f"); x++) {
            _loop_1(x);
        }
    };
    return Board;
}());
_Board_sideLength = new WeakMap(), _Board_numBombs = new WeakMap(), _Board_boardStatus = new WeakMap(), _Board_bombCoordinates = new WeakMap(), _Board_instances = new WeakSet(), _Board_getRandomInt = function _Board_getRandomInt(max) {
    return Math.floor(Math.random() * max);
}, _Board_determineBombCoordinates = function _Board_determineBombCoordinates() {
    var bombCoordinates = [];
    var _loop_3 = function (i) {
        var x = -1;
        var y = -1;
        while (bombCoordinates.some(function (coordinatePair) { return coordinatePair[0] == x && coordinatePair[1] == y; }) || (x == -1 && y == -1)) {
            x = __classPrivateFieldGet(this_2, _Board_instances, "m", _Board_getRandomInt).call(this_2, __classPrivateFieldGet(this_2, _Board_sideLength, "f"));
            y = __classPrivateFieldGet(this_2, _Board_instances, "m", _Board_getRandomInt).call(this_2, __classPrivateFieldGet(this_2, _Board_sideLength, "f"));
        }
        ;
        bombCoordinates[i] = [x, y];
    };
    var this_2 = this;
    for (var i = 0; i < __classPrivateFieldGet(this, _Board_numBombs, "f"); i++) {
        _loop_3(i);
    }
    return bombCoordinates;
}, _Board_initializeBoardStatus = function _Board_initializeBoardStatus() {
    var _loop_4 = function (i) {
        var row = [];
        var _loop_5 = function (j) {
            if (__classPrivateFieldGet(this_3, _Board_bombCoordinates, "f").some(function (coordinatePair) { return coordinatePair[0] == i && coordinatePair[1] == j; })) {
                row[j] = 'bomb';
            }
            else {
                row[j] = 'notbomb';
            }
        };
        for (var j = 0; j < __classPrivateFieldGet(this_3, _Board_sideLength, "f"); j++) {
            _loop_5(j);
        }
        __classPrivateFieldGet(this_3, _Board_boardStatus, "f")[i] = row;
    };
    var this_3 = this;
    for (var i = 0; i < __classPrivateFieldGet(this, _Board_sideLength, "f"); i++) {
        _loop_4(i);
    }
}, _Board_findAdjacentCells = function _Board_findAdjacentCells(x, y) {
    var adjacentCells = [];
    x = Number(x);
    y = Number(y);
    for (var i = (x - 1); i <= (x + 1); i++) {
        // x outside of board
        if (i < 0 || i > __classPrivateFieldGet(this, _Board_sideLength, "f") - 1)
            continue;
        for (var j = (y - 1); j <= (y + 1); j++) {
            // y outside of board
            if (j < 0 || j > __classPrivateFieldGet(this, _Board_sideLength, "f") - 1)
                continue;
            // current i and j match current cell's coords
            if (i == x && j == y)
                continue;
            var cell = document.querySelector("[data-x = '".concat(i, "'][data-y = '").concat(j, "']"));
            // cell has already been checked
            if ((cell === null || cell === void 0 ? void 0 : cell.getAttribute('data-checked')) === 'true')
                continue;
            // cell is unchecked and within board
            if (cell)
                adjacentCells.push(cell);
        }
    }
    return adjacentCells;
}, _Board_checkAdjacentCells = function _Board_checkAdjacentCells(x, y) {
    var currentCell = document.querySelector("[data-x = '".concat(x, "'][data-y = '").concat(y, "']"));
    var adjacentCells = __classPrivateFieldGet(this, _Board_instances, "m", _Board_findAdjacentCells).call(this, x, y);
    // calculate number of adjacent bombs
    var numAdjacentBombs = 0;
    for (var _i = 0, adjacentCells_1 = adjacentCells; _i < adjacentCells_1.length; _i++) {
        var cell = adjacentCells_1[_i];
        var cellType = cell.getAttribute('data-type');
        if (cellType === 'bomb')
            numAdjacentBombs++;
    }
    if (currentCell) {
        if (numAdjacentBombs > 0)
            currentCell.innerHTML = String(numAdjacentBombs);
        currentCell.setAttribute('data-checked', String(true));
    }
    // base case
    if (numAdjacentBombs > 0) {
        return;
    }
    else {
        for (var i = 0; i < adjacentCells.length; i++) {
            var cell = adjacentCells[i];
            if (cell.getAttribute('data-checked') !== 'true') {
                __classPrivateFieldGet(this, _Board_instances, "m", _Board_checkAdjacentCells).call(this, cell.getAttribute('data-x'), cell.getAttribute('data-y'));
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
}, _Board_handleCellClick = function _Board_handleCellClick(e, x, y, cellType) {
    if (cellType === 'bomb') {
        // game over
    }
    else {
        __classPrivateFieldGet(this, _Board_instances, "m", _Board_checkAdjacentCells).call(this, x, y);
    }
};
exports.default = Board;
