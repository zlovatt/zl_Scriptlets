/**
 * Creates a null positioned at the average position of all selected layers.
 *
 * Modifiers:
 *  - Hold SHIFT to set to a fixed average at current time, vs dynamic expression
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.5.0
 */
(function setToAvgPosition() {
  var useFixed = ScriptUI.environment.keyboardState.shiftKey;
  var parentLayers = ScriptUI.environment.keyboardState.altKey;

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Please select a composition!");
    return;
  }

  var layers = comp.selectedLayers;

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

  if (useFixed) {
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
  } else {
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
  }

  if (parentLayers) {
    for (ii = 0, il = layers.length; ii < il; ii++) {
      layer[ii].parent = avgNull;
    }
  }

  app.endUndoGroup();
})();
