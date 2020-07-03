/**
 * Toggles app brightness
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.2.1
 */
(function toggleAppBrightness() {
  var prefInfo = {
    section: 'Main Pref Section v2',
    key: 'User Interface Brightness (4) [0.0..1.0]',
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
    }

    app.preferences.saveToDisk();
    app.preferences.reload();

    if (newSetting === 0) {
      alert('AE Now Dark!');
    } else {
      alert('AE Now Light!');
    }
  } catch (e) {
    alert('Can\'t change prefs!\n' + e);
  }
})();
