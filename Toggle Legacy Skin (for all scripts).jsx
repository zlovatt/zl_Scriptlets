/**
 * Toggles 'Legacy Skin' for all installed scripts.
 *
 * Set line 11 to 'enableLegacy = true' to ENABLE LEGACY SKIN.
 * Set line 11 to 'enableLegacy = false' to DISABLE LEGACY SKIN.
 *
 * Note that you'll need to close & relaunch your ScriptUI panels.
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.3.0
 */
(function toggleLegacySkinForAllScripts() {
  var enableLegacy = false;

  /**
   * Checks whether a folder is an alias, returns resolved route
   *
   * @param {Folder} folder Folder to check
   * @returns {Folder}      Resolved path
   */
  function checkAlias(folder) {
    if (folder.resolve() !== null) {
      return folder.resolve();
    }

    return folder;
  }

  /**
   * Gets array of all installed ScriptUI files
   *
   * @returns {File[]} Installed SUI Files
   */
  function getScriptUIFiles() {
    var searchTerm = "*.jsx*"; // returns jsx and jsxbin files
    var aeVersion = parseFloat(app.version).toFixed(1);
    var win = $.os.indexOf("Windows") !== -1;

    var aeFolder = checkAlias(Folder.appPackage);

    // get parent folder for macs
    if (!win) {
      aeFolder = checkAlias(aeFolder.parent);
    }

    // Check the main install folder
    var scriptUIPanelPath = aeFolder.fullName + "/Scripts/ScriptUI Panels";
    var scriptUIPanelFolder = checkAlias(new Folder(scriptUIPanelPath));

    var scriptFiles = scriptUIPanelFolder.getFiles(searchTerm);

    // Now, check the no-admin user scriptUI folder on Windows
    if (win) {
      var userScriptUIPath =
        checkAlias(Folder.userData).fullName +
        "/Adobe/After Effects/" +
        aeVersion +
        "/Scripts/ScriptUI Panels";
      var userScriptUIFolder = checkAlias(new Folder(userScriptUIPath));
      if (userScriptUIFolder.exists) {
        scriptFiles = scriptFiles.concat(
          userScriptUIFolder.getFiles(searchTerm)
        );
      }
    }

    return scriptFiles;
  }

  /**
   * Toggles preferences setting for a given script
   *
   * @param {string} scriptFileName JSX Filename
   * @returns {boolean}             Whether operation succeeded
   */
  function toggleLegacySkin(scriptFileName) {
    var prefSection = "Pref_SUI_PANEL_USES_LEGACY_SKIN";
    var prefKey = "Adobe Scripting-" + scriptFileName;
    var prefFile = PREFType.PREF_Type_MACHINE_INDEPENDENT;

    try {
      if (!app.preferences.havePref(prefSection, prefKey, prefFile)) {
        return false;
      }

      if (
        app.preferences.getPrefAsBool(prefSection, prefKey, prefFile) ===
        !enableLegacy
      ) {
        app.preferences.savePrefAsBool(
          prefSection,
          prefKey,
          enableLegacy,
          prefFile
        );
      }
    } catch (e) {
      alert(e);
      return false;
    }

    return true;
  }

  var scriptUIFiles = getScriptUIFiles();

  for (var ii = 0, il = scriptUIFiles.length; ii < il; ii++) {
    var script = scriptUIFiles[ii];
    var scriptFileName = script.displayName;

    toggleLegacySkin(scriptFileName);
  }

  app.preferences.saveToDisk();
  app.preferences.reload();
})();
