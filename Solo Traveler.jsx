/**
 * Turns all guide layers into non-guide layers, in selected comps in project panel.
 *
 * Will recurse into precomps.
 *
 * Modifiers:
 *  - Hold SHIFT to only scan selected comps (ignoring precomps)
 *  - Hold CTRL to skip locked layers
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function soloTraveler() {
  var SKIP_LOCKED_LAYERS = ScriptUI.environment.keyboardState.shiftKey;
  var SKIP_PRECOMPS = ScriptUI.environment.keyboardState.ctrlKey;

  var items = app.project.selection;

  if (items.length === 0) {
    var comp = app.project.activeItem;

    if (!(comp && comp instanceof CompItem)) {
      alert("Open a comp!");
      return;
    }

    items = [comp];
  }

  var totalUnguided = 0;
  var ids = [];

  app.beginUndoGroup("Solo Traveler");

  try {
    for (var ii = 0, il = items.length; ii < il; ii++) {
      var item = items[ii];
      var id = item.id;

      // Ignore non-comps
      if (!(item instanceof CompItem)) {
        continue;
      }

      // Ignore items we've already touched
      if (_itemWasTouched(id, ids)) {
        continue;
      }

      totalUnguided += unguideLayers(item, ids).length;
      ids.push(id);
    }

    alert("Unguided " + totalUnguided + " layers.");
  } catch (e) {
    alert(e, "Solo Traveler");
  } finally {
    app.endUndoGroup();
  }

  /**
   * Check whether an item exists in an array
   *
   * @param {number} id    Item ID
   * @param {number[]} ids IDs to check
   * @return {boolean}     Whether ID exists
   */
  function _itemWasTouched(id, ids) {
    return ids.join("|").indexOf(id.toString()) > -1;
  }

  /**
   * Counts comp keyframes
   *
   * @param {CompItem} comp Comp to count in
   * @param {number[]} ids  Parsed comp IDs
   * @return {Layer[]}      Unguided layers
   */
  function unguideLayers(comp, ids) {
    var guideLayers = [];

    for (var ii = 1, il = comp.numLayers; ii <= il; ii++) {
      var layer = comp.layer(ii);

      var wasLocked = layer.locked;

      if (SKIP_LOCKED_LAYERS && wasLocked) {
        continue;
      }

      if (layer.source && layer.source instanceof CompItem) {
        if (SKIP_PRECOMPS) {
          continue;
        }

        var src = layer.source;
        var id = src.id;

        if (!_itemWasTouched(id, ids)) {
          guideLayers = guideLayers.concat(unguideLayers(src, ids));
          ids.push(id);
        }
      }

      if (!(layer instanceof AVLayer)) {
        continue;
      }

      if (!layer.guideLayer) {
        continue;
      }

      layer.guideLayer = false;
      layer.locked = wasLocked;

      guideLayers.push(layer);
    }

    return guideLayers;
  }
})();
