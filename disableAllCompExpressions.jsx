(function() {
  /**
   * Recursively loops through all properties and disables found expressions
   *
   * @param {PropertyGroup} propertyGroup Property group to loop through
   */
  function recursiveDisableExpressions(propertyGroup) {
    for (var i = 1; i <= propertyGroup.numProperties; i++) {
      var property = propertyGroup.property(i);

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

  app.beginUndoGroup("Disable All Comp Expressions");

  var comp = app.project.activeItem;

  for (var i = 1; i <= comp.numLayers; i++) {
    var layer = comp.layer(i);

    recursiveDisableExpressions(layer);
  }

  app.endUndoGroup();
})();
