/**
 * Removes every guide ruler from every item in the project.
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function removeAllRulers() {
  if (parseFloat(app.version) < 16.1) {
    alert("This script requires AE 16.1 or newer to run!");
    return;
  }

  var items = app.project.items;
  var sum = 0;

  app.beginUndoGroup("Remove All Rulers");

  try {
    for (var ii = 1, il = items.length; ii <= il; ii++) {
      var item = items[ii];
      var numGuides = item.guides.length;

      if (!item.guides || numGuides == 0) {
        continue;
      }

      writeLn("Processing " + item.name + " (" + numGuides + ")");

      while (item.guides.length > 0) {
        item.removeGuide(0);
        sum++;
      }
    }
  } catch (e) {
    alert(e, "Remove All Rulers");
  } finally {
    app.endUndoGroup();
  }

  writeLn("Removed " + sum.toString() + " rulers.");
})();
