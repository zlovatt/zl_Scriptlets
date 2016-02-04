/**********************************************************************************************
    zl_recursiveEnableMoblur
    Copyright (c) 2015 Zack Lovatt. All rights reserved.
    zack@zacklovatt.com

    Name: Recursive Enable Moblur
    Version: 0.1

    Description:
        Recursively enables motion blur on select comps and all precomps within.

        This script is provided "as is," without warranty of any kind, expressed
        or implied. In no event shall the author be held liable for any damages
        arising in any way from the use of this script.
**********************************************************************************************/

function enableMoblur (targetComp) {
    var layers = targetComp.layers;
    for (var i = 1; i <= layers.length; i++) {
        var thisLayer = layers[i];

        try { thisLayer.motionBlur = true; } catch(e) {}

        if (thisLayer.source instanceof CompItem)
            enableMoblur(thisLayer.source);
    }
}

function blurSelectedComps () {
    var projectItems = app.project.items;
    for (var i = 1; i <= projectItems.length; i++) {
        var thisItem = projectItems[i];
        if (thisItem.selected == true)
            if (thisItem instanceof CompItem)
                enableMoblur(thisItem);
    }
}

app.beginUndoGroup("Recursive Enable Moblur")
blurSelectedComps();
app.endUndoGroup()