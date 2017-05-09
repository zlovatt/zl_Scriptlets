/**********************************************************************************************
	applyCDLToColoristaFree
	Copyright (c) 2017 Zack Lovatt. All rights reserved.
	zack@zacklovatt.com

	Name: Apply CDL to Colorista Free
	Version: 1.1

	Description:
		Prompts user to select a .cdl file.

		IF LAYER SELECTED:
			- Tries to find Colorista Free on the layer
			- If it finds it, updates the values from the CDL
			- If it doesn't find it, acts like NO LAYER SELECTED
		IF NO LAYER SELECTED:
			- Creates an adjustment layer in the active comp,
			- Applies Red Giant Colorista Free (http://redgiant.com/downloads/legacy-versions)
			- Applies the CDL as values to it.

		This script is provided "as is," without warranty of any kind, expressed
		or implied. In no event shall the author be held liable for any damages
		arising in any way from the use of this script.
**********************************************************************************************/

(function applyCDLToColoristaFree () {
	app.beginUndoGroup("Apply CDL to Colorista Free");

	try {
		var cdlFile = getCDLFile(),
			cdlContents = readFile(cdlFile),
			cdlObj = buildCDLObject(cdlContents);

		var comp = getActiveComp(),
			layer = comp.selectedLayers[0],
			foundEffect = false,
			coloristaEffect;

		if (layer !== undefined) {
			coloristaEffect = findEffect(layer, "RG MBCC CDL");

			if (coloristaEffect.length > 0) {
				setColoristaValues(coloristaEffect[0], cdlObj);
				foundEffect = true;
			}
		}

		if (layer === undefined || !foundEffect) {
			layer = comp.layers.addSolid([0,0,0], cdlObj.name, comp.width, comp.height, comp.pixelAspect, comp.duration);
			layer.adjustmentLayer = true;

			coloristaEffect = addEffect(layer, "RG MBCC CDL");
			setColoristaValues(coloristaEffect, cdlObj);
		}

	} catch(e) {
		alert(e);
	} finally {
		app.endUndoGroup();
		return;
	}

	function setColoristaValues(coloristaEffect, cdlObj) {
		coloristaEffect.property("RG MBCC CDL-0002").setValue(parseFloat(cdlObj.saturation));

		// Slope
		coloristaEffect.property("RG MBCC CDL-0004").setValue(parseFloat(cdlObj.slope[0]));
		coloristaEffect.property("RG MBCC CDL-0005").setValue(parseFloat(cdlObj.slope[1]));
		coloristaEffect.property("RG MBCC CDL-0006").setValue(parseFloat(cdlObj.slope[2]));

		// Offset
		coloristaEffect.property("RG MBCC CDL-0007").setValue(parseFloat(cdlObj.offset[0]));
		coloristaEffect.property("RG MBCC CDL-0008").setValue(parseFloat(cdlObj.offset[1]));
		coloristaEffect.property("RG MBCC CDL-0009").setValue(parseFloat(cdlObj.offset[2]));

		// Power
		coloristaEffect.property("RG MBCC CDL-0010").setValue(parseFloat(cdlObj.power[0]));
		coloristaEffect.property("RG MBCC CDL-0011").setValue(parseFloat(cdlObj.power[1]));
		coloristaEffect.property("RG MBCC CDL-0012").setValue(parseFloat(cdlObj.power[2]));
	}

	function readFile (file) {
		if (!file.exists) throw "File " + file.fullName + " does not exist!";

		file.open( "r" );
		var content = file.read();
		file.close();

		if (content === null) throw "Can't read file " + file.fullName;

		return content;
	}

	function getCDLFile () {
		var cdlFile = File.openDialog("Select CDL", "*.cdl");

		if (cdlFile.fullName.split(".")[cdlFile.fullName.split(".").length-1] !== "cdl")
			throw "File " + cdlFile.fullName + " doesn't seem to be a cdl!";

		return cdlFile;
	}

	function buildCDLObject (cdlContents) {
		var xml = new XML(cdlContents);

		if (xml.SOPNode === "" || xml.SatNode === "") {
			alert("CDL seems to be corrupted!");
			return;
		}

		var cdlObj = {
			name: xml.SOPNode.Description,
			slope: xml.SOPNode.Slope.split(" "),
			offset: xml.SOPNode.Offset.split(" "),
			power: xml.SOPNode.Power.split(" "),
			saturation: xml.SatNode.Saturation
		};

		return cdlObj;
	}

	function addEffect(layer, effectName) {
		if (!(layer instanceof AVLayer))
			throw String(layer) + " is not a valid layer!";

		var effectGroup = layer.property("ADBE Effect Parade"),
			effect;

		if (effectGroup.canAddProperty(effectName))
			effect = effectGroup.addProperty(effectName);
		else
			throw "Can't add " + effectName + " to " + layer.name + ".\n" +
				  "Ensure you have effect " + effectName + " installed.";

		return effect;
	}

	function findEffect (layer, effectName) {
		if (!(layer instanceof AVLayer))
			throw String(layer) + " is not a valid layer!";

		var effectGroup = layer.property("ADBE Effect Parade"),
			foundEffects = [];

		for (var i = 1, il = effectGroup.numProperties; i <= il; i++) {
			var effect = effectGroup(i);

			if (effect.matchName == effectName || effect.name == effectName)
				foundEffects.push(effect);
		}

		return foundEffects;
	}

	function getActiveComp() {
		var comp = app.project.activeItem;
		if (comp === null || !(comp instanceof CompItem))
			throw "Can't find active comp!";

		return comp;
	}
})();
