(function zl_selectKeysAtCTI () {
    var addToSelection = false; // set to TRUE if you want to add to selection, vs overwrite


	app.beginUndoGroup("Select Keys at Current Time");
	selectKeysAtCurrentTime();
	app.endUndoGroup();

	function selectKeysAtCurrentTime() {
	    var comp = getActiveComp();
	    var targetProps = [];

	    forAllSelectedLayersElseAll (comp, function(layer) {
	       targetProps = targetProps.concat(getKeyedProp(layer));
	    });

	    forAllItemsInArray (targetProps, function(prop) {
            if (!addToSelection)
                deselectKeys(prop);

            var keyIndex = prop.nearestKeyIndex(comp.time);
            if (prop.keyTime(keyIndex) == comp.time)
                prop.setSelectedAtKey(keyIndex, true);
	    });
	}

	function getKeyedProp(sourcePropGroup) {
		var arr = [];

	    forAllPropsInGroup(sourcePropGroup, function(prop) {
	        if (isPropGroup(prop))
	            arr = arr.concat(getKeyedProp(prop));
	        else if (isKeyed(prop))
	            arr.push(prop);
	    });

	    return arr;
	}


	/*** Generic Utilities ***/

	function isComp (item) {
		return item instanceof CompItem;
	}

	function isPropGroup(prop) {
	    if (prop.propertyType === PropertyType.INDEXED_GROUP || prop.propertyType === PropertyType.NAMED_GROUP)
	        return true;
	    return false;
	}

	function isKeyed (prop) {
	    if (prop.propertyType === PropertyType.PROPERTY &&
	        prop.isTimeVarying &&
	        prop.numKeys > 0)
	        return true;

	    return false;
	}

	function deselectKeys (prop) {
	    for (var i = 1, il = prop.numKeys; i <= il; i++) {
	        prop.setSelectedAtKey(i, false);
	    }
	}

	function forAllPropsInGroup (propGroup, doSomething) {
	    for (var i = 1, il = propGroup.numProperties; i <= il; i++){
	        var thisProp = propGroup.property(i);
	        doSomething(thisProp);
	    }
	}

	function getActiveComp () {
		var thisComp = app.project.activeItem;
		if (thisComp === null || !(isComp(thisComp))){
			alert("Please select a composition!");
			return null;
		}
		return thisComp;
	}

	function forAllSelectedLayersElseAll (thisComp, doSomething) {
		if (thisComp.selectedLayers.length === 0)
			forAllLayersOfComp(thisComp, doSomething);
		else
			forAllItemsInArray(thisComp.selectedLayers, doSomething);
	}

	function forAllItemsInArray (itemArray, doSomething) {
		for (var i = 0, il = itemArray.length; i < il; i++){
			var thisItem = itemArray[i];
			doSomething(thisItem);
		}
	}

	function forAllLayersOfComp (thisComp, doSomething) {
	    for (var i = 1, il = thisComp.layers.length; i <= il; i++){
	        var thisLayer = thisComp.layers[i];
	        doSomething(thisLayer);
	    }
	}

})();