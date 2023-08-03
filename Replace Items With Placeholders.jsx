/**
 * Replaces all eligible selected items with placeholders
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.1
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
        clamp(item.width, 4, 30000),
        clamp(item.height, 4, 30000),
        clamp(item.frameRate, 1, 99),
        clamp(item.duration, 0, 10800)
      );
      item.name = oldName;
    }
  } catch (e) {
    alert(e, "Replace Items With Placeholders");
  } finally {
    app.endUndoGroup();
  }

  /**
   * Clamps a value between min and max
   *
   * @param {number} value Number to clamp
   * @param {number} min   Min value
   * @param {number} max   Max value
   */
  function clamp(value, min, max) {
    return Math.max(Math.min(value, max), min);
  }
})();
