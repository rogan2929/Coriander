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
        FB.ui({
            method: 'share_open_graph',
            action_type: 'flippee:solve',
            action_properties: JSON.stringify({
                flippee_puzzle: {
                    'og:type': 'flippee:flippee_puzzle',
                    'og:title': 'an easy'
                }
            })
        }, function(response) {
            console.log(response);
        });
    }
};