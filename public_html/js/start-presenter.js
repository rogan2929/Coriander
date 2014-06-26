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
        eventBus.installHandler('startPresenter.onTapButtonTile', startPresenter.onTapButtonTile, '.button-tile', 'tap');
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
    onTapTileRate: function(e) {
        startView.flipTile(e.currentTarget);

        if (window.device) {
            // Determine the platform, so user can be directed to either Google Play or App Store.
            switch (window.device.platform) {
                case 'Android':
                    window.open('https://play.google.com/store/apps/details?id=com.coriander', '_system');
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

        page = ($(e.currentTarget).attr('id')).substr(5);

        startView.flipTile(e.currentTarget);

        setTimeout(function() {
            startView.navigateTo(page);
        }, 1050);
    }
};