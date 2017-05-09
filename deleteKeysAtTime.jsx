/**********************************************************************************************
    zl_deleteKeysAtTime
    Copyright (c) 2015 Zack Lovatt. All rights reserved.
    zack@zacklovatt.com

    Name: zl_deleteKeysAtTime
    Version: 0.1

    Description:
        Delete all keys at current time.

        Originally requested by Andrew Embury.

        This script is provided "as is," without warranty of any kind, expressed
        or implied. In no event shall the author be held liable for any damages
        arising in any way from the use of this script.

**********************************************************************************************/

function zk_DKAT (thisObj){

    var zl_deleteKeysAtTime_scriptName = "zl_deleteKeysAtTime";
    var zl_deleteKeysAtTime_versionNumber = "v0.1";

    /******************************
        zl_deleteKeysAtTime()

        Description:
        This function contains the main logic for this script.

        Parameters:
        thisComp - current comp to bake

        Returns:
        Nothing.
    ******************************/
    function zl_deleteKeysAtTime (thisComp) {
        var userLayers = [];

        // 1: Build layer set
        if (thisComp.selectedLayers.length !== 0)
            for (var i = 0; i < thisComp.selectedLayers.length; i++)
                userLayers.push(thisComp.selectedLayers[i]);
        else
            for (var i = 1; i <= thisComp.layers.length; i++)
                userLayers.push(thisComp.layers[i]);

        // 3: Bake
        if (userLayers.length !== 0) {
            for (var i = 0; i < userLayers.length; i++) {
                var thisLayer = userLayers[i];
                var wasSelected = thisLayer.selected;

                for (var j = 1; j <= thisLayer.numProperties; j++)
                    zl_deleteKeysAtTime_deleteKeys(thisComp.time, thisLayer, thisLayer.property(j).name);

                thisLayer.selected = wasSelected;
            }
        } else {
            alert("No layers to delete keys from!");
        }
    } // end function deleteKeysAtTime


   /******************************
        zl_deleteKeysAtTime_deleteKeys()

        Description:
        Handles recursion & prop conversion

        Parameters:
        curTime - Current time to delete on
        curLayer - Layer or prop group to run through
        curPropGroup - Current prop group / layer

        Returns:
        Nothing.
    ******************************/
    function zl_deleteKeysAtTime_deleteKeys (curTime, curLayer, curPropGroup) {
        var thisPropGroup = curLayer.property(curPropGroup);
        var numProps;

        try {
            numProps = thisPropGroup.numProperties;
        } catch (err) {}

        if (numProps !== undefined)
            for (var p = 1; p < numProps + 1; p++) {
                var curProp = thisPropGroup.property(p);
                if (curProp.numProperties !== undefined)
                    zl_deleteKeysAtTime_deleteKeys(curTime, thisPropGroup, curProp.name);
                else
                    if (curProp.numKeys !== 0)
                        if (curProp.keyTime(curProp.nearestKeyIndex(curTime)) == curTime)
                            curProp.removeKey(curProp.nearestKeyIndex(curTime));
            } // end for
    } // end function deleteKeys


    // RUN!
    var proj = (app.project) ? app.project: app.newProject();
    var thisComp = proj.activeItem;

    if (thisComp != null && (thisComp instanceof CompItem)) {
        app.beginUndoGroup(zl_deleteKeysAtTime_scriptName);
        zl_deleteKeysAtTime(thisComp);
        app.endUndoGroup();
    } else {
        alert("Select an active comp!", zl_deleteKeysAtTime_scriptName);
    }

} // end zl_kiln

zk_DKAT(this);