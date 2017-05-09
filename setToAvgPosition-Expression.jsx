/**********************************************************************************************
	setToAvgPosition-Expression
	Copyright (c) 2017 Zack Lovatt. All rights reserved.
	zack@zacklovatt.com

	Name: Set to Average Position (Expression-Based)
	Version: 0.2

	Description:
		First, select the two layers that you want to get the average of.
		Then, select the third layer that you want to apply this to.

		This will add an expression on the third layer's position as a live average
		between the position of the first two layers.

		This script is provided "as is," without warranty of any kind, expressed
		or implied. In no event shall the author be held liable for any damages
		arising in any way from the use of this script.
**********************************************************************************************/
(function setToAvgPosition_Expression () {
	var thisComp = app.project.activeItem;
	var userLayers = thisComp.selectedLayers

	var layer1 = userLayers[0];
	var layer2 = userLayers[1];
	var targetLayer = userLayers[2];

	targetLayer.position.expression = "p1 = thisComp.layer(\"" + layer1.name + "\").transform.position; \rp2 = thisComp.layer(\"" + layer2.name + "\").transform.position;\r\r\r(p1+p2)/2;"
})();
