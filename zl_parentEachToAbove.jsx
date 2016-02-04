/**********************************************************************************************
    zl_parentEachToAbove
    Copyright (c) 2015 Zack Lovatt. All rights reserved.
    zack@zacklovatt.com

    Name: Parent Each to Above
    Version: 0.1

    Description:
        Parents each selected layer to the layer above it.

        This script is provided "as is," without warranty of any kind, expressed
        or implied. In no event shall the author be held liable for any damages
        arising in any way from the use of this script.
**********************************************************************************************/

app.beginUndoGroup("Parent Selected to Above");

var thisComp = app.project.activeItem;

for (var i = 0; i < thisComp.selectedLayers.length; i++){
	curLayer = thisComp.selectedLayers[i];
	curLayer.parent = thisComp.layer(curLayer.index-1);
}

app.endUndoGroup();