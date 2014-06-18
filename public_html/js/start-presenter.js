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
     * Entry point.
     */
    init: function() {
        startView.configureButtonTiles();
        startView.toggleButtonResume(!gamePresenter.getNewGame());
        eventBus.installHandler('startPresenter.onTapButtonTile', startPresenter.onTapButtonTile, '.button-tile', 'tap');
    },
    onTapButtonTile: function(e) {
        var page;
        
        page = ($(e.currentTarget).attr('id')).substr(5);

        startView.flipTile(e.currentTarget);
        
        setTimeout(function() {
            startView.navigateTo(page);
        }, 1200);
    }
};