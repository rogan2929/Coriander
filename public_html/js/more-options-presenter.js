/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * Presenter for #more-options
 * @type type
 */
var moreOptionsPresenter = {
        /**
     * Entry point.
     */
    init: function() {
        var gameMode, maxTileSize;
        
        gameMode = 0;
        maxTileSize = 4;
        
        eventBus.installHandler('moreOptionsPresenter.onTapButtonTile', moreOptionsPresenter.onTapButtonTile, '#more-options .button-tile', 'tap');
        eventBus.installHandler('moreOptionsPresenter.onChangeSliderColorCount', moreOptionsPresenter.onChangeSliderColorCount, '#slider-color-count', 'change');
        
        // Set default game mode to regular and 4 colors.
        moreOptionsView.selectTile($('#more-options .button-tile').first());
        gamePresenter.setGameMode(gameMode);
        gamePresenter.setMaxTileSize(maxTileSize);
        moreOptionsView.setSliderColorCountValue(maxTileSize);
    },
    onChangeSliderColorCount: function(e) {
        gamePresenter.setMaxTileSize(parseInt($(e.currentTarget).val()));;
    },
    onSwipeLeftPage: function(e) {
        // Custom swipeleft handler. Needs to tell gamePresenter that a new game is starting.
        startPresenter.setNewGame(true);
        navigator.onSwipeLeftPage(e);
    },
    onTapButtonTile: function(e) {
        var gameMode;
        
        gameMode = parseInt($(e.currentTarget).attr('data-value'));
        
        gamePresenter.setGameMode(gameMode);
        moreOptionsView.selectTile(e.currentTarget);
    }
};