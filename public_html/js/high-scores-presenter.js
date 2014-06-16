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

        score = model.getTopScore(difficulties.easy);

        if (score) {
            scores.push(new Score(score, difficulties.easy));
        }

        score = model.getTopScore(difficulties.regular);

        if (score) {
            scores.push(new Score(score, difficulties.regular));
        }

        score = model.getTopScore(difficulties.hard);

        if (score) {
            scores.push(new Score(score, difficulties.hard));
        }
        
        score = model.getTopScore(difficulties.insane);
        
        if (score) {
            scores.push(new Score(score, difficulties.insane));
        }
        
        highScoresView.displayTopScores(scores);
    }
};