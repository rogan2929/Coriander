/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Tile
 * @param {type} value
 * @param {type} index
 */
function Tile(value, index) {
    this.value = value;
    this.index = index;
};

/**
 * Decrements the tile's value by one.
 * @returns {type}
 */
Tile.prototype.decrementValue = function() {
    this.value -= 1;
    return this.value;
};

/**
 * Increments the tile's value by one.
 * @returns {type}
 */
Tile.prototype.incrementValue = function() {
    this.value += 1;
    return this.value;
};

/**
 * Gets the tile's index value.
 * @returns {type}
 */
Tile.prototype.getIndex = function() {
    return this.index;
};

/**
 * Setter for Tile value.
 * @param {type} value
 */
Tile.prototype.setValue = function(value) {
    this.value = value;
};

/**
 * Getter for Tile value.
 * @returns {type}
 */
Tile.prototype.getValue = function() {
    return this.value;
};

/**
 * toString() method for Tile
 * @returns {type}
 */
Tile.prototype.toString = function() {
    return this.value;
};