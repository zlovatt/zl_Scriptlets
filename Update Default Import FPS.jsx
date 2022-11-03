/**
 * Updates the default 'Import As' frame rate
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.2.1
 */
(function updateDefaultImportFPS() {
  var prefs = app.preferences;
  var appVersion = parseFloat(app.version);
  var lastFPS = 30.0;

  var prefInfo = {
    section: 'Import Options Preference Section',
    key: 'Import Options Default Sequence FPS',
    file: PREFType.PREF_Type_MACHINE_INDEPENDENT,
  };

  if (appVersion >= 12.0) {
    if (prefs.havePref(prefInfo.section, prefInfo.key, prefInfo.file)) {
      lastFPS = prefs.getPrefAsLong(
        prefInfo.section,
        prefInfo.key,
        prefInfo.file
      );
    }
  } else {
    if (prefs.havePref(prefInfo.section, prefInfo.key)) {
      lastFPS = prefs.getPrefAsLong(prefInfo.section, prefInfo.key);
    }
  }

  var newFPS = parseFloat(prompt('Enter a new framerate', lastFPS));

  if (isNaN(newFPS)) {
    alert('No FPS entered!');
    return;
  }

  try {
    if (appVersion >= 12.0) {
      app.preferences.savePrefAsLong(
        prefInfo.section,
        prefInfo.key,
        newFPS,
        prefInfo.file
      );
    } else {
      app.preferences.savePrefAsLong(prefInfo.section, prefInfo.key, newFPS);
    }

    app.preferences.saveToDisk();
    app.preferences.reload();
  } catch (e) {
    alert(e);
  }
})();
