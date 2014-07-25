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

        score = model.getTopScore(modes.regular, sizes.small);

        if (score) {
            scores.push(new Score(score, sizes.small, modes.regular));
        }

        score = model.getTopScore(modes.regular, sizes.regular);

        if (score) {
            scores.push(new Score(score, sizes.regular, modes.regular));
        }

        score = model.getTopScore(modes.regular, sizes.large);

        if (score) {
            scores.push(new Score(score, sizes.large, modes.regular));
        }
        
        score = model.getTopScore(modes.regular, sizes.huge);
        
        if (score) {
            scores.push(new Score(score, sizes.huge, modes.regular));
        }
        
        // Advanced Game Mode
        
        score = model.getTopScore(modes.advanced, sizes.small);

        if (score) {
            scores.push(new Score(score, sizes.small, modes.advanced));
        }

        score = model.getTopScore(modes.advanced, sizes.regular);

        if (score) {
            scores.push(new Score(score, sizes.regular, modes.advanced));
        }

        score = model.getTopScore(modes.advanced, sizes.large);

        if (score) {
            scores.push(new Score(score, sizes.large, modes.advanced));
        }
        
        score = model.getTopScore(modes.advanced, sizes.huge);
        
        if (score) {
            scores.push(new Score(score, sizes.huge, modes.advanced));
        }
        
        highScoresView.displayTopScores(scores);
    }
};