/**
 * Freezes (or unfreezes) selected properties
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.2.0
 */
(function freezeSelectedProperties() {
  var frozenText = "// FROZEN";

  function freezeProp(property) {
    if (!property.canSetExpression) {
      return;
    }

    var expression = property.expression;

    if (expression === "") {
      try {
        property.expression = generateExpression(property);
      } catch (e) {
        throw new Error(
          [
            "Property " + property.name + " not supported!",
            "Screenshot this and send to zack@zacklovatt.com",
            e
          ].join("\n")
        );
      }
    } else {
      if (expression.indexOf(frozenText) > -1) {
        property.expression = "";
      } else {
        // prop has expression; skip!
      }
    }
  }

  /**
   * Freezes a given property
   *
   * @param {Property | Layer | PropertyGroup} property Property to freeze
   */
  function freeze(property) {
    if (skipProperty(property)) {
      return;
    }

    if (property instanceof Property) {
      freezeProp(property);
    } else if (
      property instanceof PropertyGroup ||
      property.matchName.indexOf("Layer") > -1
    ) {
      for (var ii = 1; ii <= property.numProperties; ii++) {
        var prop = property.property(ii);
        freeze(prop);
      }
    }
  }

  /**
   * Check whether to skip a given property
   *
   * @param {Property} property Property to check
   * @returns {boolean}         Whether to skip this prop
   */
  function skipProperty(property) {
    var depth = property.propertyDepth;

    if (depth > 1) {
      var layer = property.propertyGroup(depth);
      var rootGroup = property.propertyGroup(depth - 1);

      switch (rootGroup.matchName) {
        // skip any layer style data if not present
        case "ADBE Layer Styles":
          if (!layer.layerStyle.canSetEnabled) {
            return true;
          }

          // Handle style groups we can't see
          if (property instanceof PropertyGroup && !property.canSetEnabled) {
            return true;
          }
          break;

        // 2d layer? Skip Geometry and Materials groups
        case "ADBE Plane Options Group":
        case "ADBE Material Options Group":
        case "ADBE Extrsn Options Group":
          if (!layer.threeDLayer) {
            return true;
          }
          break;

        // Check audio
        case "ADBE Audio Group":
          if (!layer.hasAudio) {
            return true;
          }
          break;

        default:
          break;
      }
    }

    return false;
  }

  /**
   * Generates freeze expression based on property type
   *
   * @param {Property} property Property to generate expr for
   * @returns {string}          Freeze expression
   */
  function generateExpression(property) {
    var expression = [frozenText, "posterizeTime(0);"];

    switch (property.propertyValueType) {
      case PropertyValueType.ThreeD_SPATIAL:
      case PropertyValueType.ThreeD:
      case PropertyValueType.TwoD_SPATIAL:
      case PropertyValueType.TwoD:
      case PropertyValueType.COLOR:
        expression.push("[" + property.value.toString() + "];");
        break;
      case PropertyValueType.NO_VALUE:
      case PropertyValueType.CUSTOM_VALUE:
      case PropertyValueType.SHAPE:
      case PropertyValueType.TEXT_DOCUMENT:
        var compTime = property.propertyGroup(property.propertyDepth).time;
        expression.push("valueAtTime(" + compTime + ");");
        break;
      case PropertyValueType.OneD:
        expression.push(property.value.toString() + ";");
        break;
    }

    return expression.join("\n");
  }

  /**
   * Gets selected properties, else all comp layers
   *
   * @returns {Property|PropertyGroup[]} Items to freeze
   */
  function getTarget(comp) {
    var props = comp.selectedProperties;

    if (props.length > 0) {
      return props;
    }

    return comp.selectedLayers;
  }

  app.beginUndoGroup("Freeze Selected Properties");

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Open a comp!");
    return;
  }

  var props = getTarget(comp);

  try {
    for (var ii = 0, il = props.length; ii < il; ii++) {
      var prop = props[ii];
      freeze(prop);
    }
  } catch (e) {
    alert(e);
  }

  app.endUndoGroup();
})();
