/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Presenter for #victory
 * @type type
 */
var victoryPresenter = {
    score: null,
    newRecord: null,
    /**
     * Entry point.
     */
    init: function() {
        eventBus.installHandler('victoryPresenter.onTapButtonFacebook', victoryPresenter.onTapButtonFacebook, '#button-facebook', 'tap');

        if (victoryPresenter.score) {
            victoryView.displayScore(victoryPresenter.score);
        }

        if (victoryPresenter.newRecord) {
            victoryView.displayNewRecord();
        }
        else {
            victoryView.hideNewRecord();
        }
    },
    /**
     * 
     * @param {bool} newRecord
     */
    setNewRecord: function(newRecord) {
        victoryPresenter.newRecord = newRecord;
    },
    /**
     * Setter for score.
     * @param {Score} score
     */
    setScore: function(score) {
        victoryPresenter.score = score;
    },
    onTapButtonFacebook: function(e) {
        var actionProperties;

        if (!victoryPresenter.score) {
            victoryPresenter.score = new Score(15, difficulties.regular);
        }

        switch (victoryPresenter.score.difficulty) {
            case difficulties.easy:
                actionProperties = {
                    easy_puzzle: 'http://coriander.azurewebsites.net/og_easy.html'
                };
                break;
            case difficulties.regular:
                actionProperties = {
                    regular_puzzle: 'http://coriander.azurewebsites.net/og_regular.html'
                };
                break;
            case difficulties.hard:
                actionProperties = {
                    hard_puzzle: 'http://coriander.azurewebsites.net/og_hard.html'
                };
                break;
        }

        FB.ui({
            method: 'share_open_graph',
            action_type: 'flippee:solve',
            action_properties: JSON.stringify(actionProperties)
        }, function(response) {
            console.log(response);
        });
    }
};