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
        startView.toggleButtonResume(!gamePresenter.getNewGame());
    }
};