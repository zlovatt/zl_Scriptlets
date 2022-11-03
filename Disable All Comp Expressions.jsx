/**
 * Disable all expressions in all comps (and precomps)
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.2.0
 */
(function() {
  /**
   * Recursively loops through all properties and disables found expressions
   *
   * @param {PropertyGroup} propertyGroup Property group to loop through
   */
  function recursiveDisableExpressions(propertyGroup) {
    for (var ii = 1; ii <= propertyGroup.numProperties; ii++) {
      var property = propertyGroup.property(ii);

      if (property instanceof PropertyGroup) {
        recursiveDisableExpressions(property);
        continue;
      }

      if (!property.canSetExpression) {
        continue;
      }

      if (property.expressionEnabled === true) {
        property.expressionEnabled = false;
      }
    }
  }

  app.beginUndoGroup('Disable All Comp Expressions');

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert('Open a comp!');
    return;
  }

  for (var ii = 1; ii <= comp.numLayers; ii++) {
    var layer = comp.layer(ii);

    recursiveDisableExpressions(layer);
  }

  app.endUndoGroup();
})();
