/**
 * Selects all keyframes in the work area
 *
 * Modifiers:
 *  - Hold SHIFT to add keys to already-selected keyframes, vs replacing selection
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.2.1
 */
(function selectKeys() {
  var addToSelection = ScriptUI.environment.keyboardState.shiftKey;

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert('Please select a composition!');
    return;
  }

  var targetProps = [];

  var timeRange = {
    start: comp.workAreaStart,
    end: comp.workAreaStart + comp.workAreaDuration,
  };

  forAllSelectedLayersElseAll(comp, function (layer) {
    targetProps = targetProps.concat(getKeyedProp(layer));
  });

  app.beginUndoGroup('Select Keys In Work Area');

  forAllItemsInArray(targetProps, function (prop) {
    if (prop.isSeparationLeader && prop.dimensionsSeparated) {
      return;
    }

    if (!addToSelection) {
      deselectKeys(prop);
    }

    var keyIndexStart = prop.nearestKeyIndex(timeRange.start);
    if (prop.keyTime(keyIndexStart) < timeRange.start) {
      keyIndexStart++;
    }

    var keyIndexEnd = prop.nearestKeyIndex(timeRange.end);
    if (prop.keyTime(keyIndexEnd) > timeRange.end) {
      keyIndexEnd--;
    }

    for (var ii = keyIndexStart; ii <= keyIndexEnd; ii++) {
      prop.setSelectedAtKey(ii, true);
    }
  });

  app.endUndoGroup();

  function getKeyedProp(sourcePropGroup) {
    var arr = [];

    forAllPropsInGroup(sourcePropGroup, function (prop) {
      if (isPropGroup(prop)) {
        arr = arr.concat(getKeyedProp(prop));
      } else if (isKeyed(prop)) {
        arr.push(prop);
      }
    });

    return arr;
  }

  /**
   * Checks whether a property is a prop group
   *
   * @param {PropertyGroup | Property} prop Property to check
   * @returns {boolean}                     Whether prop is a group
   */
  function isPropGroup(prop) {
    return (
      prop.propertyType === PropertyType.INDEXED_GROUP ||
      prop.propertyType === PropertyType.NAMED_GROUP
    );
  }

  /**
   * Checks whether a property has keys
   *
   * @param {Property} prop Property to check
   * @returns {boolean}     Whether property has keys
   */
  function isKeyed(prop) {
    return (
      prop.propertyType === PropertyType.PROPERTY &&
      prop.isTimeVarying &&
      prop.numKeys > 0
    );
  }

  /**
   * Deselects keys on a property
   *
   * @param {Property} prop Property to check
   */
  function deselectKeys(prop) {
    for (var ii = 1, il = prop.numKeys; ii <= il; ii++) {
      prop.setSelectedAtKey(ii, false);
    }
  }

  /**
   * Runs a function on all properties in a group
   *
   * @param {PropertyGroup} propGroup Property group to run callback on
   * @param {function} callback       Callback function
   */
  function forAllPropsInGroup(propGroup, callback) {
    for (var ii = 1, il = propGroup.numProperties; ii <= il; ii++) {
      var thisProp = propGroup.property(ii);
      callback(thisProp);
    }
  }
  /**
   * Runs a function on all selected (or all layers) in a comp
   *
   * @param {CompItem} comp     Comp to run callback on
   * @param {function} callback Callback function
   */
  function forAllSelectedLayersElseAll(comp, callback) {
    if (comp.selectedLayers.length === 0) {
      forAllLayersOfComp(comp, callback);
    } else {
      forAllItemsInArray(comp.selectedLayers, callback);
    }
  }

  /**
   * Runs a function on all items in an array
   *
   * @param {any[]} array       Array to run callback on
   * @param {function} callback Callback function
   */
  function forAllItemsInArray(array, callback) {
    for (var ii = 0, il = array.length; ii < il; ii++) {
      var thisItem = array[ii];
      callback(thisItem);
    }
  }

  /**
   * Runs a function on all layers in an comp
   *
   * @param {CompItem} comp     Comp to run callback on
   * @param {function} callback Callback function
   */
  function forAllLayersOfComp(comp, callback) {
    for (var ii = 1, il = comp.layers.length; ii <= il; ii++) {
      var thisLayer = comp.layers[ii];
      callback(thisLayer);
    }
  }
})();
