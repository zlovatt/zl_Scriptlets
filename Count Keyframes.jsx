/**
 * Counts all of the keyframes (including markers) in selected comps,
 * or the open comp if none selected.
 *
 * Will recurse into precomps.
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.1.0
 */
(function countKeyframes () {
  /**
   * Recursively builds an array of child properties
   *
   * @param {PropertyGroup} root Root property group
   * @return {Property[]}        Property array
   */
  function _recursiveGetProperties(root) {
    var props = [];

    for (var ii = 1, il = root.numProperties; ii <= il; ii++) {
      var prop = root.property(ii);

      if (prop instanceof Property) {
        props.push(prop);
      } else if (prop instanceof PropertyGroup) {
        var childProps = _recursiveGetProperties(prop);
        props = props.concat(childProps);
      }
    }

    return props;
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
   * @return {number}       Total keyframe count
   */
  function countKeysStd(comp, ids) {
    var compKeys = 0;

    for (var ii = 1, il = comp.numLayers; ii <= il; ii++) {
      var layer = comp.layer(ii);

      if (layer.source && layer.source instanceof CompItem) {
        var src = layer.source;
        var id = src.id;

        if (!_itemWasTouched(id, ids)) {
          compKeys += countKeysStd(src, ids);
          ids.push(id);
        }
      }

      var properties = _recursiveGetProperties(layer);

      for (var jj = 0, jl = properties.length; jj < jl; jj++) {
        var prop = properties[jj];
        compKeys += prop.numKeys;
      }
    }

    return compKeys;
  }

  var items = app.project.selection;

  if (items.length === 0) {
    var comp = app.project.activeItem;

    if (!(comp && comp instanceof CompItem)) {
      alert("Open a comp!");
      return;
    }

    items = [comp];
  }

  var totalKeys = 0;
  var ids = [];

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

    totalKeys += countKeysStd(item, ids);
    ids.push(id);
  }

  alert("Found " + totalKeys + " keyframes.");
})();
