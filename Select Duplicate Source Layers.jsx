/*
	This script will look at all of the layers in your current comp,
	and select layers that have duplicate file sources.

	So -- if you have the same file used multiple times, this will select those duplicate layers (but not the first)
*/

(function selectDuplicateSourceLayers () {
	function arrayIndexOf (arr, searchElement, fromIndex) { var k; if (arr === null) throw new TypeError('"this" is null or not defined'); var o = Object(arr); var len = o.length >>> 0; if (len === 0) return -1; var n = fromIndex | 0; if (n >= len) return -1; k = Math.max(n >= 0 ? n : len - Math.abs(n), 0); while (k < len) { if (k in o && o[k] === searchElement) return k; k++; } return -1; };

	var comp = app.project.activeItem;

	if (comp === null)
		return;

	var layers = comp.layers;
	var sourceIDs = [];

	for (var i = 1, il = layers.length; i <= il; i++) {
		var layer = layers[i];
		layer.selected = false;

		var source = layer.source;

		if (!(source.mainSource instanceof FileSource))
			continue;

		if (arrayIndexOf(sourceIDs, source.id) == -1) {
			sourceIDs.push(source.id);
			continue;
		}

		layer.selected = true;
	}
})();
