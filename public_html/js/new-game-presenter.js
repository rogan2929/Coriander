/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Presenter for #start
 * @type type
 */
var newGamePresenter = {
    /**
     * 
     */
    init: function() {
        eventBus.installHandler('newGamePresenter.onTapButtonReady', newGamePresenter.onTapButtonReady, '#button-ready', 'tap');
        newGameView.toggleButtonResume(!gamePresenter.newGame);
    },
    onTapButtonReady: function(e) {
        gamePresenter.newGame = true;
    }
};