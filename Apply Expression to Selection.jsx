/**
 * Prompts user for an expression, and applies it to selected properties
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.2.0
 */
(function applyExpressionToSelection() {
  var DEFAULT_EXPRESSION = "loopIn() + loopOut() - value;";
  _getUserExpression(DEFAULT_EXPRESSION);

  /**
   * Applies an expression to selected prop(s)
   *
   * @param {string} expression        Expression to apply
   */
  function applyExpression(expression) {
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

    if (!expression || expression == "") {
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

        prop.expression = expression;
      }
    } catch (e) {
      alert(e);
    } finally {
      app.endUndoGroup();
    }
  }

  function _getUserExpression(defaultExpression) {
    var win = new Window("palette", "Apply Expression to Selection", undefined, {
      resizeable: true
    });
    win.alignChildren = "fill";

    win.add("statictext", undefined, "Expression to apply:");

    var editText = win.add("edittext", undefined, defaultExpression, {
      multiline: true
    });
    editText.characters = 50;
    editText.size = [500, 200];
    editText.alignment = "fill";

    var btnOk = win.add("button", undefined, "Apply");
    btnOk.onClick = function () {
      var userExpression = editText.text;

      if (userExpression == "") {
        alert("No expression to apply!");
        return;
      }

      win.close();
      applyExpression(userExpression);
    };
    btnOk.alignment = "right";

    win.show();
  }
})();
