/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Presenter for #high-scores.
 * @type type
 */
var highScoresPresenter = {
    /**
     * Entry point.
     */
    init: function() {
        var scores, score;

        scores = [];

        score = model.getTopScore('easy');

        if (score) {
            scores.push(new Score(score, 'easy'));
        }

        score = model.getTopScore('medium');

        if (score) {
            scores.push(new Score(score, 'medium'));
        }

        score = model.getTopScore('hard');

        if (score) {
            scores.push(new Score(score, 'hard'));
        }
        
        highScoresView.displayTopScores(scores);
    }
};