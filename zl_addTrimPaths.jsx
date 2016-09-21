/**********************************************************************************************
    zl_addTrimPaths
    Copyright (c) 2016 Zack Lovatt. All rights reserved.
    zack@zacklovatt.com

    Name: Add 'Trim Paths'
    Version: 1.0

    Description:
        Adds 'Trim Paths' to any selected shape layers.

        This script is provided "as is," without warranty of any kind, expressed
        or implied. In no event shall the author be held liable for any damages
        arising in any way from the use of this script.
**********************************************************************************************/

function zl_addTrimPaths() {
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

					if (thisContentsGrp.canAddProperty("ADBE Vector Filter - Trim"))
						thisContentsGrp.addProperty("ADBE Vector Filter - Trim");
				}
			}
		} else {
			alert("Please select some layers!");
		}
	}
}


app.beginUndoGroup("Add Trim Paths");
zl_addTrimPaths();
app.endUndoGroup();