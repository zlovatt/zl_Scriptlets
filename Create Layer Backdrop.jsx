/**
 * Creates a backdrop rect for all selected layers
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function createLayerBackdrop() {
  var BOX_SUFFIX = "Backdrop";
  var BOX_COLOUR = [1, 0, 0, 1];

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Open a comp!");
    return;
  }

  var layers = comp.selectedLayers;

  app.beginUndoGroup("Create Layer Backdrop");

  try {
    for (var ii = 0, il = layers.length; ii < il; ii++) {
      var layer = layers[ii];

      if (!_isValidLayer(layer)) {
        continue;
      }

      var layerPos = layer.position.valueAtTime(comp.time, false);
      var layerAnchor = layer.anchorPoint.valueAtTime(comp.time, false);
      var layerScale = layer.scale.valueAtTime(comp.time, false);
      var rect = layer.sourceRectAtTime(comp.time, true);

      var anchorInPixels = [(layerAnchor[0] * layerScale[0]) / 100, (layerAnchor[1] * layerScale[1]) / 100];
      var sizeInPixels = [(rect.width * layerScale[0]) / 100, (rect.height * layerScale[1]) / 100];
      var topInPixels = (rect.top * layerScale[0]) / 100;
      var leftInPixels = (rect.left * layerScale[1]) / 100;

      var layerBox = comp.layers.addShape();
      layerBox.name = layer.name + " " + BOX_SUFFIX;

      var contents = layerBox.property("ADBE Root Vectors Group");
      if (!(contents instanceof PropertyGroup)) {
        continue;
      }

      // Create box, set size
      var boxRect = contents.addProperty("ADBE Vector Shape - Rect");
      var boxRectSize = boxRect.property("ADBE Vector Rect Size");
      if (!(boxRectSize instanceof Property)) {
        continue;
      }

      boxRectSize.setValue(sizeInPixels);

      // Add fill, set colour
      var fill = contents.addProperty("ADBE Vector Graphic - Fill");
      var fillColour = fill.property("ADBE Vector Fill Color");
      if (!(fillColour instanceof Property)) {
        continue;
      }

      fillColour.setValue(BOX_COLOUR);

      // Set position & index
      layerBox.position.setValue([
        layerPos[0] - anchorInPixels[0] + leftInPixels + sizeInPixels[0] / 2,
        layerPos[1] - anchorInPixels[1] + topInPixels + sizeInPixels[1] / 2
      ]);
      layerBox.moveAfter(layer);
    }
  } catch (e) {
    alert(e, "Create Layer Backdrop");
  } finally {
    app.endUndoGroup();
  }

  /**
   * Checks whether layer is valid AVLayer or child
   *
   * @param {Layer} layer
   * @return {layer is AVLayer | ShapeLayer | TextLayer}
   */
  function _isValidLayer(layer) {
    return layer instanceof AVLayer || layer instanceof ShapeLayer || layer instanceof TextLayer;
  }
})();
