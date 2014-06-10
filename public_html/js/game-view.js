/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * View for #game.
 * @type type
 */
var gameView = {
    /**
     * Loads tiles into the view.
     * @param {type} gridSize
     * @param {type} values
     */
    loadTiles: function(gridSize, values) {
        var html, i, j, width, tile, row, col, left, top, vertGuide, horGuide;

        $('#tile-container').empty();

        // - (gridSize * 5 * 2) - 10)
        width = ($(window).width() - 20) / gridSize;

        html = $('#tile-template').html();

        row = 1;
        col = 1;

        //for (i = 0; i < gridSize * gridSize; i += gridSize) {
        for (i = 0; i < 1; i += gridSize) {
            col = 0;
            
            horGuide = $($('#guideline-template').html());
            horGuide.addClass('horizontal').css('left', left).appendTo('#tile-container');

            //for (j = 0; j < gridSize; j++) {
            for (j = 0; j < 1; j++) {

                left = col * width + 10 + 'px';
                top = row * width + 10 + 'px';

                tile = $(html).width(width).height(width).css('line-height', width + 'px').addClass('row' + row).addClass('col' + col).css('left', left).css('top', top).text(values[i + j]);

                $(tile).appendTo('#tile-container');
                
                vertGuide = $($('#guideline-template').html());
                vertGuide.addClass('vertical').css('left', left).appendTo('#tile-container');

                col++;
            }

            row++;
        }
    },
    showMoveCount: function(count) {
        $('#score').text('Moves: ' + count);
    }
};