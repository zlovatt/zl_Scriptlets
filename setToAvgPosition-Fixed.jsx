/**********************************************************************************************
	setToAvgPosition-Fixed
	Copyright (c) 2017 Zack Lovatt. All rights reserved.
	zack@zacklovatt.com

	Name: Set to Average Position (Fixed)
	Version: 0.2

	Description:
		First, select the two layers that you want to get the average of.
		Then, select the third layer that you want to apply this to.

		This will add an expression on the third layer's position as a fixed average
		between the position of the first two layers.

		This script is provided "as is," without warranty of any kind, expressed
		or implied. In no event shall the author be held liable for any damages
		arising in any way from the use of this script.
**********************************************************************************************/
(function setToAvgPosition_Fixed () {
	var thisComp = app.project.activeItem;
	var userLayers = thisComp.selectedLayers

	var layer1 = userLayers[0];
	var layer2 = userLayers[1];
	var targetLayer = userLayers[2];

	var l1Pos = layer1.position.value;
	var l2Pos = layer2.position.value;
	var layerAvg = (l1Pos + l2Pos)/2;

	targetLayer.position.setValue(layerAvg)
})();
