/**********************************************************************************************
	ungroupSelectedShapeGroups
	Copyright (c) 2017 Zack Lovatt. All rights reserved.
	zack@zacklovatt.com

	Name: Ungroup Selected Shape Groups
	Version: 0.2

	Description:
		Ungroup all selected shape groups.
		This assumes that each group ONLY has a 'path' within it. If there's more, it'll fail.
		Better than nothing!

		This script is provided "as is," without warranty of any kind, expressed
		or implied. In no event shall the author be held liable for any damages
		arising in any way from the use of this script.
**********************************************************************************************/

(function ungroupSelectedShapeGroups () {
	app.beginUndoGroup("Ungroup Selected Shape Groups");

		var thisComp = app.project.activeItem;
		var selectedProps = thisComp.selectedProperties;
		var parentProp = selectedProps[0].propertyGroup();
		var idxList = [];
		var i, il;

		// Build list of indices
		for (i = 0, il = selectedProps.length; i < il; i++) {
			idxList.push(selectedProps[i].propertyIndex);
		}

		app.executeCommand(2004); // Deselect all

		// Deselect them
		for (i = 0, il = idxList.length; i < il; i++) {
			var thisProp = parentProp.property(idxList[i]);
			thisProp.selected = true;
			try {
				app.executeCommand(3742);
			} catch(e) {}
			parentProp.property(idxList[i]).selected = false;
		}

	app.endUndoGroup();
})();
