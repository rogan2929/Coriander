/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

window.onerror = function(msg, url, linenumber) {
    alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
    return true;
};

$(document).on('pageshow', '#game', function(e) {
    gamePresenter.init();
});

var eventBus = {
    handlers: {},
    /**
     * Register an event handler.
     * @param {type} name
     * @param {type} handler
     * @param {type} selector
     * @param {type} event
     */
    installHandler: function(name, handler, selector, event) {
        eventBus.handlers[name] = handler;
        $(selector).off(event).bind(event, function(e, args) {
            eventBus.handlers[name].call(eventBus, e, args);
        });
    }
};

/**
 * Model for the application.
 * @type type
 */
var model = {
};

/**
 * Presenter for #game
 * @type type
 */
var gamePresenter = {
    gridSize: 4,
    
    /**
     * Entry point.
     */
    init: function() {
        gameView.loadTiles(gamePresenter.gridSize);
        
        eventBus.installHandler('gamePresenter.onTapTile', gamePresenter.onTapTile, '.tile', 'tap');
    },
    
    onTapTile: function(e) {
        alert('TEST');
    }
};

/**
 * View for #game.
 * @type type
 */
var gameView = {
    /**
     * Loads tiles into the view.
     * @param {type} gridSize
     */
    loadTiles: function(gridSize) {
        var html, i, j, width, tile, value, createdValues;

        width = $('#tile-container').width() / gridSize - 8;

        html = $('#tile-template').html();

        createdValues = [];

        // 5x5 grid.
        for (i = 0; i < gridSize; i++) {
            for (j = 0; j < gridSize; j++) {
                value = Math.ceil((Math.random() * gridSize * gridSize));

                // Create a unique random value for the tile.
                while (createdValues.lastIndexOf(value) !== -1) {
                    value = Math.ceil((Math.random() * gridSize * gridSize));
                }
                
                createdValues.push(value);

                // Create the tile and show it.
                tile = $(html).width(width).height(width).css('line-height', width + 'px').text(value).appendTo('#tile-container');
            }
        }
    }
};