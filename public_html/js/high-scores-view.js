/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * View for #high-scores.
 * @type type
 */
var highScoresView = {
    /**
     * Displays top scores.
     * @param {Score} scores
     */
    displayTopScores: function(scores) {
        var i, id;
        
        for (i = 0; i < scores.length; i++) {
            id = '#top-score-' + scores[i].mode + '-' + scores[i].size;
            
            $(id).text(scores[i].moves + ' Moves');
        }
    }
};