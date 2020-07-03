/**
 * Enables time remapping on selected layers, and adds a loopOut("cycle") to loop the layer.
 *
 * Modifiers:
 *   - Hold CTRL to loop IN instead of loop OUT
 *   - Hold SHIFT to PINGPONG instead of CYCLE
 *   - Hold both to loop IN, with PINGPONG
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.2.1
 */
(function loopSelectedLayers() {
  /**
   * Loops selected layer
   *
   * @param {string} direction Loop type, one of 'loopIn' or 'loopOut'
   * @param {string} method    Loop method, one of 'cycle'/'pingpong'
   */
  function loopSelected(direction, method) {
    var loopExpression = direction + "('" + method + "');";

    var comp = app.project.activeItem;
    var layers = comp.selectedLayers;

    for (var ii = 0, il = layers.length; ii < il; ii++) {
      var curLayer = layers[ii];

      if (curLayer.canSetTimeRemapEnabled !== true) {
        alert(curLayer.name + ' can not be looped!');
        continue;
      }

      // Enable time remap, set it to the expression
      curLayer.timeRemapEnabled = true;
      curLayer.timeRemap.expression = loopExpression;

      // Add new key, remove last key
      curLayer.timeRemap.addKey(
        curLayer.timeRemap.keyTime(2) - comp.frameDuration
      );
      curLayer.timeRemap.removeKey(3);

      curLayer.outPoint = comp.duration;
    }
  }

  var direction = 'loopOut';
  var method = 'cycle';

  // If ctrl, loopIn instead of loopOut.
  if (
    ScriptUI.environment.keyboardState.ctrlKey ||
    ScriptUI.environment.keyboardState.metaKey
  ) {
    direction = 'loopIn';
  }

  // Shift = pingpong
  if (ScriptUI.environment.keyboardState.shiftKey) {
    method = 'pingpong';
  }

  app.beginUndoGroup('Loop Selected Layers');
  loopSelected(direction, method);
  app.endUndoGroup();
})();
