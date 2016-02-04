/**********************************************************************************************
    zl_getSetSettings
    Copyright (c) 2015 Zack Lovatt. All rights reserved.
    zack@zacklovatt.com

    Name: Get/Set Settings
    Version: 0.1

    Description:
        Sample code to get and set settings.

        This script is provided "as is," without warranty of any kind, expressed
        or implied. In no event shall the author be held liable for any damages
        arising in any way from the use of this script.
**********************************************************************************************/

var scriptName = "GetSetSettings Sample";
var versionNumber = "1.0";
var sectionTag = scriptName;

/******************************
    getOption()

    Description:
    Check specified option exists,
    return

    Parameters:
    sectionTag - generally script name
    keyTag - option to get

    Returns:
    Saved option
 ******************************/
function getOption (sectionTag, keyTag) {
    var optionValue;

    if (app.settings.haveSetting(sectionTag, keyTag)) {
        var optionValue = app.settings.getSetting(sectionTag, keyTag);
        if (keyTag == "activeLabelIndices" || keyTag == "bankLabelIndices") {
            optionValue = optionValue.split(",");
            for (var i = 0; i < optionValue.length; i++) optionValue[i] = parseInt(optionValue[i]);
        };
    } else {
        switch(keyTag) {
            case "activeLabelIndices":
                optionValue = defaultActiveIndices;
                break;
            case "bankLabelIndices":
                optionValue = defaultBankIndices;
                break;
        }
    }

    return optionValue;
} // end getOptions


/******************************1
    createOptionsPalette()

    Description:
    Creates options palette

    Parameters:
    thisObj - this object

    Returns:
    Nothing
 ******************************/
function createOptionsPalette (thisObj) {
    var win = new Window('dialog', scriptName + " v" + versionNumber + " Options", undefined);
    win.orientation = "column";

    { // Buttons
        win.buttonGroup = win.add('group', undefined, '', {borderStyle: "none"});
        win.buttonGroup.orientation = "row";

        var okButton = win.buttonGroup.add('button', undefined, 'OK');
        var cancelButton = win.buttonGroup.add('button', undefined, 'Cancel');

        okButton.onClick = function () {
            // Save
            app.settings.saveSetting(sectionTag, "activeLabelIndices", newActiveLabelIndices.toString());
            app.settings.saveSetting(sectionTag, "bankLabelIndices", newBankLabelIndices.toString());

            win.close();
        };

        cancelButton.onClick = function () {
            win.close();
        }
    } // end buttons

    win.license = win.add('statictext', undefined);
    win.license.text = vva5("p");

    win.show();
} // end createPalette

createOptionsPalette(this);

// Usage:
// var activeLabelIndices = getOption(sectionTag, "activeLabelIndices");