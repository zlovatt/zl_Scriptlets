/*
    1) Select comps in project panel
    2) Run script
    
    First layer in each comp will now be aligned to the end of each comp.
*/

(function moveFirstLayerOfSelectedCompsToEnd () {
    var comps = app.project.selection;
    
    app.beginUndoGroup("Move first layer to end of comp");
    
    for (var i = 0, il = comps.length; i < il; i++)
        moveCompFirstLayerToEnd(comps[i]);

    app.endUndoGroup();
    
    
    function moveCompFirstLayerToEnd (comp) {
        if (!isValidComp(comp))
            return;
        
        var layer = comp.layer(1);
        moveLayerToEnd(comp, layer);
    };

    function moveLayerToEnd (comp, layer) {
        var layerDuration = layer.outPoint - layer.inPoint;
        
        layer.startTime = comp.duration - layerDuration;
    };

    function isValidComp (comp) {
        if (!(comp instanceof CompItem))
            return false;
        if (comp.numLayers == 0)
            return false;
            
        return true;
    };
})();