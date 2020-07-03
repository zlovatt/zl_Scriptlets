/**
 * Adds a position expression to a layer, averaging the position of other selected layers.
 *
 * The first selected layer is the target, the next two are the layers to average.
 *
 * Modifiers:
 *  - Hold SHIFT to set to a fixed average at current time, vs dynamic expression
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.3.0
 */
(function setToAvgPosition() {
  var useFixed = ScriptUI.environment.keyboardState.shiftKey;

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert('Please select a composition!');
    return;
  }

  var layers = thisComp.selectedLayers;

  if (layers.length < 3) {
    alert('Select 3 layers!');
    return;
  }

  var layer = layers[0];
  var layer1 = layers[1];
  var layer2 = layers[2];

  app.beginUndoGroup('Set to Average Position');

  if (useFixed) {
    var p1 = layer1.position.value;
    var p2 = layer2.position.value;
    var layerAvg = (p1 + p2) / 2;

    layer.position.setValue(layerAvg);
  } else {
    layer.position.expression = [
      'var p1 = thisComp.layer("' + layer1.name + '").transform.position;',
      'var p2 = thisComp.layer("' + layer2.name + '").transform.position;',
      '',
      '(p1 + p2) / 2;',
    ].join('\n');
  }

  app.endUndoGroup();
})();
