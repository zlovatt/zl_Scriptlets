/**
 * Disables all enabled expressions on selected layers
 * & enables all disabled expressions
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function toggleLayerExpressions () {
  /**
   * Recursively loops through all properties and toggles found expressions
   *
   * @param {PropertyGroup} propertyGroup Property group to loop through
   */
  function recursiveToggleExpressions(propertyGroup) {
    for (var ii = 1; ii <= propertyGroup.numProperties; ii++) {
      var property = propertyGroup.property(ii);

      if (!property.isModified) {
        continue;
      }

      if (property instanceof PropertyGroup) {
        recursiveToggleExpressions(property);
        continue;
      }

      if (!property.canSetExpression) {
        continue;
      }

      property.expressionEnabled = !property.expressionEnabled;
    }
  }

  app.beginUndoGroup("Toggle Selected Layer Expressions");

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Open a comp!");
    return;
  }

  for (var ii = 0; ii < comp.selectedLayers.length; ii++) {
    var layer = comp.selectedLayers[ii];

    recursiveToggleExpressions(layer);
  }

  app.endUndoGroup();
})();
