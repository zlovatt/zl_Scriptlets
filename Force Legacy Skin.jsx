/**
 * Forces Legacy Skin for a given script
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.2.0
 */
(function forceLegacySkin() {
  /**
   * Sets setting and toggles panel
   *
   * @param {string} scriptName Script name to toggle
   */
  function forceLegacy(scriptName) {
    var commandID = app.findMenuCommandId(scriptFileName);

    try {
      if (
        !app.preferences.havePref(
          'Pref_SUI_PANEL_USES_LEGACY_SKIN',
          'Adobe Scripting-' + scriptFileName,
          PREFType.PREF_Type_MACHINE_INDEPENDENT
        )
      )
        return;

      if (
        app.preferences.getPrefAsLong(
          'Pref_SUI_PANEL_USES_LEGACY_SKIN',
          'Adobe Scripting-' + scriptFileName,
          PREFType.PREF_Type_MACHINE_INDEPENDENT
        ) === 0
      )
        app.preferences.savePrefAsLong(
          'Pref_SUI_PANEL_USES_LEGACY_SKIN',
          'Adobe Scripting-' + scriptFileName,
          1,
          PREFType.PREF_Type_MACHINE_INDEPENDENT
        );
    } catch (e) {
      alert(e);
      return;
    }

    app.preferences.saveToDisk();
    app.preferences.reload();

    app.executeCommand(commandID);
    app.executeCommand(commandID);
  }

  var scriptName = prompt(
    'Enter Script Name (exactly as it appears in Window)',
    'Explode Shape Layers.jsxbin'
  );
  forceLegacy(scriptName);
})();
