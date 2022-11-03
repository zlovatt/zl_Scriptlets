/**
 * Enables temporal continuous status on selected keyframes
 *
 * Modifiers:
 *  - Hold SHIFT to DISABLE temporal continuous
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.2.1
 */
(function toggleTemporalContinuous() {
  var enable = !ScriptUI.environment.keyboardState.shiftKey;

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Please select a composition!");
    return;
  }

  var layers = comp.selectedLayers;

  app.beginUndoGroup('Toggle Temporal Continuous');

  for (var ii = 0, il = layers.length; ii < il; ii++) {
    var layer = layers[ii];
    var props = layer.selectedProperties;

    for (var jj = 0, jl = props.length; jj < jl; jj++) {
      var prop = props[jj];
      var keys = prop.selectedKeys;

      for (var kk = 0, kl = keys.length; kk < kl; kk++) {
        var selectedKeyIndex = keys[kk];
        prop.setTemporalContinuousAtKey(selectedKeyIndex, enable);
      }
    }
  }

  app.endUndoGroup();
})();
