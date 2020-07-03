/**
 * Adds a random AE effect to selected layers.
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 1.0.1
 */
(function addRandomEffect() {
  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert('Open a comp!');
    return;
  }

  var layer = comp.selectedLayers[0];

  if (!layer) {
    alert('No layer selected!');
    return;
  }

  var layerEffects = layer.property('ADBE Effect Parade');

  var numEffects = app.effects.length;
  var randomEffectNumber = numEffects * Math.random(0, numEffects - 1);
  var randomEffect = app.effects[Math.floor(randomEffectNumber)];

  app.beginUndoGroup('Add Random Effect');

  if (layerEffects.canAddProperty(randomEffect.matchName)) {
    layerEffects.addProperty(randomEffect.matchName);
  }

  app.endUndoGroup();
})();
