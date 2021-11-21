/**
 * Delete all keys at current time.
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.2.2
 */
(function deleteKeysAtTime() {
  /**
   * Deletes keys at given time in a comp
   *
   * @param {CompItem} comp Comp to delete keys in
   */
  function deleteKeysAtTime(comp) {
    var userLayers = [];
    var ii;

    if (comp.selectedLayers.length !== 0) {
      for (ii = 0; ii < comp.selectedLayers.length; ii++) {
        userLayers.push(comp.selectedLayers[ii]);
      }
    } else {
      for (ii = 1; ii <= comp.layers.length; ii++) {
        userLayers.push(comp.layers[ii]);
      }
    }

    if (userLayers.length === 0) {
      alert('No layers to delete keys from!');
      return;
    }

    for (ii = 0; ii < userLayers.length; ii++) {
      var layer = userLayers[ii];
      var wasSelected = layer.selected;

      for (var jj = 1; jj <= layer.numProperties; jj++) {
        deleteKeys(comp.time, layer, layer.property(jj).name);
      }

      layer.selected = wasSelected;
    }
  }

  /**
   * Deletes keys with data
   *
   * @param {number} curTime   Current time to delete on
   * @param {Layer} curLayer   Layer or prop group to run through
   * @param {string} propGroup Current prop group / layer
   */
  function deleteKeys(time, layer, propGroup) {
    var thisPropGroup = layer.property(propGroup);
    var numProps;

    try {
      numProps = thisPropGroup.numProperties;
    } catch (err) {}

    if (!numProps) {
      return;
    }

    for (var ii = 1; ii < numProps + 1; ii++) {
      var curProp = thisPropGroup.property(ii);
      if (curProp.numProperties !== undefined) {
        deleteKeys(time, thisPropGroup, curProp.name);
      } else if (curProp.numKeys !== 0) {
        if (curProp.keyTime(curProp.nearestKeyIndex(time)) == time) {
          curProp.removeKey(curProp.nearestKeyIndex(time));
        }
      }
    }
  }

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert('Open a comp!');
    return;
  }

  app.beginUndoGroup('Delete Keys at Time');
  deleteKeysAtTime(comp);
  app.endUndoGroup();
})();
