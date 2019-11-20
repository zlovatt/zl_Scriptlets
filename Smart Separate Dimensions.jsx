/**
 * Iterates through all unlocked layers in current comp, separating dimensions
 * and copying key eases to the new X/Y/Z separated props
 */
(function separateDimensionsPreserveEasing () {
    /**
     * Makes an array of objects containing in and out ease for a property
     *
     * @param {Property} property Property to check (really only works with Position)
     * @returns {{ite: KeyframeEase, ote: KeyframeEase}[]} Array of ite/ote keyframe objects
     */
    function buildPropTemporalEaseArray (property) {
        var propTemporalEases = [];

        for (var i = 1, il = property.numKeys; i <= il; i++) {
            var ite = property.keyInTemporalEase(i)[0];

            if (property.keyInInterpolationType(i) == KeyframeInterpolationType.HOLD ||
                    property.keyInInterpolationType(i) == KeyframeInterpolationType.LINEAR)
                ite = new KeyframeEase(0, 10);

            var ote = property.keyOutTemporalEase(i)[0];

            if (property.keyOutInterpolationType(i) == KeyframeInterpolationType.HOLD ||
                    property.keyOutInterpolationType(i) == KeyframeInterpolationType.LINEAR)
                ote = new KeyframeEase(0, 10);

            propTemporalEases.push({
                ite : ite,
                ote : ote
            });
        }

        return propTemporalEases;
    }

    /**
     * Sets X, Y and Z positions from a pre-generated object array
     *
     * @param {PropertyGroup} transformGroup Transform group to set props in
     * @param {{ite: KeyframeEase, ote: KeyframeEase}[]} propTemporalEases Array of ite/ote keyframe objects
     */
    function setDimensionTemporalEaseFromObject (transformGroup, propTemporalEases) {
        var posProps = [transformGroup("ADBE Position_0"), transformGroup("ADBE Position_1"), transformGroup("ADBE Position_2")];

        for (var i = 0, il = posProps.length; i < il; i++) {
            var property = posProps[i];

            for (var j = 1, jl = property.numKeys; j <= jl; j++) {
                var temporalEaseObject = propTemporalEases[j-1];
                property.setTemporalEaseAtKey(j, [temporalEaseObject.ite], [temporalEaseObject.ote]);
            }
        }

    }

    var comp = app.project.activeItem;

    app.beginUndoGroup("Separate Dimensions & Preserve Easing");

    for (var i = 1, il = comp.numLayers; i <= il; i++) {
        var layer = comp.layer(i);

        if (layer.locked)
            continue;

        var transform = layer.transform;
        var pos = transform.position;

        if (pos.dimensionsSeparated)
            continue;

        var propTemporalEases = buildPropTemporalEaseArray(pos);

        pos.dimensionsSeparated = true;

        setDimensionTemporalEaseFromObject(transform, propTemporalEases);
    }

    app.endUndoGroup();
})();
