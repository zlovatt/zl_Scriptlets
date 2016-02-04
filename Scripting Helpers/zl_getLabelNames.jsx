/**********************************************************************************************
    zl_getLabelNames
    Copyright (c) 2015 Zack Lovatt. All rights reserved.
    zack@zacklovatt.com

    Name: Get Label Names
    Version: 0.1

    Description:
        This will return all custom names when applicable, otherwise will use default.

        This script is provided "as is," without warranty of any kind, expressed
        or implied. In no event shall the author be held liable for any damages
        arising in any way from the use of this script.
**********************************************************************************************/

var defaultLabelArray = ["Red", "Yellow", "Aqua", "Pink", "Lavender", "Peach", "Sea Foam", "Blue", "Green", "Purple", "Orange", "Brown", "Fuschia", "Cyan", "Sandstone", "Dark Green"];
var fullLabelArray = buildFullLabelArray();

function el_prism_buildFullLabelArray() {
    var colObjectArray = [];

    if (!(isSecurityPrefSet())) {
        alert ("This script requires access to read files. Go to the General panel of the application preferences and make sure Allow Scripts to Write Files and Access Network is checked.");

        try{
            app.executeCommand(2359);
        } catch (e) {
            alert(e);
        }

        if (!isSecurityPrefSet()) return null;
    }

    for (var i = 1; i <= 16; i++){
        try {
            var labelString = app.preferences.getPrefAsString("Label Preference Text Section 5", "Label Text ID 2 # " + i);
        } catch(e) {
            try {
                var labelString = app.preferences.getPrefAsString("Label Preference Text Section 5", "Label Text ID 2 # " + i, PREFType.PREF_Type_MACHINE_INDEPENDENT);
            } catch(e) {
                var labelString = defaultLabelArray[i-1];
            }
        }

        colObjectArray.push(labelString);
    }

    return colObjectArray;
}

function main() {
    var labelArray = buildFullLabelArray();
    alert(labelArray);
}

main();