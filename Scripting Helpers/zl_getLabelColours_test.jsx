/**********************************************************************************************
    zl_getLabelColours_test
    Copyright (c) 2015 Zack Lovatt. All rights reserved.
    zack@zacklovatt.com

    Name: Get Label Colours (test)
    Version: 0.1

    Description:
        Test to fetch custom label colours

        This script is provided "as is," without warranty of any kind, expressed
        or implied. In no event shall the author be held liable for any damages
        arising in any way from the use of this script.
**********************************************************************************************/

function buildLabelsArray() {
    var colObjectArray = [];

    for (var i = 1; i <= 16; i++){
        if (app.preferences.havePref("Label Preference Text Section 5", "Label Text ID 2 # 1"))
            var labelString = app.preferences.getPrefAsString("Label Preference Text Section 5", "Label Text ID 2 # " + i);
        else
            var labelString = app.preferences.getPrefAsString("Label Preference Text Section 5", "Label Text ID 2 # " + i, PREFType.PREF_Type_MACHINE_INDEPENDENT);

        if (app.preferences.havePref("Label Preference Color Section 5", "Label Color ID 2 # 1"))
            var colourHexString = app.preferences.getPrefAsString("Label Preference Color Section 5", "Label Color ID 2 # " + i);
        else
            var colourHexString = app.preferences.getPrefAsString("Label Preference Color Section 5", "Label Color ID 2 # " + i, PREFType.PREF_Type_MACHINE_INDEPENDENT);

        var colObject = {
            "label": labelString,
            "colourHex": colourHexString
        }

        colObjectArray.push(colObject);
    }

    return colObjectArray;
}

function main() {
    var myStr = "";
    var labelArray = buildLabelsArray();

    for (var i = 0; i < labelArray.length; i++)
        myStr += (i+1) + "/" + labelArray.length + " : " + labelArray[i].label + ": #" + labelArray[i].colourHex + "\r";

    alert(myStr);
}

main();