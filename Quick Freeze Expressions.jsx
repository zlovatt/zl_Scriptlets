/**
 * Adds a simple `posterizeTime(0)` to selected properties' expressions.
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function quickFreezeExpression() {
  var FREEZE_EXPR = "posterizeTime(0);";
  app.beginUndoGroup("Quick Freeze Expression");

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Open a comp!");
    return;
  }

  var props = comp.selectedProperties;

  try {
    for (var ii = 0, il = props.length; ii < il; ii++) {
      var prop = props[ii];

      if (!(prop instanceof Property)) {
        continue;
      }

      if (!prop.canSetExpression) {
        continue;
      }

      if (prop.expression == "") {
        continue;
      }

      var expression = prop.expression;

      if (expression.indexOf(FREEZE_EXPR) > -1) {
        continue;
      }

      prop.expression = FREEZE_EXPR + "\n" + expression;
    }
  } catch (e) {
    alert(e, "Quick Freeze Expression");
  }

  app.endUndoGroup();
})();
