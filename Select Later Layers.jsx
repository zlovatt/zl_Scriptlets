/**
 * Selects all layers in your comp that start after the selected layer.
 *
 * Modifiers:
 *  - Hold SHIFT to add keys to already-selected keyframes, vs replacing selection
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.2.2
 */
(function selectLaterLayers() {
  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Please select a composition!");
    return;
  }

  var layers = comp.layers;

  if (layers.length === 0) {
    alert("Select a layer!");
    return;
  }

  app.beginUndoGroup("Select Later Layers");

  var layer = comp.selectedLayers[0];
  layer.selected = false;

  for (var ii = 1; ii <= layers.length; ii++) {
    var curLayer = layers[ii];

    if (curLayer.inPoint > layer.inPoint) {
      curLayer.selected = true;
    }
  }

  app.endUndoGroup();
})();
