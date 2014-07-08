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
        eventBus.installHandler('newGamePresenter.onTapButtonTile', newGamePresenter.onTapButtonTile, '#new-game .button-tile', 'tap');
        
        // Set default 3x3 grid size.
        newGameView.selectTile($('#new-game .button-tile').first());
        gamePresenter.setGridSize(3);
    },
    onTapButtonTile: function(e) {
        gamePresenter.setGridSize(parseInt($(e.currentTarget).attr('data-value')));
        newGameView.selectTile(e.currentTarget);
    }
};