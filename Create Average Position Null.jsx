/**
 * Creates a null positioned at the average position of all selected layers,
 * and parent all layers to it.
 *
 * Modifiers:
 *  - Hold SHIFT to NOT parent the layers to the null
 *  - Hold CTRL / CMD to add an expression that keeps the null centered between those layers
 *     (Note: this disables parenting)
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.6.0
 */
(function setToAvgPosition() {
  var keepLayersOrphans = ScriptUI.environment.keyboardState.shiftKey;
  var useDynamicPosition = false;

  if (ScriptUI.environment.keyboardState.ctrlKey || ScriptUI.environment.keyboardState.metaKey) {
    useDynamicPosition = true;
    keepLayersOrphans = true;
  }

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

  var ii, il;

  if (useDynamicPosition) {
    var firstLayerIndex = layers[0].index;
    var lastLayerIndex = layers[layers.length - 1].index;

    avgNull.position.expression = [
      "var firstLayerIndex = " + firstLayerIndex + ";",
      "var lastLayerIndex = " + lastLayerIndex + ";",
      "",
      "var sum = [0, 0];",
      "var numLayers = lastLayerIndex - firstLayerIndex + 1;",
      "",
      "for (var ii = firstLayerIndex; ii <= lastLayerIndex; ii++) {",
      "  var layer = thisComp.layer(ii);",
      "  sum += layer.position;",
      "}",
      "",
      "sum / numLayers;"
    ].join("\n");
  } else {
    var sumX = 0;
    var sumY = 0;

    for (ii = 0, il = layers.length; ii < il; ii++) {
      var layer = layers[ii];
      var layerPos = layer.position.valueAtTime(comp.time, false);
      sumX += layerPos[0];
      sumY += layerPos[1];
    }

    var avgX = sumX / layers.length;
    var avgY = sumY / layers.length;

    avgNull.position.setValue([avgX, avgY]);
  }

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

    return layers;
  }
})();
