/**
 * Parents each selected layer to the layer above it.
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.2.1
 */
(function parentEachToAbove() {
  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert('Please select a composition!');
    return;
  }

  app.beginUndoGroup('Parent Selected to Above');

  for (var ii = 0; ii < comp.selectedLayers.length; ii++) {
    var layer = comp.selectedLayers[ii];
    layer.parent = comp.layer(layer.index - 1);
  }

  app.endUndoGroup();
})();
