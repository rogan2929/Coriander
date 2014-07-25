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
     * Clears the game state.
     */
    clearGameState: function() {
        localStorage.removeItem('gamestate');
    },
    /**
     * Clears all top scores.
     */
    clearTopScores: function() {
        // NYI...
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
     * @param {type} mode
     * @param {type} size
     * @returns {unresolved}
     */
    getTopScore: function(mode, size) {
        //return localStorage.getItem('topscores');
        return localStorage.getItem(mode + '.' + size);
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
        // Store in format: (<mode>.<size>, <moves>)
        localStorage.setItem(score.mode + '.' + score.size, score.moves);
    }
};