/**********************************************************************************************
	selectLaterLayers
	Copyright (c) 2017 Zack Lovatt. All rights reserved.
	zack@zacklovatt.com

	Name: Select Later Layers
	Version: 0.2

	Description:
		Selects all layers in your comp that start after the selected layer.

		This script is provided "as is," without warranty of any kind, expressed
		or implied. In no event shall the author be held liable for any damages
		arising in any way from the use of this script.
**********************************************************************************************/

(function selectLaterLayers () {
	app.beginUndoGroup("Select Later Layers");

	var thisComp = app.project.activeItem;
	var compLayers = thisComp.layers;

	if (compLayers.length > 0) {
		var targetLayer = thisComp.selectedLayers[0];

		if (targetLayer !== undefined){
			targetLayer.selected = false;

			for (var i = 1; i <= compLayers.length; i++){
				var curLayer = compLayers[i];
				if (curLayer.inPoint > targetLayer.inPoint)
					curLayer.selected = true;
			}

			if (thisComp.selectedLayers.length === 0)
				alert("No later layers!");
		} else {
			alert("No layer selected!");
		}
	} else {
		alert("Comp has no layers!");
	}

	app.endUndoGroup();
})();
