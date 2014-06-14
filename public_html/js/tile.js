/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Tile
 * @param {type} value
 * @param {type} index
 * @param {type} max
 */
function Tile(value, index, max) {
    this.value = value;
    this.index = index;
    this.max = max;
};

Tile.prototype.decrementValue = function() {
    this.value -= 1;
    
    if (this.value < 0) {
        this.value = this.max - 1;
    }
    
    // Set the delta
    this.delta = -1;
};

/**
 * Increments the tile's value by one.
 * @returns {type}
 */
Tile.prototype.incrementValue = function() {
    this.value = (this.value + 1) % this.max;
    this.delta = 1;         // Set the delta.
    return this.value;
};

/**
 * Getter for delta.
 * @returns {undefined}
 */
Tile.prototype.getDelta = function() {
    return this.delta;
};

/**
 * Gets the tile's index value.
 * @returns {type}
 */
Tile.prototype.getIndex = function() {
    return this.index;
};

/**
 * Sets the tile's index value.
 * @param {type} index
 */
Tile.prototype.setIndex = function(index) {
    this.index = index;
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