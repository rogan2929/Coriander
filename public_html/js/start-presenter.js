/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Presenter for #start
 * @type type
 */
var startPresenter = {
    /**
     * 
     */
    init: function() {
        eventBus.installHandler('newGamePresenter.onTapButtonReady', startPresenter.onTapButtonReady, '#button-ready', 'tap');
        startView.toggleButtonResume(!gamePresenter.newGame);
    },
    onTapButtonReady: function(e) {
        gamePresenter.newGame = true;
    }
};