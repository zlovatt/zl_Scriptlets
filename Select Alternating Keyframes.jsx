/**
 * Selects every other keyframe on a given property.
 *
 * Hold SHIFT to offset start counter (select evens, not odds)
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function selectAlternatingKeyframes() {
  var offset = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Please select a composition!", "Select Alternating Keyframes");
    return;
  }

  var props = comp.selectedProperties;

  if (props.length === 0) {
    alert("Please select some properties!", "Select Alternating Keyframes");
    return;
  }

  app.beginUndoGroup("Select Alternating Keyframes");

  for (var ii = 0, il = props.length; ii < il; ii++) {
    var prop = props[ii];

    if (!prop.canSetExpression) {
      continue;
    }

    var jj, jl;

    // Deselect all keyframes
    for (jj = 1, jl = prop.numKeys; jj <= jl; jj++) {
      prop.setSelectedAtKey(jj, false);
    }

    // Select alternating pattern
    for (jj = 0, jl = prop.numKeys; jj < jl; jj = jj + 2) {
      var keyIndex = jj + 1 + offset;

      if (keyIndex > prop.numKeys) {
        continue;
      }

      prop.setSelectedAtKey(keyIndex, true);
    }
  }

  app.endUndoGroup();
})();
