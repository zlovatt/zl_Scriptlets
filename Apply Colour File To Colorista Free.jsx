/**********************************************************************************************
    applyColourFileToColoristaFree
    Copyright (c) 2017 Zack Lovatt. All rights reserved.
    zack@zacklovatt.com

    Name: Apply Colour File to Colorista Free
    Version: 1.2

    Description:
        Prompts user to select a .cdl or .ccc file.

        IF LAYER SELECTED:
            - Tries to find Colorista Free on the layer
            - If it finds it, updates the values from the CDL/CCC
            - If it doesn't find it, acts like NO LAYER SELECTED
        IF NO LAYER SELECTED:
            - Creates an adjustment layer in the active comp,
            - Applies Red Giant Colorista Free (http://redgiant.com/downloads/legacy-versions)
            - Applies the CDL/CCC as values to it.

        This script is provided "as is," without warranty of any kind, expressed
        or implied. In no event shall the author be held liable for any damages
        arising in any way from the use of this script.
**********************************************************************************************/

(function applyColourFileToColoristaFree () {
    app.beginUndoGroup("Apply Colour File to Colorista Free");

    try {
        var colourFile = getColourFile();
        var colourContents = readFile(colourFile);
        var colourObj = buildColourObject(colourContents);

        var comp = getActiveComp();
        var layer = comp.selectedLayers[0];
        var foundEffect = false;
        var coloristaEffect;

        if (layer !== undefined) {
            coloristaEffect = findEffect(layer, "RG MBCC CDL");

            if (coloristaEffect.length > 0) {
                setColoristaValues(coloristaEffect[0], colourObj);
                foundEffect = true;
            }
        }

        if (layer === undefined || !foundEffect) {
            layer = comp.layers.addSolid([0, 0, 0], colourObj.name, comp.width, comp.height, comp.pixelAspect, comp.duration);
            layer.adjustmentLayer = true;

            coloristaEffect = addEffect(layer, "RG MBCC CDL");
            setColoristaValues(coloristaEffect, colourObj);
        }

    } catch (e) {
        alert(e);
    } finally {
        app.endUndoGroup();
    }

    /**
     * Sets Colorista effect values to those from colourObj
     *
     * @param {Effect} coloristaEffect - Colorista Object
     * @param {any} colourObj          - Colour data object from file
     */
    function setColoristaValues (coloristaEffect, colourObj) {
        coloristaEffect.property("RG MBCC CDL-0002").setValue(parseFloat(colourObj.saturation));

        // Slope
        coloristaEffect.property("RG MBCC CDL-0004").setValue(parseFloat(colourObj.slope[0]));
        coloristaEffect.property("RG MBCC CDL-0005").setValue(parseFloat(colourObj.slope[1]));
        coloristaEffect.property("RG MBCC CDL-0006").setValue(parseFloat(colourObj.slope[2]));

        // Offset
        coloristaEffect.property("RG MBCC CDL-0007").setValue(parseFloat(colourObj.offset[0]));
        coloristaEffect.property("RG MBCC CDL-0008").setValue(parseFloat(colourObj.offset[1]));
        coloristaEffect.property("RG MBCC CDL-0009").setValue(parseFloat(colourObj.offset[2]));

        // Power
        coloristaEffect.property("RG MBCC CDL-0010").setValue(parseFloat(colourObj.power[0]));
        coloristaEffect.property("RG MBCC CDL-0011").setValue(parseFloat(colourObj.power[1]));
        coloristaEffect.property("RG MBCC CDL-0012").setValue(parseFloat(colourObj.power[2]));
    }

    /**
     * Reads a file, returns contents
     *
     * @param {File} file - File to read
     * @returns {String}  - File contents
     */
    function readFile (file) {
        if (!file.exists) throw "File " + file.fullName + " does not exist!";

        file.open("r");
        var content = file.read();
        file.close();

        if (content === null) throw "Can't read file " + file.fullName;

        return content;
    }

    /**
     * Prompts user to select a cdl or ccc file
     *
     * @returns {File} - CDL/CCC file
     */
    function getColourFile () {
        var colourFile = File.openDialog("Select CDL/CCC", "*.cdl;*.ccc");

        var extension = colourFile.fullName.split(".")[colourFile.fullName.split(".").length - 1];

        if (extension !== "cdl" && extension !== "ccc")
            throw "File " + colourFile.fullName + " doesn't seem to be a cdl or ccc!";

        return colourFile;
    }

    /**
     * Builds a colour data object from file contents
     *
     * @param {String} colourContents - Colour file XML contents
     * @returns {any}                 - Colour data object from file
     */
    function buildColourObject (colourContents) {
        var root = new XML(colourContents);

        var isCCC = colourContents.indexOf("ColorCorrectionCollection") > -1;

        if (isCCC) {
            colourContents = colourContents.replace(/ xmlns=".+"/, "");
            root = new XML(colourContents).ColorCorrection;
        }

        if (root.SOPNode === "" || root.SatNode === "") {
            alert("Colour File seems to be corrupted!");
            return;
        }

        var colourObj = {
            "name"       : String(isCCC ? root.attributes() : root.SOPNode.Description),
            "slope"      : root.SOPNode.Slope.split(" "),
            "offset"     : root.SOPNode.Offset.split(" "),
            "power"      : root.SOPNode.Power.split(" "),
            "saturation" : String(root.SatNode.Saturation)
        };

        return colourObj;
    }

    /**
     * Adds an effect to a layer
     *
     * @param {Layer} layer       - Layer to add effect to
     * @param {String} effectName - Effect matchname to add
     * @returns {Effect}          - Newly-created effect
     */
    function addEffect (layer, effectName) {
        if (!(layer instanceof AVLayer))
            throw String(layer) + " is not a valid layer!";

        var effectGroup = layer.property("ADBE Effect Parade");

        if (effectGroup.canAddProperty(effectName))
            return effectGroup.addProperty(effectName);

        throw "Can't add " + effectName + " to " + layer.name + ".\n" +
              "Ensure you have effect " + effectName + " installed.";
    }

    /**
     * Finds an effect on a layer
     *
     * @param {Layer} layer       - Layer to add effect to
     * @param {String} effectName - Effect matchname to add
     * @returns {Effect}          - Newly-created effect
     */
    function findEffect (layer, effectName) {
        if (!(layer instanceof AVLayer))
            throw String(layer) + " is not a valid layer!";

        var effectGroup = layer.property("ADBE Effect Parade");
        var foundEffects = [];

        for (var i = 1, il = effectGroup.numProperties; i <= il; i++) {
            var effect = effectGroup(i);

            if (effect.matchName === effectName || effect.name === effectName)
                foundEffects.push(effect);
        }

        return foundEffects;
    }

    /**
     * Gets active comp, or throws error
     *
     * @returns {CompItem} - Active comp
     */
    function getActiveComp () {
        var comp = app.project.activeItem;

        if (comp === null || !(comp instanceof CompItem))
            throw "Can't find active comp!";

        return comp;
    }
})();
