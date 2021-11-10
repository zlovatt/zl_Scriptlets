/**
 * Selects the last layer in your comp, deselecting the rest.
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.1.0
 */
(function selectLastLayer() {
  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Please select a composition!");
    return;
  }

  if (comp.numLayers == 0) {
    return;
  }

  app.beginUndoGroup("Select Last Layer");

  try {
    // Deselect all
    for (var ii = 0, il = comp.selectedLayers.length; ii < il; ii++) {
      comp.selectedLayers[0].selected = false;
    }

    // Select last
    var lastLayer = comp.layer(comp.numLayers);
    lastLayer.selected = true;
  } catch (e) {
    alert(e, "Select Last Layer Error");
  } finally {
    app.endUndoGroup();
  }
})();
