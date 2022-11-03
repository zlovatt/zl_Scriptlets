/**
 * This script will look at all of the layers in your current comp,
 * and select layers that have duplicate file sources.
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.2.2
 */
(function selectDuplicateSourceLayers() {
	function arrayIndexOf (arr, searchElement, fromIndex) { var k; if (arr === null) throw new TypeError('"this" is null or not defined'); var o = Object(arr); var len = o.length >>> 0; if (len === 0) return -1; var n = fromIndex | 0; if (n >= len) return -1; k = Math.max(n >= 0 ? n : len - Math.abs(n), 0); while (k < len) { if (k in o && o[k] === searchElement) return k; k++; } return -1; };

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    return;
  }

  var layers = comp.layers;
  var sourceIDs = [];

  for (var ii = 1, il = layers.length; ii <= il; ii++) {
    var layer = layers[ii];
    layer.selected = false;

    var source = layer.source;

    if (!(source.mainSource instanceof FileSource)) {
      continue;
    }

    if (arrayIndexOf(sourceIDs, source.id) === -1) {
      sourceIDs.push(source.id);
      continue;
    }

    layer.selected = true;
  }
})();
