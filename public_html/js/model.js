/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Model for the application.
 * @type type
 */
var model = {
    /**
     * Loads the game state from LocalStorage.
     */
    getGameState: function() {
        
    },
    /**
     * Gets the current top score.
     * @param {type} difficulty
     * @returns {unresolved}
     */
    getTopScore: function(difficulty) {
        return localStorage.getItem(difficulty);
    },
    /**
     * Saves the game state to LocalStorage.
     * @param {type} tiles
     * @param {type} moves
     * @param {type} gridSize
     * @param {type} difficulty
     */
    saveGameState: function(tiles, moves, gridSize, difficulty) {
        
    },
    /**
     * Save a top score.
     * @param {Score} score
     */
    saveTopScore: function(score) {
        console.log(score);
        localStorage.setItem(score.difficulty, score.moves);
    }
};