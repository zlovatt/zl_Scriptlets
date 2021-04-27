/**
 * Uses Time Remap to stretch layers, prompting user to enter speed.
 * Also lengthens comp to fit, if necessary.
 *
 * Modifiers:
 *  - Hold CTRL/CMD for HALF SPEED
 *  - Hold SHIFT for DOUBLE SPEED
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.2.0
 */
(function stretchLayer() {
  /**
   * Time Stretches a specified layer at given speed
   *
   * @param {Layer} layer  Layer to stretch
   * @param {number} speed Playback Speed
   */
  function timeStretchLayer(layer, speed) {
    if (!(layer instanceof AVLayer && layer.canSetTimeRemapEnabled)) {
      alert(layer.name + " can not be stretched!");
      return;
    }

    // Enable time remap
    layer.timeRemapEnabled = true;
    var remap = layer.timeRemap;

    // Add new keyframe at stretched time
    var lastKeyTime = remap.keyTime(2);
    var lastKeyValue = remap.keyValue(2);

    var newKeyTime = lastKeyTime * (1 / speed);
    var newKeyIndex = remap.addKey(newKeyTime);
    remap.setValueAtKey(newKeyIndex, lastKeyValue);

    // Remove old key, if one was created
    if (remap.numKeys > 2) {
      var oldKeyIndex = remap.nearestKeyIndex(lastKeyTime);
      remap.removeKey(oldKeyIndex);
    }

    layer.outPoint = newKeyTime;
  }

  /**
   * Gets playback speed value
   *
   * @returns {number} User speed number
   */
  function getSpeed() {
    var speed = 1;

    if (
      ScriptUI.environment.keyboardState.ctrlKey ||
      ScriptUI.environment.keyboardState.metaKey
    ) {
      // If ctrl, speed = half speed
      speed = 0.5;
    } else if (ScriptUI.environment.keyboardState.shiftKey) {
      // If shift, speed = double speed
      speed = 2;
    } else {
      var speedInput = prompt(
        "Enter speed (0.5 = half speed, 2 = double, 3 = 3x, etc)",
        speed.toString(),
        "Time Stretch Speed"
      );

      speed = parseFloat(speedInput);

      if (isNaN(speed)) {
        throw new Error("Enter a valid number!");
      }
    }

    return speed;
  }

  app.beginUndoGroup("Loop Selected Layers");

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

  try {
    var speed = getSpeed();
    var maxLength = comp.duration;

    for (var ii = 0, il = layers.length; ii < il; ii++) {
      var layer = layers[ii];
      timeStretchLayer(layer, speed);
      maxLength = Math.max(maxLength, layer.outPoint);
    }

    comp.duration = maxLength;
  } catch (e) {
    alert(e);
  } finally {
    app.endUndoGroup();
  }
})();
