/**
 * Flattens all child items in selected folder(s), moving every item into the selected folder.
 *
 * If nothing is selected, flattens every item into the project root.
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function flattenFolder() {
  var selection = app.project.selection;

  // If nothing's selected, flatten the whole project
  if (selection.length == 0) {
    selection = [app.project.rootFolder];
  }

  try {
    app.beginUndoGroup("Create Layer Backdrop");

    _assertNoNestedSelections(selection);

    for (var ii = 0, il = selection.length; ii < il; ii++) {
      var selectedItem = selection[ii];

      if (!(selectedItem instanceof FolderItem)) {
        continue;
      }

      _flattenFolder(selectedItem, selectedItem);
    }
  } catch (e) {
    alert(e, "Flatten Folder");
  } finally {
    app.endUndoGroup();
  }

  /**
   * Checks whether any selected items are a parent of another selected item
   *
   * This is useful for ensuring valid selections, so we don't double-unnest something.
   *
   * @param {Item[]} items
   */
  function _assertNoNestedSelections(items) {
    var itemFlattenMap = {};

    for (var ii = 0, il = items.length; ii < il; ii++) {
      var item = items[ii];

      if (!(item instanceof FolderItem)) {
        continue;
      }

      var tempItem = item;

      while (tempItem.parentFolder !== null) {
        var itemID = tempItem.id;

        if (itemFlattenMap.hasOwnProperty(itemID.toString()) && itemFlattenMap[itemID] == true) {
          throw new Error("Can't flatten selection, as some items contain each other!");
        }

        itemFlattenMap[itemID] = false;
        tempItem = tempItem.parentFolder;
      }

      itemFlattenMap[item.id] = true;
    }
  }

  /**
   * Recursively flatten all items in a given folder
   *
   * @param {FolderItem} folder     Current folder to look at
   * @param {FolderItem} rootFolder Root folder to move items to
   */
  function _flattenFolder(folder, rootFolder) {
    var folderItems = folder.items;

    for (var ii = folderItems.length; ii > 0; ii--) {
      var item = folderItems[ii];

      if (item instanceof FolderItem) {
        _flattenFolder(item, rootFolder);

        if (item.numItems == 0) {
          item.remove();
        }
      } else {
        item.parentFolder = rootFolder;
      }
    }
  }
})();
