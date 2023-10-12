/**
 * Hoists essential properties from selected layers onto to new controller.
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function hoistEssentialProperties() {
  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Open a comp!", "Hoist Essential Properties");
    return;
  }

  var layers = _getSelectedLayersOrAll(comp);
  var validLayers = [];

  for (var ii = 0, il = layers.length; ii < il; ii++) {
    var layer = layers[ii];

    if (_isValidPrecompWithEPs(layer)) {
      validLayers.push(layer);
    }
  }

  if (validLayers.length === 0) {
    alert(
      "Select precomp layer(s) with essential properties!",
      "Hoist Essential Properties"
    );
    return;
  }

  app.beginUndoGroup("Hoist Essential Properties");

  try {
    // Get / create control null
    var controlNull = _getOrCreateController(comp);

    // Hoist EPs from valid layers onto controller
    for (var ii = 0, il = validLayers.length; ii < il; ii++) {
      var layer = validLayers[ii];

      hoistLayerEPs(layer, controlNull);
    }

    // Deselect control layer
    controlNull.selected = false;

    // If no effects were created, kill the controller
    if (controlNull.effect.numProperties == 0) {
      controlNull.source.remove();
    }
  } catch (e) {
    alert(e, "Hoist Essential Properties");
  } finally {
    app.endUndoGroup();
  }

  /**
   * Hoists all valid EP controls from source layer
   * onto destination layer, as expression controls
   *
   * @param {AVLayer} sourceLayer      Layer to pull EPs from
   * @param {AVLayer} destinationLayer Layer to drop EPs onto
   */
  function hoistLayerEPs(sourceLayer, destinationLayer) {
    /** @type {PropertyGroup} */
    var sourceEPs = sourceLayer.essentialProperty;

    for (var ii = 1, il = sourceEPs.numProperties; ii <= il; ii++) {
      var ep = sourceEPs.property(ii);

      if (ep instanceof PropertyGroup) {
        continue;
      }

      // Skip properties that can't be hoisted
      if (!ep.canSetExpression) {
        continue;
      }

      var controlMatchname;
      var epValue = ep.value;

      switch (ep.propertyValueType) {
        case PropertyValueType.COLOR:
          controlMatchname = "ADBE Color Control";
          break;

        case PropertyValueType.LAYER_INDEX:
          controlMatchname = "ADBE Layer Control";
          break;

        case PropertyValueType.OneD:
          controlMatchname = "ADBE Slider Control";

          // Check for angle controller and checkbox controller
          if (ep.unitsText == "degrees") {
            controlMatchname = "ADBE Angle Control";
          } else if (
            ep.hasMin &&
            ep.minValue == 0 &&
            ep.hasMax &&
            ep.maxValue == 1
          ) {
            controlMatchname = "ADBE Checkbox Control";
          }
          break;

        case PropertyValueType.ThreeD:
        case PropertyValueType.ThreeD_SPATIAL:
          controlMatchname = "ADBE Point3D Control";

          // If the prop is root transform, and root layer is 2d, use 2d point
          var source = ep.essentialPropertySource;
          if (source.parentProperty.matchName == "ADBE Transform Group") {
            var sourceLayer = source.propertyGroup(source.propertyDepth);
            if (!sourceLayer.threeDLayer) {
              controlMatchname = "ADBE Point Control";
              epValue.pop();
            }
          }
          break;

        case PropertyValueType.TwoD:
        case PropertyValueType.TwoD_SPATIAL:
          controlMatchname = "ADBE Point Control";
          break;

        case PropertyValueType.CUSTOM_VALUE:
        case PropertyValueType.MARKER:
        case PropertyValueType.MASK_INDEX:
        case PropertyValueType.NO_VALUE:
        case PropertyValueType.SHAPE:
        case PropertyValueType.TEXT_DOCUMENT:
        default:
          controlMatchname = null;
          break;
      }

      if (!controlMatchname) {
        continue;
      }

      $.writeln(ep.name + " - " + controlMatchname);

      // Create the control effect & set value
      var control = destinationLayer.effect.addProperty(controlMatchname);
      control.name = ep.name;
      control.property(1).setValue(epValue);

      // Add an expression to the EP, to link to the new controller
      ep.expression =
        'thisComp.layer("' +
        destinationLayer.name +
        '").effect("' +
        ep.name +
        '")(1)';
    }
  }

  /**
   * Checks whether a layer is a precomp with essential properties
   *
   * @param {Layer} layer Layer to check
   * @return {boolean}    Whether layer has EPs
   */
  function _isValidPrecompWithEPs(layer) {
    if (!(layer instanceof AVLayer)) {
      return false;
    }

    if (!(layer.source instanceof CompItem)) {
      return false;
    }

    if (layer.essentialProperty.numProperties > 0) {
      return true;
    }
  }

  /**
   * Creates controller null, or returns existing
   *
   * @param {CompItem} comp Comp to create controller in
   * @return {AVLayer}      Controller nill
   */
  function _getOrCreateController(comp) {
    var controllerName = "_Controller";

    for (var ii = 1, il = comp.numLayers; ii <= il; ii++) {
      var layer = comp.layer(ii);

      if (layer.name === controllerName && layer instanceof AVLayer) {
        return layer;
      }
    }

    // Create control null
    var controlNull = comp.layers.addNull();
    controlNull.name = controllerName;
    controlNull.guideLayer = true;
    controlNull.label = 14;
    controlNull.enabled = false;
    controlNull.moveToBeginning();

    return controlNull;
  }

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
})();
