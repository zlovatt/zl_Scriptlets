/**
 * Creates a null positioned at the average position of all selected layers,
 * and parent all layers to it.
 *
 * Modifiers:
 *  - Hold SHIFT to NOT parent the layers to the null
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.7.0
 */
(function setToAvgPosition() {
  var keepLayersOrphans = ScriptUI.environment.keyboardState.shiftKey;

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Please select a composition!");
    return;
  }

  var layers = _getSelectedLayersOrAll(comp);

  if (layers.length < 2) {
    alert("Select at least 2 layers!");
    return;
  }

  app.beginUndoGroup("Set to Average Position");

  var avgNull = comp.layers.addNull();
  avgNull.name = "Average Position Null";
  avgNull.guideLayer = true;
  avgNull.label = 14;
  avgNull.moveBefore(layers[0]);

  var sumX = 0;
  var sumY = 0;

  for (var ii = 0, il = layers.length; ii < il; ii++) {
    var layer = layers[ii];
    var layerPos = layer.position.valueAtTime(comp.time, false);
    sumX += layerPos[0];
    sumY += layerPos[1];
  }

  var avgX = sumX / layers.length;
  var avgY = sumY / layers.length;

  avgNull.position.setValue([avgX, avgY]);

  if (!keepLayersOrphans) {
    for (ii = 0, il = layers.length; ii < il; ii++) {
      layers[ii].parent = avgNull;
    }
  }

  app.endUndoGroup();

  /**
   * Gets the selected layers in a given comp, or all
   *
   * @param {CompItem} comp Comp to get layers from
   * @return {Layer[]}      Layers
   */
  function _getSelectedLayersOrAll(comp) {
    var layers = comp.selectedLayers;

    if (layers.length === 0) {
      for (var ii = 1, il = comp.numLayers; ii <= il; ii++) {
        var layer = comp.layer(ii);
        layers.push(layer);
      }
    }

    layers.sort(function (layerA, layerB) {
      if (layerA.index < layerB.index) {
        return -1;
      } else if (layerA.index > layerB.index) {
        return 1;
      }

      return 0;
    });

    return layers;
  }
})();
