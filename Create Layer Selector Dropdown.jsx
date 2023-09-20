/**
 * Creates a null with a dropdown menu to select any layer in current comp,
 * toggling its visibility.
 *
 * Also adds dropdown to EGP.
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function createLayerSelectorDropdown() {
  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Open a comp!");
    return;
  }

	var layers = comp.layers;
	var layerNames = [];
	var selectorName = comp.name + " Selector";
	var controllerName = "_Controller";

  app.beginUndoGroup("Toggle All Comp Expressions");

  try {
		// Add expression to all layers, and get their names
    for (var ii = 1, il = layers.length; ii <= il; ii++) {
      var layer = layers[ii];
      layerNames.push(layer.name);

      layer.opacity.expression = [
        "posterizeTime(0);",
        'const menu = thisComp.layer("' + controllerName + '").effect("' + selectorName + '")(1).value;',
        "menu == index - 1 ? value : 0;"
      ].join("\n");
    }

		// Create control null
		var controlNull = comp.layers.addNull();
    controlNull.name = controllerName;
    controlNull.guideLayer = true;
    controlNull.label = 14;
		controlNull.enabled = false;
		controlNull.moveToBeginning();

		// Create the dropdown effect & name it
    var dropdownEffect = controlNull.effect.addProperty("ADBE Dropdown Control");
    var updatedDropdown = dropdownEffect.property(1).setPropertyParameters(layerNames);
		updatedDropdown.propertyGroup(1).name = selectorName;
		updatedDropdown.addToMotionGraphicsTemplate(comp);
  } catch (e) {
    alert(e, "Create Layer Selector Dropdown");
  } finally {
    app.endUndoGroup();
  }
})();
