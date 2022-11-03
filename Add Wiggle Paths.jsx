/**
 * Adds Wiggle Paths to selected shape layers.
 *
 * Set the values at the top of the script to automatically set those properties
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function addWigglePath() {
  var WIGGLE_SIZE = 2;
  var WIGGLE_DETAIL = 2;
  var WIGGLE_PER_SECOND = 0;

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

  app.beginUndoGroup("Add Wiggle Paths");

  for (var ii = 0, il = layers.length; ii < il; ii++) {
    var layer = layers[ii];

    if (layer.matchName !== "ADBE Vector Layer") {
      continue;
    }

    var contents = layer.property("ADBE Root Vectors Group");

    if (!contents.canAddProperty("ADBE Vector Filter - Roughen")) {
      continue;
    }
    var wigglePath = contents.addProperty("ADBE Vector Filter - Roughen");

    var sizeProp = wigglePath.property("ADBE Vector Roughen Size");
    sizeProp.setValue(WIGGLE_SIZE);

    var detailProp = wigglePath.property("ADBE Vector Roughen Detail");
    detailProp.setValue(WIGGLE_DETAIL);

    var frequencyProp = wigglePath.property("ADBE Vector Temporal Freq");
    frequencyProp.setValue(WIGGLE_PER_SECOND);
  }

  app.endUndoGroup();
})();
