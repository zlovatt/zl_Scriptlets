/**
 * Sorts selected layers based on their in points, ascending.
 *
 * Modifiers:
 *  - Hold SHIFT to sort descending.
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function sortLayersByTime() {
  var DESCENDING = ScriptUI.environment.keyboardState.shiftKey;

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

  app.beginUndoGroup("Sort Layers By In Point");

  layers.sort(function (layerA, layerB) {
    if (layerA.inPoint < layerB.inPoint) {
      DESCENDING ? layerA.moveBefore(layerB) : layerA.moveAfter(layerB);
      return -1;
    } else if (layerA.inPoint > layerB.inPoint) {
      DESCENDING ? layerA.moveAfter(layerB) : layerA.moveBefore(layerB);
      return 1;
    }

    return 0;
  });

  app.endUndoGroup();
})();
