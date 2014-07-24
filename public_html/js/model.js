ol/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Model for the application.
 * @type type
 */
var model = {
    clearGameState: function() {
        localStorage.removeItem('gamestate');
    },
    /**
     * Loads the game state from LocalStorage.
     */
    getGameState: function() {
        var gameStateString, gameState;
        
        gameState = null;
                
        gameStateString = localStorage.getItem('gamestate');
        
        if (gameStateString) {
            gameState = JSON.parse(gameStateString);
        }
        
        return gameState;
    },
    /**
     * Gets the current top score.
     * @param {type} size
     * @returns {unresolved}
     */
    getTopScore: function(size) {
        return localStorage.getItem(size);
    },
    /**
     * Saves the game state to LocalStorage.
     * @param {GameState} gameState
     */
    saveGameState: function(gameState) {
        localStorage.setItem('gamestate', JSON.stringify(gameState));
    },
    /**
     * Save a top score.
     * @param {Score} score
     */
    saveTopScore: function(score) {
        console.log(score);
        localStorage.setItem(score.size, score.moves);
    }
};