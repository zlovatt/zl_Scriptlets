/*
    Create Nulls From Paths.jsx v.0.5
    Attach nulls to shape and mask vertices, and vice-versa.

    Changes:
        - wraps it all in an IIFE
        - fixes call to missing method array.indexOf
*/
(function responsiveCreateNullsFromPaths (thisObj) {
    function getActiveComp(){
        var theComp = app.project.activeItem;
        if (theComp == undefined){
            var errorMsg = localize("$$$/AE/Script/CreatePathNulls/ErrorNoComp=Error: Please select a composition.");
            alert(errorMsg);
            return null
        }

        return theComp
    }

    function getSelectedLayers(targetComp){
        var targetLayers = targetComp.selectedLayers;
        return targetLayers
    }

    function createNull(targetComp){
        return targetComp.layers.addNull();
    }

    function getSelectedProperties(targetLayer){
        var props = targetLayer.selectedProperties;
        if (props.length < 1){
            return null
        }
        return props
    }

    function forEachLayer(targetLayerArray, doSomething) {
        for (var i = 0, ii = targetLayerArray.length; i < ii; i++){
            doSomething(targetLayerArray[i]);
        }
    }

    function forEachProperty(targetProps, doSomething){
        for (var i = 0, ii = targetProps.length; i < ii; i++){
            doSomething(targetProps[i]);
        }
    }

    function forEachEffect(targetLayer, doSomething){
        for (var i = 1, ii = targetLayer.property("ADBE Effect Parade").numProperties; i <= ii; i++) {
            doSomething(targetLayer.property("ADBE Effect Parade").property(i));
        }
    }

    function matchMatchName(targetEffect,matchNameString){
        if (targetEffect != null && targetEffect.matchName === matchNameString) {
            return targetEffect
        } else {
            return null
        }
    }

    function getPropPath(currentProp,pathHierarchy){
        var pathPath = "";
            while (currentProp.parentProperty !== null){

                if ((currentProp.parentProperty.propertyType === PropertyType.INDEXED_GROUP)) {
                    pathHierarchy.unshift(currentProp.propertyIndex);
                    pathPath = "(" + currentProp.propertyIndex + ")" + pathPath;
                } else {
                    pathPath = "(\"" + currentProp.matchName.toString() + "\")" + pathPath;
                }

                // Traverse up the property tree
                currentProp = currentProp.parentProperty;
            }
        return pathPath
    }

    function getPathPoints(path){
        return path.value.vertices;
    }


    /* Project specific code */

    function forEachPath(doSomething){

        var comp = getActiveComp();

        if(comp == null) {
            return
        }

            var selectedLayers = getSelectedLayers(comp);
            if (selectedLayers == null){
                return
            }

            // First store the set of selected paths
            var selectedPaths = [];
            var parentLayers = [];
            forEachLayer(selectedLayers,function(selectedLayer){

                var paths = getSelectedProperties(selectedLayer);
                if (paths == null){
                    return
                }

                forEachProperty(paths,function(path){
                    var isShapePath = matchMatchName(path,"ADBE Vector Shape");
                    var isMaskPath = matchMatchName(path,"ADBE Mask Shape");
                // var isPaintPath = matchMatchName(path,"ADBE Paint Shape"); //Paint and roto strokes not yet supported in scripting
                    if(isShapePath != null || isMaskPath != null ){
                        selectedPaths.push(path);
                        parentLayers.push(selectedLayer);
                    }
                });
            });

            // Then operate on the selection
            if (selectedPaths.length == 0){
                var pathError = localize("$$$/AE/Script/CreatePathNulls/ErrorNoPathsSelected=Error: No paths selected.");

                alert(pathError);
                return
            }

            for (var p = 0; p < selectedPaths.length; p++) {
                    doSomething(comp,parentLayers[p],selectedPaths[p]);
            }

    }

    function linkNullsToPoints(){
        var undoGroup = localize("$$$/AE/Script/CreatePathNulls/LinkNullsToPathPoints=Link Nulls to Path Points");
        app.beginUndoGroup(undoGroup);

        forEachPath(function(comp,selectedLayer,path){
            var pathHierarchy = [];
            var pathPath = getPropPath(path, pathHierarchy);
            // Do things with the path points
            var pathPoints = getPathPoints(path);
            for (var i = 0, ii = pathPoints.length; i < ii; i++){
                var nullName = selectedLayer.name + ": " + path.parentProperty.name + " [" + pathHierarchy.join(".") + "." + i + "]";
                if(comp.layer(nullName) == undefined){
                    var newNull = createNull(comp);
                    newNull.position.setValue(pathPoints[i]);
                    newNull.position.expression =
                            "var srcLayer = thisComp.layer(\"" + selectedLayer.name + "\"); \r" +
                            "var srcPath = srcLayer" + pathPath + ".points()[" + i + "]; \r" +
                            "srcLayer.toComp(srcPath);";
                    newNull.name = nullName;
                    newNull.label = 10;
                    }
                }
        });
        app.endUndoGroup();
    }

    function linkPointsToNulls(){
        var undoGroup = localize("$$$/AE/Script/CreatePathNulls/LinkPathPointsToNulls=Link Path Points to Nulls");
        app.beginUndoGroup(undoGroup);

        forEachPath(function(comp,selectedLayer,path){
            // Get property path to path
            var pathHierarchy = [];
            var pathPath = getPropPath(path, pathHierarchy);
            var nullSet = [];
            // Do things with the path points
            var pathPoints = getPathPoints(path);
            for (var i = 0, ii = pathPoints.length; i < ii; i++){ //For each path point
                var nullName = selectedLayer.name + ": " + path.parentProperty.name + " [" + pathHierarchy.join(".") + "." + i + "]";
                nullSet.push(nullName);

                // Get names of nulls that don't exist yet and create them
                if(comp.layer(nullName) == undefined){

                    //Create nulls
                    var newNull = createNull(comp);
                    // Null layer name
                    newNull.name = nullName;
                    newNull.label = 11;

                    // Set position using layer space transforms, then remove expressions
                    newNull.position.setValue(pathPoints[i]);
                    newNull.position.expression =
                            "var srcLayer = thisComp.layer(\"" + selectedLayer.name + "\"); \r" +
                            "var srcPath = srcLayer" + pathPath + ".points()[" + i + "]; \r" +
                            "srcLayer.toComp(srcPath);";
                    newNull.position.setValue(newNull.position.value);
                    newNull.position.expression = '';
                    }

                }

            // Get any existing Layer Control effects
            var existingEffects = [];
            forEachEffect(selectedLayer,function(targetEffect){
                if(matchMatchName(targetEffect,"ADBE Layer Control") != null) {
                    existingEffects.push(targetEffect.name);
                }
            });

            // Add new layer control effects for each null
            for(var n = 0; n < nullSet.length;n++){
                if(existingEffects.join("|").indexOf(nullSet[n]) != -1){ //If layer control effect exists, relink it to null
                    selectedLayer.property("ADBE Effect Parade")(nullSet[n]).property("ADBE Layer Control-0001").setValue(comp.layer(nullSet[n]).index);
                } else {
                    var newControl = selectedLayer.property("ADBE Effect Parade").addProperty("ADBE Layer Control");
                    newControl.name = nullSet[n];
                    newControl.property("ADBE Layer Control-0001").setValue(comp.layer(nullSet[n]).index);
                }
            }

            // Set path expression that references nulls
            path.expression =
                        "var nullLayerNames = [\"" + nullSet.join("\",\"") + "\"]; \r" +
                        "var origPath = thisProperty; \r" +
                        "var origPoints = origPath.points(); \r" +
                        "var origInTang = origPath.inTangents(); \r" +
                        "var origOutTang = origPath.outTangents(); \r" +
                        "var getNullLayers = []; \r" +
                        "for (var i = 0; i < nullLayerNames.length; i++){ \r" +
                        "    try{  \r" +
                        "        getNullLayers.push(effect(nullLayerNames[i])(\"ADBE Layer Control-0001\")); \r" +
                        "    } catch(err) { \r" +
                        "        getNullLayers.push(null); \r" +
                        "    }} \r" +
                        "for (var i = 0; i < getNullLayers.length; i++){ \r" +
                        "    if (getNullLayers[i] != null && getNullLayers[i].index != thisLayer.index){ \r" +
                        "        origPoints[i] = fromCompToSurface(getNullLayers[i].toComp(getNullLayers[i].anchorPoint));  \r" +
                        "    }} \r" +
                        "createPath(origPoints,origInTang,origOutTang,origPath.isClosed());";

        });
        app.endUndoGroup();
    }

    function tracePath(){
        var undoGroup = localize("$$$/AE/Script/CreatePathNulls/CreatePathTracerNull=Create Path Tracer Null");
        app.beginUndoGroup(undoGroup);

        var sliderName = localize("$$$/AE/Script/CreatePathNulls/TracerTiming=Tracer Timing");
        var checkboxName = localize("$$$/AE/Script/CreatePathNulls/LoopTracer=Loop Tracer");

        forEachPath(function(comp,selectedLayer,path){
            var pathHierarchy = [];
            var pathPath = getPropPath(path, pathHierarchy);

            // Create tracer null
            var newNull = createNull(comp);

            // Add expression control effects to the null
            var nullControl = newNull.property("ADBE Effect Parade").addProperty("Pseudo/ADBE Trace Path");
            nullControl.property("Pseudo/ADBE Trace Path-0002").setValue(true);
            nullControl.property("Pseudo/ADBE Trace Path-0001").setValuesAtTimes([0,1],[0,100]);
            nullControl.property("Pseudo/ADBE Trace Path-0001").expression =
                        "if(thisProperty.propertyGroup(1)(\"Pseudo/ADBE Trace Path-0002\") == true && thisProperty.numKeys > 1){ \r" +
                        "thisProperty.loopOut(\"cycle\"); \r" +
                        "} else { \r" +
                        "value \r" +
                        "}";
            newNull.position.expression =
                    "var pathLayer = thisComp.layer(\"" + selectedLayer.name + "\"); \r" +
                    "var progress = thisLayer.effect(\"Pseudo/ADBE Trace Path\")(\"Pseudo/ADBE Trace Path-0001\")/100; \r" +
                    "var pathToTrace = pathLayer" + pathPath + "; \r" +
                    "pathLayer.toComp(pathToTrace.pointOnPath(progress));";
            newNull.rotation.expression =
                    "var pathToTrace = thisComp.layer(\"" + selectedLayer.name + "\")" + pathPath + "; \r" +
                    "var progress = thisLayer.effect(\"Pseudo/ADBE Trace Path\")(\"Pseudo/ADBE Trace Path-0001\")/100; \r" +
                    "var pathTan = pathToTrace.tangentOnPath(progress); \r" +
                    "radiansToDegrees(Math.atan2(pathTan[1],pathTan[0]));";
            newNull.name = "Trace " + selectedLayer.name + ": " + path.parentProperty.name + " [" + pathHierarchy.join(".") + "]";
            newNull.label = 10;

        });
        app.endUndoGroup();
    }

	function responsiveUI (thisObj) {
        this.defaultSize = [120, 32];this.margin = 4;
        this.initBtnSizes=function(i){for(var n=0,t=i.children.length;n<t;n++){var e=i.children[n];void 0===e.size&&(e.size=this.defaultSize)}};
        this.initLayout=function(){var i=2*this.margin,n=this.win.children[0],t=this;this.win.size=this.getWinSize(n),this.adjustButtons(this.win,n);var e=this.getLargestSize(n);this.win.onResizing=this.win.onResize=function(){t.win.size.width<e[0]+i&&(t.win.size.width=e[0]+i),t.win.size.height<e[1]+i&&(t.win.size.height=e[1]+i),t.adjustButtons(t.win,n)}};
        this.adjustButtons=function(i,n){var t=this.margin,e=[t,t];n.bounds=[0,0,i.windowBounds.width+e[0],i.windowBounds.height+e[1]];for(var s=1,h=n.children.length;s<h;s++){var r=n.children[s-1],o=n.children[s],a=[r.size[0]+t,r.size[1]+t];r.location=e,e[0]+=a[0],i.size[0]<e[0]+o.size[0]+t&&(e[0]=t,e[1]+=a[1])}n.children[n.children.length-1].location=e};
        this.getLargestSize=function(i){for(var n=0,t=0,e=0,s=i.children.length;e<s;e++){var h=i.children[e];h.size[0]>n&&(n=h.size[0]),h.size[1]>t&&(t=h.size[1])}return[n,t]};
        this.getWinSize=function(i){for(var n=this.getLargestSize(i),t=i.children.length,e=0,s=n[1],h=0,r=i.children.length;h<r;h++){e+=i.children[h].size[0]}return[e+=this.margin*(t+1),s+=2*this.margin]};

        var windowTitle = localize("$$$/AE/Script/CreatePathNulls/CreateNullsFromPaths=Create Nulls From Paths");
        var firstButton = localize("$$$/AE/Script/CreatePathNulls/PathPointsToNulls=Points Follow Nulls");
        var secondButton = localize("$$$/AE/Script/CreatePathNulls/NullsToPathPoints=Nulls Follow Points");
        var thirdButton = localize("$$$/AE/Script/CreatePathNulls/TracePath=Trace Path");

        this.win = (thisObj instanceof Panel) ? thisObj : new Window('palette', windowTitle, undefined, {resizeable:true});

        var btnGrp = this.win.add('group', undefined, undefined, {alignment: 'fill'});
            var btnFirst = btnGrp.add('button', undefined, firstButton);
                btnFirst.onClick = linkPointsToNulls;
            var btnSecond = btnGrp.add('button', undefined, secondButton);
                btnSecond.onClick = linkNullsToPoints;
            var btnThird = btnGrp.add('button', undefined, thirdButton);
                btnThird.onClick = tracePath;

        this.initBtnSizes(btnGrp);
        this.initLayout();

        if (this.win instanceof Window) {
            this.win.center();
            this.win.show();
        } else {
            this.win.layout.layout(false);
            this.win.layout.resize();
        }
	};

    responsiveUI(thisObj);
})(this);

