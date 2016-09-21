/**********************************************************************************************
    zl_newTextLayer
    Copyright (c) 2016 Zack Lovatt. All rights reserved.
    zack@zacklovatt.com

    Name: New Text layer
    Version: 1.0

    Description:
        Makes a new empty text layer.
        If you want a paragraph text layer, set makeParagraphText to true
        Otherwise, will be point text

        This script is provided "as is," without warranty of any kind, expressed
        or implied. In no event shall the author be held liable for any damages
        arising in any way from the use of this script.
**********************************************************************************************/

var makeParagraphText = false;

function zl_newTextLayer(makeParagraphText) {
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
}

app.beginUndoGroup("New Text Layer");
zl_newTextLayer(makeParagraphText);
app.endUndoGroup();