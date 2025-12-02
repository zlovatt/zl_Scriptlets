/**
 * Gets a copyable text list of selected project item names.
 *
 * When the alert is shown, simply `CTRL/CMD + C` to copy its contents to clipboard.
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function getSelectedItemNames() {
  var SKIP_FOLDERS = true;

  var items = _getSelectedItemsElseAll();

  try {
    var selectedItemNames = [];

    for (var ii = 0, il = items.length; ii < il; ii++) {
      var item = items[ii];

      if (SKIP_FOLDERS && item instanceof FolderItem) {
        continue;
      }

      selectedItemNames.push(item.name);
    }

    if (selectedItemNames.length === 0) {
      throw "No items found!";
    }

    alert(selectedItemNames.join("\n"), "Get Selected Item Names");
  } catch (e) {
    alert(e, "Get Selected Item Names");
  }

  /**
   * Gets all selected project items, else returns every item
   *
   * @return {Item[]} Project item array
   */
  function _getSelectedItemsElseAll() {
    var items = app.project.selection;

    if (items.length === 0) {
      for (var ii = 1, il = app.project.numItems; ii <= il; ii++) {
        items.push(app.project.item(ii));
      }
    }

    return items;
  }
})();
