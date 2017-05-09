/**********************************************************************************************
	randomizeShapeGroupOrder
	Copyright (c) 2017 Zack Lovatt. All rights reserved.
	zack@zacklovatt.com

	Name: Randomize Shape Group Order
	Version: 0.2

	Description:
		This will randomly sort selected shape groups in a shape layer.

		This script is provided "as is," without warranty of any kind, expressed
		or implied. In no event shall the author be held liable for any damages
		arising in any way from the use of this script.
**********************************************************************************************/

(function randomizeShapeGroupOrder () {
	app.beginUndoGroup("Randomize Shape Group Order");

	var proj = (app.project) ? app.project: app.newProject();
	var thisComp = app.project.activeItem;
	var userLayers = thisComp.selectedLayers;

	if (userLayers.length > 0) {
		for (var i = 0; i < userLayers.length; i++) {
			var thisLayer = userLayers[i];

			if (!(thisLayer instanceof ShapeLayer)) {
				alert("Select a shape layer!");
			} else {
				var vecGroup = thisLayer.selectedProperties;
				var numGroups = vecGroup.length;

				var myIndexArray = [];
				for (var i = 0; i < numGroups; i++){
					myIndexArray[i] = vecGroup[i].propertyIndex;
				}

				var idx;
				var temp;
				for (var i = 0; i < numGroups; i++){
					idx = i + Math.floor(Math.random()*(myIndexArray.length - i));
					temp = myIndexArray[i];
					myIndexArray[i] = myIndexArray[idx];
					myIndexArray[idx] = temp;
				}

				var shapeArrayByName = [];
				for (var i = 0; i < numGroups; i++)
					shapeArrayByName.push(vecGroup[i].name);

				for (var i = 0; i < numGroups; i++) {
					var theseProps = thisLayer.property("ADBE Root Vectors Group");
					theseProps.property(shapeArrayByName[i]).moveTo(myIndexArray[i]);
				}

			} // end else
		} // end for
	} else {
		alert("Select a shape layer!");
	}

	app.endUndoGroup();
})();
