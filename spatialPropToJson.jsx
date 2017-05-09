(function spatialPropToJson() {
    var thisComp = app.project.activeItem;
    var userProps = thisComp.selectedProperties;
    var jsonObj = {};

    for (var i = 0, il = userProps.length; i < il; i++) {
        var thisProp = userProps[i];
        var layerName = thisProp.propertyGroup(thisProp.propertyDepth).name;

        if (!thisProp.isSpatial || thisProp.numKeys == 0 || thisProp.keyValue(1).length < 2)
            continue;

        jsonObj[thisProp.name] = {
            position: []
        };

        for (var j = 1, jl = thisProp.numKeys; j <= jl; j++) {
            jsonObj[thisProp.name].position.push({
                "frame": thisProp.keyTime(j)/thisComp.frameDuration,
                "x":     thisProp.keyValue(j)[0],
                "y":     thisProp.keyValue(j)[1],
            });
        }
    }

    alert(JSON.stringify(jsonObj));
})();
