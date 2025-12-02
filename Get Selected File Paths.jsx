/**
 * Gets a copyable text list of selected project item file paths.
 *
 * When the alert is shown, simply `CTRL/CMD + C` to copy its contents to clipboard.
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.2.0
 */
(function getSelectedFilePaths () {
  var items = _getSelectedItemsElseAll();

  try {
    var selectedItemPaths = [];

    for (var ii = 0, il = items.length; ii < il; ii++) {
      var item = items[ii];

      if (!(item instanceof FootageItem)) {
        continue;
      }

      var source = item.mainSource;

      if (!(source instanceof FileSource)) {
        continue;
      }

      selectedItemPaths.push(item.file.fullName);
    }

    if (selectedItemPaths.length === 0) {
      throw "No file paths found!";
    }

    alert(selectedItemPaths.join("\n"), "Get Selected Item Paths");
  } catch (e) {
    alert(e, "Get Selected Item Paths");
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
