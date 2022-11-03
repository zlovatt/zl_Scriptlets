/**
 * Moves first layer of selected comps to end of that comp
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.2.0
 */
(function moveFirstLayerOfSelectedCompsToEnd() {
  var comps = app.project.selection;

  if (comps.length < 1) {
    alert('Select some comps!');
    return;
  }

  app.beginUndoGroup('Move first layer to end of comp');

  for (var ii = 0, il = comps.length; ii < il; ii++) {
    moveCompFirstLayerToEnd(comps[ii]);
  }

  app.endUndoGroup();

  /**
   * Moves first layer of comp to end of comp
   *
   * @param {CompItem} comp Comp to shift layer in
   */
  function moveCompFirstLayerToEnd(comp) {
    if (!(comp && comp instanceof CompItem)) {
      return;
    }

    if (comp.numLayers === 0) {
      return;
    }

    var layer = comp.layer(1);
    moveLayerToEnd(layer);
  }

  /**
   * Moves a given layer to end of comp
   *
   * @param {Layer} layer Layer to move
   */
  function moveLayerToEnd(layer) {
    var comp = layer.containingComp;
    var layerDuration = layer.outPoint - layer.inPoint;

    layer.startTime = comp.duration - layerDuration;
  }
})();
