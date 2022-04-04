/**
 * Prompts user for an expression, and applies it to selected properties
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.1.0
 */
(function applyExpressionToSelection () {
  var DEFAULT_EXPRESSION = "loopIn() + loopOut() - value";
  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Open a comp!");
    return;
  }

  var props = comp.selectedProperties;

  if (props.length === 0) {
    alert("Select properties to apply expression to!");
    return;
  }

  var userExpression = prompt("Enter an expression!", DEFAULT_EXPRESSION);

  if (!userExpression) {
    alert("Enter an expression");
    return;
  }

  app.beginUndoGroup("Apply Expression to Selected Properties");

  try {
    for (var ii = 0, il = props.length; ii < il; ii++) {
      var prop = props[ii];

      if (!prop.canSetExpression) {
        continue;
      }

      prop.expression = userExpression;
    }
  } catch (e) {
    alert(e);
  } finally {
    app.endUndoGroup();
  }
})();
