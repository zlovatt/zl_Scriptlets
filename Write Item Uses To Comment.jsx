/**
 * Counts the # of times a project item is used, and writes it to the item comment field
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function writeItemUsesToComment() {
  /**
   * Gets the all layers where the given Item object is used as a source.
   *
   * Pulled from aequery.
   *
   * @param  {Item} item The item to find in comps
   * @return {AVLayer[]} Array of Layer objects
   */
  function getItemInComps(item) {
    var layers = [];

    for (var ii = 0, il = item.usedIn.length; ii < il; ii++) {
      var usedInComp = item.usedIn[ii];

      for (var jj = 1, jl = usedInComp.numLayers; jj <= jl; jj++) {
        var compLayer = usedInComp.layer(jj);
        if (compLayer.source === item) {
          layers.push(compLayer);
        }
      }
    }

    return layers;
  }

  app.beginUndoGroup("Write Item Uses To Comment");

  var items = app.project.items;

  for (var ii = 1, il = items.length; ii <= il; ii++) {
    var item = items[ii];

    if (item instanceof FolderItem) {
      continue;
    }

    var itemLayers = getItemInComps(item);
    var comment = "Used " + itemLayers.length + " times";

    item.comment = comment;
  }

  app.endUndoGroup();
})();
