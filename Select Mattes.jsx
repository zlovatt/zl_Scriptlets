/**
 * Selects all layers that are track mattes in the current comp.
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.1
 */
(function selectMattes() {
  if (parseFloat(app.version) < 23.0) {
    alert("This script requires AE 23.0 or newer to run!");
    return;
  }

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Please select a composition!");
    return;
  }

  var layers = comp.layers;

  if (layers.length == 0) {
    return;
  }

  app.beginUndoGroup("Select Matte Layers");

  try {
    app.executeCommand(2004); // Deselect all

    for (var ii = 1, il = layers.length; ii <= il; ii++) {
      var layer = layers[ii];
      layer.selected = layer.isTrackMatte == true;
    }
  } catch (e) {
    alert(e);
  } finally {
    app.endUndoGroup();
  }
})();
