/**
 * Creates a null positioned at the average position of all selected layers.
 *
 * Modifiers:
 *  - Hold SHIFT to set to a fixed average at current time, vs dynamic expression
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.4.0
 */
(function setToAvgPosition() {
  var useFixed = ScriptUI.environment.keyboardState.shiftKey;

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

  if (useFixed) {
    var sum = [0, 0];

    for (var ii = 0, il = layers.length; ii < il; ii++) {
      var layer = layers[ii];
      sum += layer.position.valueAtTime(comp.time, false);
    }

    var avg = sum / layers.length;

    avgNull.position.setValue(avg);
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
      "sum / numLayers;",
    ].join("\n");
  }

  app.endUndoGroup();
})();
