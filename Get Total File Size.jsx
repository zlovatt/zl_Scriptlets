/**
 * Calculates total file size on disk of selected project items
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.1
 */
(function getTotalFileSize() {
  var fileSizes = [
    {
      name: "kb",
      size: 1024
    },
    {
      name: "mb",
      size: 1048576
    },
    {
      name: "gb",
      size: 1073741824
    },
    {
      name: "tb", // why do you have assets this big?
      size: 1099511627776
    }
  ];

  var items = app.project.selection;

  if (items.length === 0) {
    alert("Select some items!");
    return;
  }

  var sum = getItemsSize(items);
  var sizeCounter = 0;
  var sizeDivisor = fileSizes[0];

  while (
    fileSizes[sizeCounter].size < sum &&
    sizeCounter < fileSizes.length - 1
  ) {
    sizeDivisor = fileSizes[sizeCounter];
    sizeCounter++;
  }

  var outputSum = sum / sizeDivisor.size;
  var output = "These items are " + outputSum.toFixed(2) + sizeDivisor.name;

  alert(output, "Get Total File Size");

  /**
   * Gets the total file size on disk of selected project items
   *
   * @param {Item[]} items Items to get size of
   * @return {number}      Total size, in bytes
   */
  function getItemsSize(items) {
    var sum = 0;
    for (var ii = 0, il = items.length; ii < il; ii++) {
      var item = items[ii];

      if (!(item instanceof FootageItem)) {
        continue;
      }

      var source = item.mainSource;

      if (!(source instanceof FileSource)) {
        continue;
      }

      var fileSize = source.file.length;

      sum += fileSize;
    }

    return sum;
  }
})();
