(function getThingName() {
	var comp = app.project.activeItem;
	var layer = comp.selectedLayers[0];
	var props = comp.selectedProperties;
	var prop = props[0];

	alert(prop.name + " - " + prop.matchName);
})();