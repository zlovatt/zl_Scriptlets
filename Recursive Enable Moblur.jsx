/**
 * Recursively enables motion blur on layers in selected comps,
 * and all precomps within.
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.2.1
 */
(function recursiveEnableMoblur() {
  /**
   * Enabled motion blur on all layers
   *
   * @param {CompItem} comp Comp to enable moblur in
   */
  function enableMoblur(comp) {
    var layers = comp.layers;

    for (var ii = 1, il = layers.length; ii <= il; ii++) {
      var layer = layers[ii];

      try {
        layer.motionBlur = true;
      } catch (e) {}

      if (layer.source instanceof CompItem) {
        enableMoblur(layer.source);
      }
    }
  }

  /**
   * Enables motion blur in selected comps
   */
  function blurSelectedComps() {
    var items = app.project.items;

    for (var ii = 1; ii <= items.length; ii++) {
      var item = items[ii];

      if (item.selected && item instanceof CompItem) {
        enableMoblur(item);
      }
    }
  }

  app.beginUndoGroup('Recursive Enable Moblur');
  blurSelectedComps();
  app.endUndoGroup();
})();
