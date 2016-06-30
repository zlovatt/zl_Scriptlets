function convertNewGBlurToOld() {
	var comp = app.project.activeItem;
	var layers = comp.selectedLayers;

	function checkEffect (effect) {
		if (effect.matchName == "ADBE Gaussian Blur 2") return true
		return false;
	}

	function getBlurData (effect) {
		return {
	        blurIdx: effect.propertyIndex,
			blurName: effect.name,
			blurVal: effect.property(1).value,
			blurDir: effect.property(2).value
		}
	}

	function removeOldBlurs (layerEffects, blurDataArray) {
		for (var i = blurDataArray.length-1; i >= 0; i--) {
	        var thisIdx = blurDataArray[i].blurIdx;
			layerEffects.property(thisIdx).remove();
		}
	}

	function buildNewEffects (layerEffects, blurDataArray) {
	    for (var i = 0, il = blurDataArray.length; i < il; i++) {
			var newBlur = layerEffects.addProperty("ADBE Gaussian Blur");
				newBlur.property(1).setValue(blurDataArray[i].blurVal)
				newBlur.property(2).setValue(blurDataArray[i].blurDir)
				newBlur.name = blurDataArray[i].blurName;
				newBlur.moveTo(blurDataArray[i].blurIdx);
		}
	}

	function iterateThroughEffects (layer) {
		var layerEffects  = layer.property("Effects");
		var blurDataArray = [];

		for (var i = 1, il = layerEffects.numProperties; i <= il; i++) {
	        var effect = layerEffects(i);
			if (!checkEffect(effect)) continue;

			blurDataArray.push(getBlurData(effect));
		}

	    removeOldBlurs (layerEffects, blurDataArray);
	    buildNewEffects (layerEffects, blurDataArray);
	}

	function iterateThroughSelectedLayers (layers) {
		for (var i = 0, il = layers.length; i < il; i++) {
			var layer = layers[i];
			iterateThroughEffects(layer);
		}
	}

	app.beginUndoGroup("New Blur to Old Blur");
	iterateThroughSelectedLayers(layers);
	app.endUndoGroup();
};

convertNewGBlurToOld();