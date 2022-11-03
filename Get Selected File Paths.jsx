/**
 * Gets file paths of selected files in the project panel
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.1.0
 */
(function getSelectedFilePaths () {
  var items = app.project.selection;

  if (items.length === 0) {
    return;
  }

  var paths = [];

  for (var ii = 0, il = items.length; ii < il; ii++) {
    var item = items[ii];

    if (!(item instanceof FootageItem)) {
      return;
    }

    var source = item.mainSource;

    if (!(source instanceof FileSource)) {
      return;
    }

    paths.push(item.file.fullName);
  }

  alert(paths.join("\n"));
})();
