/**
 * Quickly batch renames selected layers, adding an incrementer to layer name
 *
 * Change 'delimiter' from "-" to "_" to change the symbol between name & number
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.1.0
 */
(function quickRenameLayers() {
  var delimiter = "-";
  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    return;
  }

  var layers = comp.selectedLayers;

  if (layers.length === 0) {
    return;
  }

  var newLayerName = prompt("Enter a new layer name", "Cool Layer");

  if (!newLayerName || newLayerName == "") {
    return;
  }

  app.beginUndoGroup("Quick Rename Layers");

  for (var ii = 0; ii < layers.length; ii++) {
    var layer = layers[ii];
    layer.name = newLayerName + delimiter + (ii + 1);
  }

  app.endUndoGroup();
})();
