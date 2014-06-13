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
     * Gets the current top score.
     * @param {type} difficulty
     * @returns {unresolved}
     */
    getTopScore: function(difficulty) {
        return localStorage.getItem(difficulty);
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