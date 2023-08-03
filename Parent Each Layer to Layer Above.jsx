/**
 * Parents each selected layer to the layer above it.
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.2.2
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

    var parentIndex = layer.index - 1;

    if (parentIndex < 1) {
      continue;
    }

    layer.parent = comp.layer(parentIndex);
  }

  app.endUndoGroup();
})();
