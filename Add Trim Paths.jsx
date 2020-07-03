/**
 * Adds Trim Paths to selected shape layers, including a keyframe to start and one to end the animation.
 *
 * Hold SHIFT when running the script to _not_ add keyframes.
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 1.3.0
 */
(function addTrimPaths() {
  var addKeys = !ScriptUI.environment.keyboardState.shiftKey;

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Please select a composition!");
    return;
  }

  var layers = comp.selectedLayers;

  if (layers.length === 0) {
    alert("Please select some layers!");
    return;
  }

  app.beginUndoGroup("Add Trim Paths");

  for (var i = 0, il = layers.length; i < il; i++) {
    var layer = layers[i];

    if (layer.matchName !== "ADBE Vector Layer") {
      continue;
    }

    var contents = layer.property("ADBE Root Vectors Group");

    if (!contents.canAddProperty("ADBE Vector Filter - Trim")) {
      continue;
    }
    var trimProp = contents.addProperty("ADBE Vector Filter - Trim");

    if (!addKeys) {
      continue;
    }

    var trimEnd = trimProp.property("ADBE Vector Trim End");

    var trimTimes = [layer.inPoint, layer.inPoint + 1];
    var trimValues = [0, 100];

    trimEnd.setValuesAtTimes(trimTimes, trimValues);
  }

  app.endUndoGroup();
})();
