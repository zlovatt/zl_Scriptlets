/**********************************************************************************************
    zl_ungroupSelectedShapeGroups
    Copyright (c) 2016 Zack Lovatt. All rights reserved.
    zack@zacklovatt.com

    Name: Ungroup Selected Shape Groups
    Version: 0.1

    Description:
        Ungroup all selected shape groups.
        This assumes that each group ONLY has a 'path' within it. If there's more, it'll fail.
        Better than nothing!

        This script is provided "as is," without warranty of any kind, expressed
        or implied. In no event shall the author be held liable for any damages
        arising in any way from the use of this script.
**********************************************************************************************/

function zl_ungroupSelectedShapeGroups () {
	var thisComp = app.project.activeItem;
	var selectedProps = thisComp.selectedProperties;
	var parentProp = selectedProps[0].propertyGroup();
	var idxList = [];

	// Build list of indices
	for (var i = 0, il = selectedProps.length; i < il; i++) {
	    idxList.push(selectedProps[i].propertyIndex);
	}

	app.executeCommand(2004); // Deselect all

	// Deselect them
	for (var i = 0, il = idxList.length; i < il; i++) {
	    var thisProp = parentProp.property(idxList[i]);
	    thisProp.selected = true;
	    try {
	    	app.executeCommand(app.findMenuCommandId("Ungroup Shapes"));
	    } catch(e) {}
	    parentProp.property(idxList[i]).selected = false;
	}
};

app.beginUndoGroup("Ungroup Selected Shape Groups");
zl_ungroupSelectedShapeGroups();
app.endUndoGroup();