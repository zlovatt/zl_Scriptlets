/**
 * Toggles Javascript Debugger
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.2.1
 */
(function toggleJSDebugger() {
  var prefInfo = {
    section: 'Main Pref Section v2',
    key: 'Pref_JAVASCRIPT_DEBUGGER',
    file: PREFType.PREF_Type_MACHINE_INDEPENDENT,
  };

  var newSetting;

  try {
    // Toggle the pref, save to disk, and reload so it's active in the current session
    if (parseFloat(app.version) >= 12.0) {
      newSetting = +!(
        app.preferences.getPrefAsLong(
          prefInfo.section,
          prefInfo.key,
          prefInfo.file
        ) === 1
      );
      app.preferences.savePrefAsLong(
        prefInfo.section,
        prefInfo.key,
        newSetting,
        prefInfo.file
      );
    } else {
      prefInfo.section = 'Main Pref Section';

      newSetting = +!(
        app.preferences.getPrefAsLong(prefInfo.section, prefInfo.key) === 1
      );
      app.preferences.savePrefAsLong(
        prefInfo.section,
        prefInfo.key,
        newSetting
      );
    }

    app.preferences.saveToDisk();
    app.preferences.reload();

    if (newSetting === 0) {
      alert('Javascript Debugger Disabled');
    } else {
      alert('Javascript Debugger Enabled');
    }
  } catch (e) {
    alert('Can\'t change prefs!\n' + e);
  }
})();
