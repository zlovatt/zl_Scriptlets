/**
 * Selects unparented layers in current comp
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.1.0
 */
(function selectOrphanLayers() {
  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Open a comp!", "Select Orphan Layers");
    return;
  }

  for (var ii = 1, il = comp.numLayers; ii <= il; ii++) {
    var layer = comp.layer(ii);

    // Deselect all layers
    layer.selected = false;

    // Skip locked or parented layers
    if (layer.locked || layer.parent) {
      continue;
    }

    layer.selected = true;
  }
})();
