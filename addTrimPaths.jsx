/**********************************************************************************************
    addTrimPaths
    Copyright (c) 2017 Zack Lovatt. All rights reserved.
    zack@zacklovatt.com

    Name: Add 'Trim Paths'
    Version: 1.2

    Description:
        Adds 'Trim Paths' to any selected shape layers.

        If you don't want keyframes, set addKeys to false.

        This script is provided "as is," without warranty of any kind, expressed
        or implied. In no event shall the author be held liable for any damages
        arising in any way from the use of this script.
**********************************************************************************************/

(function addTrimPaths () {
	var addKeys = true;

	app.beginUndoGroup("Add Trim Paths");

	var thisComp = app.project.activeItem;
	if (thisComp === null || !(thisComp instanceof CompItem)){
		alert("Please select a composition!");
	} else {
		var userLayers = thisComp.selectedLayers;
		if (userLayers.length > 0) {
			for (var i = 0, il = userLayers.length; i < il; i++) {
				var thisLayer = userLayers[i];

				if (thisLayer.matchName == "ADBE Vector Layer") {
					var thisContentsGrp = thisLayer.property("ADBE Root Vectors Group");

					if (thisContentsGrp.canAddProperty("ADBE Vector Filter - Trim")) {
						var trimProp = thisContentsGrp.addProperty("ADBE Vector Filter - Trim");

						if (addKeys) {
							var trimEndProp = trimProp.property("ADBE Vector Trim End");

							var trimTimes = [thisLayer.inPoint, thisLayer.inPoint+1];
							var trimValues = [0, 100];

							trimEndProp.setValuesAtTimes(trimTimes, trimValues);
						}
					}
				}
			}
		} else {
			alert("Please select some layers!");
		}
	}

	app.endUndoGroup();
})();
