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
     * Entry point.
     */
    init: function() {
        eventBus.installHandler('newGamePresenter.onTapButtonStart', newGamePresenter.onTapButtonStart, '#button-start', 'tap');
        eventBus.installHandler('newGamePresenter.onChangeGridRadio', newGamePresenter.onChangeGridRadio, '.grid-radio', 'change');
    },
    
    onChangeGridRadio: function(e) {
        gamePresenter.setGridSize(parseInt($(e.currentTarget).attr('value')));
    },
    onTapButtonStart: function(e) {
        startPresenter.setNewGame(true);
    }
};