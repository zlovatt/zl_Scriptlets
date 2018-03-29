/**
 * 1. Select keys to modify
 * 2. Run this script to ENABLE
 * 3. Hold SHIFT to DISABLE
 */
(function ToggleTemporalContinuous () {
	var comp = app.project.activeItem;
    
    if (!comp)
        return;
        
	var layers = comp.selectedLayers;
    
    var enable = !ScriptUI.environment.keyboardState.shiftKey;
    
    for (var i = 0, il = layers.length; i < il; i++) {
        var layer = layers[i];
        var props = layer.selectedProperties;
        
        for (var j = 0, jl = props.length; j < jl; j++) {
            var prop = props[j];
            var keys = prop.selectedKeys;
            
            for (var k = 0, kl = keys.length; k < kl; k++) {
                var selectedKeyIndex = keys[k];
                prop.setTemporalContinuousAtKey(selectedKeyIndex, enable);
            }
        }
    }
})();
