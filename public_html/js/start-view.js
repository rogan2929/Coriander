/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * View for #start
 * @type type
 */
var startView = {
    /**
     * Enable/disable the resume button.
     * @param {type} enable
     */
    toggleButtonResume: function(enable) {
        if (enable) {
            $('#button-resume').removeClass('ui-state-disabled');
        }
        else {
            $('#button-resume').addClass('ui-state-disabled');
        }
    }
};