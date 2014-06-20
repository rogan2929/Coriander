/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Object containing current gamestate.
 * @param {Tile} tiles
 * @param {type} gridSize
 * @param {Score} score
 * @returns {GameState}
 */
function GameState(tiles, gridSize, score) {
    this.tiles = tiles;
    this.gridSize = gridSize;
    this.score = score;
};

/**
 * Getter for tiles.
 * @returns {Tile}
 */
GameState.prototype.getTiles = function() {
    return this.tiles;
};

/**
 * Getter for gridSize
 * @returns {type}
 */
GameState.prototype.getGridSize = function() {
    return this.gridSize;
};

/**
 * Getter for score.
 * @returns {Score}
 */
GameState.prototype.getScore = function() {
    return this.score;
};