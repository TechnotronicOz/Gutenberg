define([
  'chaplin',
  'views/base/view',
  'text!templates/videoEdit.hbs'
], function(Chaplin, View, template){
  'use strict';

  var view = View.extend({
    template  : template,
    events    : {
      'click .save' : 'saveModel'
    },
    attributes : {
      'id' : 'video-edit-modal'
    }
  });


  view.prototype.render = function(){
    Chaplin.View.prototype.render.apply(this, arguments);

    // Not sure why this needs a timeout, but it would be nice if this went in
    // some kind of post render method...
    setTimeout(function(){
      $('#video-edit-modal').modal();
      $('#video-edit-modal').on('hidden.bs.modal', function(){
        $('#video-edit-modal').remove();
      });
    });
  };


  view.prototype.saveModel = function(){
    var inputVal = $(this.el).find('input#title').val();
    this.model.set('url', inputVal);
    this.model.save();
  };


  return view;
});