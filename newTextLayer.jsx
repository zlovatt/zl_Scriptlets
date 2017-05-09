/**********************************************************************************************
	newTextLayer
	Copyright (c) 2017 Zack Lovatt. All rights reserved.
	zack@zacklovatt.com

	Name: New Text layer
	Version: 1.1

	Description:
		Makes a new empty text layer.
		If you want a paragraph text layer, set makeParagraphText to true
		Otherwise, will be point text

		This script is provided "as is," without warranty of any kind, expressed
		or implied. In no event shall the author be held liable for any damages
		arising in any way from the use of this script.
**********************************************************************************************/

(function newTextLayer () {
	var makeParagraphText = false;

	app.beginUndoGroup("New Text Layer");

	var thisComp = app.project.activeItem;
	if (thisComp === null || !(thisComp instanceof CompItem)){
		alert("Please select a composition!");
	} else {
		if (makeParagraphText)
			var newTextLayer = thisComp.layers.addBoxText();
		else
			var newTextLayer = thisComp.layers.addText();

		newTextLayer.selected = true;
	}

	app.endUndoGroup();
})();
