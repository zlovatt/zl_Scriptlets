/**
 * Toggles on/off all effects on layers in the project
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function toggleAllLayerEffects() {
  var effectsOn = false;

  if (confirm("Turn effects ON ('Yes') or OFF ('No')?")) {
    effectsOn = true;
  }

  app.beginUndoGroup("Toggle All Layer Effects");

  try {
    var items = app.project.items;

    for (var ii = 1, il = items.length; ii <= il; ii++) {
      var item = items[ii];

      if (!(item instanceof CompItem)) {
        continue;
      }

      toggleCompLayerEffects(item, effectsOn);
    }
  } catch (e) {
    alert(e, "Toggle All Layer Effects");
  } finally {
    app.endUndoGroup();
  }

  /**
   * Toggles layer effects on/off for all layers in given comp
   *
   * @param {CompItem} comp     Comp to toggle effects in
   * @param {boolean} effectsOn Whether to turn the effects on or off
   */
  function toggleCompLayerEffects(comp, effectsOn) {
    for (var ii = 1, il = comp.numLayers; ii <= il; ii++) {
      var layer = comp.layer(ii);

      if (!(layer instanceof AVLayer)) {
        continue;
      }

      layer.effectsActive = effectsOn;
    }
  }
})();
