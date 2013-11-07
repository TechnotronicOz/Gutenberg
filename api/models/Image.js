/**
 * Image
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

var magik = require('gm');
var fs    = require('fs');

module.exports = {

  attributes: {
    url : {
      type      : 'STRING',
      defaultsTo: ''
    },
    name : {
      type      : 'STRING',
      defaultsTo: '0'
    },
    story_id : {
      type      : 'STRING',
      defaultsTo: '0'
    },
    order : {
      type      : 'STRING',
      defaultsTo: '0'
    }
  },

  beforeDestroy : function(props, next){
    // Delete the image reference when deleting the model
    Image.findOne({ id: props.where.id }).exec(function(err, model){
      var imagePath = process.cwd() + '/assets' + model.url;

      fs.unlink(imagePath, function (err) {
        if (err) console.log(err);
        else console.log('successfully deleted file');
      });

      next();
    });
  },

  beforeUpdate : function(props, next){

    var cropImage = function(originalFile, storyId, imageId, opts){

      var originalFile = 'assets' + originalFile;
      magik(originalFile).identify(function(err, properties){

        // Setup some filepaths
        var croppedDir    = 'assets/uploads/' + storyId + '/crops';
        var fileExtension = properties.format.toLowerCase();
        var newFilePath   = croppedDir + '/' + imageId + '-' + opts.domId + '.' + fileExtension;

        // Create a directory for the cropped images to live
        fs.mkdir(croppedDir, function(error){
          if(error) console.log(error);

          var width  = opts.width || opts.coords.w;
          var height = opts.height || opts.coords.h;
          var coords = opts.coords

          // Crop and resize the image
          magik(originalFile).crop(coords.w, coords.h, coords.x, coords.y)
          .resize(width, height)
          .write(newFilePath, function(err){
            if(err) console.log(err);
          });
        });
      });
    };

    // Loop over croppable items and crop if necessary
    var croppableItems = props.croppableItems;
    for(var i=0; i<croppableItems.length; i++){
      if(croppableItems[i].coords){
        cropImage(props.url, props.story_id, props.id, croppableItems[i]);
      }
    }

    next();
  }
};