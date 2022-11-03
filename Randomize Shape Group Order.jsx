/**
 * Randomly sort the selected shape groups in a shape layer
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.2.1
 */
(function randomizeShapeGroupOrder() {
  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert('Open a comp!');
    return;
  }

  var layers = comp.selectedLayers;

  if (layers.length === 0) {
    alert('Select a shape layer!');
    return;
  }

  var ii;

  app.beginUndoGroup('Randomize Shape Group Order');

  for (ii = 0; ii < layers.length; ii++) {
    var layer = layers[ii];

    if (!(layer instanceof ShapeLayer)) {
      alert('Select a shape layer!');
      continue;
    }

    var vecGroup = layer.selectedProperties;
    var numGroups = vecGroup.length;

    var myIndexArray = [];
    for (ii = 0; ii < numGroups; ii++) {
      myIndexArray[ii] = vecGroup[ii].propertyIndex;
    }

    var idx;
    var temp;
    for (ii = 0; ii < numGroups; ii++) {
      idx = ii + Math.floor(Math.random() * (myIndexArray.length - ii));
      temp = myIndexArray[ii];
      myIndexArray[ii] = myIndexArray[idx];
      myIndexArray[idx] = temp;
    }

    var shapeArrayByName = [];
    for (ii = 0; ii < numGroups; ii++) {
      shapeArrayByName.push(vecGroup[ii].name);
    }

    for (ii = 0; ii < numGroups; ii++) {
      var theseProps = layer.property('ADBE Root Vectors Group');
      theseProps.property(shapeArrayByName[ii]).moveTo(myIndexArray[ii]);
    }
  }

  app.endUndoGroup();
})();
