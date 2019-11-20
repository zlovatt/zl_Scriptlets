/**********************************************************************************************
	loopSelectedLayers
	Copyright (c) 2017 Zack Lovatt. All rights reserved.
	zack@zacklovatt.com

	Name: Loop Selected Layers
	Version: 0.2

	For use w/ ft-toolbar or other script runners.

	This will run through all selected layers, enable time remap,
	and add cycle loop -- all in one click.

	If the wrong thing is selected or layer can't be remapped,
	user will be alerted of the fact.

			MODIFIERS
						Hold CTRL to loop IN instead of loop OUT
						Hold SHIFT to PINGPONG instead of CYCLE

						Combine ctrl w/ shift to merge alternatives.


	Originally requested by Andrew Embury (aembury.com)

	This script is provided "as is," without warranty of any kind, expressed
	or implied. In no event shall the author be held liable for any damages
	arising in any way from the use of this script.
**********************************************************************************************/

(function loopSelectedLayers () {
	function loopSelected (loopOption, loopFunction){

		var loopExpression = loopOption + "('" + loopFunction + "');";
		var thisComp = app.project.activeItem;
		var userLayers = thisComp.selectedLayers;

		for (var i = 0; i < userLayers.length; i++) {
			var curLayer = userLayers[i];

			if(curLayer.canSetTimeRemapEnabled === true){
				// Enable time remap, set it to the expression
				curLayer.timeRemapEnabled = true;
				curLayer.timeRemap.expression = loopExpression;

				// Add new key, remove last key
				curLayer.timeRemap.addKey(curLayer.timeRemap.keyTime(2)-thisComp.frameDuration);
				curLayer.timeRemap.removeKey(3);

				curLayer.outPoint = thisComp.duration;
			} else {
				alert (curLayer.name + " can not be looped!");
			} // end if canSetTimeRemap
		} // end for numLayers
	} // end function loopOutSelected


	app.beginUndoGroup("Loop Selected Layer");

	var loopOption = "loopOut";
	var loopFunction = "cycle";

	// If ctrl, loopIn instead of loopOut.
	if ((ScriptUI.environment.keyboardState.ctrlKey) || (ScriptUI.environment.keyboardState.metaKey))
		loopOption = "loopIn";

	// Shift = pingpong
	if (ScriptUI.environment.keyboardState.shiftKey)
		loopFunction = "pingpong";

	loopSelected(loopOption, loopFunction);

	app.endUndoGroup();
})();
