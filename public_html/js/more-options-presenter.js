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
    onSwipeLeftPage: function(e) {
        startPresenter.setNewGame(true);
        navigator.onSwipeLeftPage(e);
    }
};