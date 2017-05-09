(function toggleAppBrightness() {
	// Do the work
	app.beginUndoGroup("Toggle App Brightness");

	try {
		var newSetting;

		// Toggle the pref, save to disk, and reload so it's active in the current session
		if (parseFloat(app.version) >= 12.0) {
			newSetting = +!(app.preferences.getPrefAsLong("Main Pref Section v2", "User Interface Brightness (4) [0.0..1.0]", PREFType.PREF_Type_MACHINE_INDEPENDENT) === 1);
			app.preferences.savePrefAsLong("Main Pref Section v2", "User Interface Brightness (4) [0.0..1.0]", newSetting, PREFType.PREF_Type_MACHINE_INDEPENDENT);
		}

		app.preferences.saveToDisk();
		app.preferences.reload();

		if (newSetting === 0)
			alert("AE Now Dark!");
		else
			alert("AE Now Light!");

	} catch (e) {
		alert("Can't change prefs!\n" + e);
	}

	app.endUndoGroup();
})();
