/**
 * Replaces all eligible selected items with placeholders
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function replaceItemsWithPlaceholders() {
  var items = app.project.selection;

  app.beginUndoGroup("Replace Items With Placeholders");

  try {
    for (var ii = 0, il = items.length; ii < il; ii++) {
      var item = items[ii];

      if (!(item instanceof FootageItem)) {
        continue;
      }

      var oldName = item.name;
      item.replaceWithPlaceholder(
        ii.toString(),
        item.width,
        item.height,
        item.frameRate,
        item.duration
      );
      item.name = oldName;
    }
  } catch (e) {
    alert(e, "Replace Items With Placeholders");
  } finally {
    app.endUndoGroup();
  }
})();
