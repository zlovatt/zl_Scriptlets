/**
 * Adds a scene blink controller & blinks selected layers.
 *
 * Modifiers:
 *  - Hold SHIFT to reverse the blink expression on given layers.
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function blinkSelectedLayers() {
  var BLINK_CONTROLLER_NAME = "Blink Controller";
  var BLINK_EFFECT_NAME = "Blink";
  var invertBlink = ScriptUI.environment.keyboardState.shiftKey;

  /**
   * Gets or creates a blink controller in a given comp
   *
   * @param {CompItem} comp Comp to add controller to
   * @returns {Layer}       Control layer
   */
  function getOrCreateBlinkController(comp) {
    // Get existing layer, if present
    for (var ii = 1, il = comp.numLayers; ii <= il; ii++) {
      var layer = comp.layer(ii);
      if (layer.name === BLINK_CONTROLLER_NAME) {
        return layer;
      }
    }

    // It doesn't exist, so create the null & add effect
    var blinkController = comp.layers.addNull();
    blinkController.name = BLINK_CONTROLLER_NAME;

    var effects = blinkController.effect;
    var blinkEffect = effects.addProperty("ADBE Checkbox Control");
    blinkEffect.name = BLINK_EFFECT_NAME;

    return blinkController;
  }

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

  app.beginUndoGroup("Blink Selected Layers");

  getOrCreateBlinkController(comp);

  for (var ii = 0, il = layers.length; ii < il; ii++) {
    var layer = layers[ii];

    var opacity = layer.opacity;
    opacity.expression = [
      'var blink = thisComp.layer("' + BLINK_CONTROLLER_NAME + '").effect("' + BLINK_EFFECT_NAME + '")("Checkbox");',
      invertBlink ? "blink == 0 ? 100 : 0" : "blink == 1 ? 100 : 0"
    ].join("\n");
  }

  app.endUndoGroup();
})();
