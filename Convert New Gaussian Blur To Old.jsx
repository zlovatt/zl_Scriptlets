/**
 * Convert the new (CC 2015.3+) Gaussian Blur effect to Gaussian Blur (Legacy).
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 1.0.2
 */
(function convertNewGBlurToOld() {
  function getBlurData(effect) {
    return {
      blurIdx: effect.propertyIndex,
      blurName: effect.name,
      blurVal: effect.property(1).value,
      blurDir: effect.property(2).value,
    };
  }

  function removeOldBlurs(layerEffects, blurDataArray) {
    for (var ii = blurDataArray.length - 1; ii >= 0; ii--) {
      var thisIdx = blurDataArray[ii].blurIdx;
      layerEffects.property(thisIdx).remove();
    }
  }

  function buildNewEffects(layerEffects, blurDataArray) {
    for (var ii = 0, il = blurDataArray.length; ii < il; ii++) {
      var newBlur = layerEffects.addProperty('ADBE Gaussian Blur');
      newBlur.property(1).setValue(blurDataArray[ii].blurVal);
      newBlur.property(2).setValue(blurDataArray[ii].blurDir);
      newBlur.name = blurDataArray[ii].blurName;
      newBlur.moveTo(blurDataArray[ii].blurIdx);
    }
  }

  function iterateThroughEffects(layer) {
    var layerEffects = layer.property('Effects');
    var blurDataArray = [];

    for (var ii = 1, il = layerEffects.numProperties; ii <= il; ii++) {
      var effect = layerEffects(ii);
      if (effect.matchName !== 'ADBE Gaussian Blur 2') {
        continue;
      }

      blurDataArray.push(getBlurData(effect));
    }

    removeOldBlurs(layerEffects, blurDataArray);
    buildNewEffects(layerEffects, blurDataArray);
  }

  function iterateThroughSelectedLayers(layers) {
    for (var ii = 0, il = layers.length; ii < il; ii++) {
      var layer = layers[ii];
      iterateThroughEffects(layer);
    }
  }

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert('Open a comp!');
    return;
  }

  var layers = comp.selectedLayers;

  app.beginUndoGroup('New Blur to Old Blur');
  iterateThroughSelectedLayers(layers);
  app.endUndoGroup();
})();
