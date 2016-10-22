function zl_updateDefaultImportFPS() {
	var prefs = app.preferences,
		appVersion = parseFloat(app.version),
		lastFPS = 30.0;

	if (appVersion >= 12.0)
		if (prefs.havePref("Import Options Preference Section", "Import Options Default Sequence FPS", PREFType.PREF_Type_MACHINE_INDEPENDENT))
			lastFPS = prefs.getPrefAsLong("Import Options Preference Section", "Import Options Default Sequence FPS", PREFType.PREF_Type_MACHINE_INDEPENDENT);
	else
		if (prefs.havePref("Import Options Preference Section", "Import Options Default Sequence FPS"))
			lastFPS = prefs.getPrefAsLong("Import Options Preference Section", "Import Options Default Sequence FPS");

    var newFPS = parseFloat(prompt("Enter a new framerate", lastFPS))

    if (!isNaN(newFPS)) {
        try {
            // Toggle the pref, save to disk, and reload so it's active in the current session
            if (appVersion >= 12.0)
                app.preferences.savePrefAsLong("Import Options Preference Section", "Import Options Default Sequence FPS", newFPS, PREFType.PREF_Type_MACHINE_INDEPENDENT);
            else
                app.preferences.savePrefAsLong("Import Options Preference Section", "Import Options Default Sequence FPS", newFPS);

            app.preferences.saveToDisk();
            app.preferences.reload();
        } catch (e) {
            alert(e);
        }
    } else {
        alert("No FPS entered!");
    }
};

zl_updateDefaultImportFPS();