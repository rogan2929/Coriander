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
    newGame: true,
    tapTimeout: null,

    /**
     * Entry point.
     */
    init: function() {
        var gameState;

        // Load previous gamestate, if there is one.
        gameState = model.getGameState();

        if (gameState) {
            gamePresenter.setGameState(gameState);
            startPresenter.newGame = false;
        }
        else {
            startPresenter.newGame = true;
        }

        startView.configureButtonTiles();
        startView.toggleButtonResume(!startPresenter.newGame);
        eventBus.installHandler('startPresenter.onTapButtonTile', startPresenter.onTapButtonTile, '#start .button-tile', 'tap');
        eventBus.installHandler('startPresenter.onTapTileRate', startPresenter.onTapTileRate, '#tile-rate', 'tap');
    },
    /**
     * Getter for newGame.
     * @returns {Boolean}
     */
    getNewGame: function() {
        return startPresenter.newGame;
    },
    /**
     * Setter for newGame
     * @param {type} newGame
     */
    setNewGame: function(newGame) {
        startPresenter.newGame = newGame;
    },
    /**
     * Timeout function.
     */
    tapTimeoutFunction: function() {
        clearTimeout(startPresenter.tapTimeout);
        startPresenter.tapTimeout = null;
    },
    onTapTileRate: function(e) {
        //startView.flipTile(e.currentTarget);

        if (window.device) {
            // Determine the platform, so user can be directed to either Google Play or App Store.
            switch (window.device.platform) {
                case 'Android':
                    window.plugins.ChildBrowser.showWebPage('https://play.google.com/store/apps/details?id=com.coriander', {showLocationBar: true});
                    break;
                case 'iPhone':
                    alert('Not yet.');
                    break;
            }
        }
        else {
            console.log('Unknown platform, so there is nothing to rate.');
        }
    },
    onTapButtonTile: function(e) {
        var page;

        if (startPresenter.tapTimeout === null) {
            // Implement some throttling on tile tapping. This prevents glitches during animations.
            startPresenter.tapTimeout = setTimeout(startPresenter.tapTimeoutFunction, constants.TAP_TIMEOUT);

            startView.flipTile(e.currentTarget);

            page = ($(e.currentTarget).attr('id')).substr(5);

            setTimeout(function() {
                navigation.navigateTo(page);
            }, constants.PAGE_CHANGE_TIMEOUT);
        }
    }
};