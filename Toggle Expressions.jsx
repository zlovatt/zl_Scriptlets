/**
 * Enables/disables/toggles expressions in current comp.
 *
 * Operates on selected layers, or all (if none selected)
 * Recurses into precomps
 *
 * Modifiers:
 *  - Hold SHIFT to ENABLE expressions, vs DISABLED
 *  - Hold CTRL/CMD to invert on/off status
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.3.0
 */
(function toggleExpressions() {
  var TOGGLE_MODES = {
    ENABLE: 0,
    DISABLE: 1,
    TOGGLE: 2
  };
  var toggleMode = TOGGLE_MODES.DISABLE;

  if (
    ScriptUI.environment.keyboardState.ctrlKey ||
    ScriptUI.environment.keyboardState.metaKey
  ) {
    toggleMode = TOGGLE_MODES.TOGGLE;
  } else if (ScriptUI.environment.keyboardState.shiftKey) {
    toggleMode = TOGGLE_MODES.ENABLE;
  }

  app.beginUndoGroup("Toggle All Comp Expressions");

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Open a comp!");
    return;
  }

  var layers = _getSelectedLayersOrAll(comp);

  for (var ii = 0, il = layers.length; ii < il; ii++) {
    var layer = layers[ii];

    _recursiveToggleExpressions(layer, toggleMode);
  }

  app.endUndoGroup();

    /**
   * Gets the selected layers in a given comp, or all
   *
   * @param {CompItem} comp Comp to get layers from
   * @return {Layer[]}      Layers
   */
    function _getSelectedLayersOrAll(comp) {
      var layers = comp.selectedLayers;

      if (layers.length === 0) {
        for (var ii = 1, il = comp.numLayers; ii <= il; ii++) {
          var layer = comp.layer(ii);
          layers.push(layer);
        }
      }

      return layers;
    }

  /**
   * Recursively loops through all properties and toggles found expressions
   *
   * @param {PropertyGroup} propertyGroup Property group to loop through
   * @param {number} toggleMode           Whether to enable or disable the expression
   */
  function _recursiveToggleExpressions(propertyGroup, toggleMode) {
    for (var ii = 1; ii <= propertyGroup.numProperties; ii++) {
      var property = propertyGroup.property(ii);

      if (!property.isModified) {
        continue;
      }

      if (property instanceof PropertyGroup) {
        _recursiveToggleExpressions(property, toggleMode);
        continue;
      }

      if (!property.canSetExpression) {
        continue;
      }

      switch (toggleMode) {
        case TOGGLE_MODES.ENABLE:
          property.expressionEnabled = true;
          break;
        case TOGGLE_MODES.DISABLE:
        default:
          property.expressionEnabled = false;
          break;
        case TOGGLE_MODES.TOGGLE:
          property.expressionEnabled = !property.expressionEnabled;
          break;
      }
    }
  }
})();
