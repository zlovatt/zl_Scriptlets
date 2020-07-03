/**
 * Reverses the selected shape group order in a shape layer
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.2.1
 */
(function reverseShapeGroupOrder() {
  if (!(comp && comp instanceof CompItem)) {
    return;
  }

  var layers = comp.selectedLayers;

  if (layers.length === 0) {
    alert("Select shape layer(s)!");
    return;
  }

  var jj;

  app.beginUndoGroup("Reverse Shape Group Order");

  for (var ii = 0, il = layers.length; i < il; i++) {
    var layer = layers[ii];

    if (!(layer instanceof ShapeLayer)) {
      continue;
    }

    var vecGroup = layer.property("ADBE Root Vectors Group");
    var numGroups = vecGroup.numProperties;

    var shapeArrayByName = [];

    for (jj = 1; jj <= numGroups; jj++) {
      shapeArrayByName.push(vecGroup(jj).name);
    }

    for (jj = numGroups - 1; jj > 0; jj--) {
      vecGroup.property(shapeArrayByName[jj]).moveTo(numGroups - i);
    }
  }

  app.endUndoGroup();
})();
