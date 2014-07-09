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

        score = model.getTopScore(sizes.small);

        if (score) {
            scores.push(new Score(score, sizes.small));
        }

        score = model.getTopScore(sizes.regular);

        if (score) {
            scores.push(new Score(score, sizes.regular));
        }

        score = model.getTopScore(sizes.large);

        if (score) {
            scores.push(new Score(score, sizes.large));
        }
        
        score = model.getTopScore(sizes.huge);
        
        if (score) {
            scores.push(new Score(score, sizes.huge));
        }
        
        highScoresView.displayTopScores(scores);
    }
};