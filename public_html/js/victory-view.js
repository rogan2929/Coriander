/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * View for #victory
 * @type type
 */
var victoryView = {
    /**
     * Show the new record banner.
     */
    displayNewRecord: function() {
        $('#new-record').show();
    },
    /**
     * Display the current score.
     * @param {Score} score
     */
    displayScore: function(score) {
        var text;
        
        text = "You've completed a puzzle on " + score.difficulty + " difficulty in " + score.moves + " moves!";
        
        $('#score-result').text(text);
    },
    /**
     * Hide the new record banner.
     */
    hideNewRecord: function() {
        $('#new-record').hide();
    }
};