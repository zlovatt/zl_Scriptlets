/**********************************************************************************************
	reverseShapeGroupOrder
	Copyright (c) 2017 Zack Lovatt. All rights reserved.
	zack@zacklovatt.com

	Name: Reverse Shape Group Order
	Version: 0.2

	Description:
		This will reverse the order of the shape groups within a shape layer.

		This script is provided "as is," without warranty of any kind, expressed
		or implied. In no event shall the author be held liable for any damages
		arising in any way from the use of this script.
**********************************************************************************************/

(function reverseShapeGroupOrder() {
	app.beginUndoGroup("Reverse Shape Group Order");

	var proj = (app.project) ? app.project: app.newProject();
	var userLayers = proj.activeItem.selectedLayers;

	if (userLayers.length > 0) {
		var i;

		for (i = 0; i < userLayers.length; i++) {
			var thisLayer = userLayers[i];

			if (!(thisLayer instanceof ShapeLayer)) {
				alert("Select a shape layer!");
			} else {
				var vecGroup = thisLayer.property("ADBE Root Vectors Group"),
					numGroups = vecGroup.numProperties;

				var shapeArrayByName = [];
				for (i = 1; i <= numGroups; i++)
					shapeArrayByName.push(vecGroup(i).name);

				for (i = numGroups - 1; i > 0; i--)
					vecGroup.property(shapeArrayByName[i]).moveTo(numGroups-i);
			} // end else
		} // end for
	} else {
		alert("Select a shape layer!");
	}

	app.endUndoGroup();
})();
