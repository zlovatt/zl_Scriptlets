/**
 * Forces Legacy Skin for all installed scripts
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.2.0
 */
(function forceLegacySkinForAllScripts() {
  // Quickly close & open _EVERY INSTALLED SCRIPT_ to update
  var closeOpenScripts = false;

  // Write success/fail to ESTK console for each
  var logSuccess = false;

  var scriptUIFiles = getScriptUIFiles();

  for (var i = 0, il = scriptUIFiles.length; i < il; i++) {
    var script = scriptUIFiles[i];
    var scriptFileName = script.displayName;
    var success = forceLegacySkin(scriptFileName);

    if (logSuccess) $.writeln(scriptFileName + ": " + success);
  }

  function checkAlias(folder) {
    // if a folder is an alias, return the proper folder
    if (folder.resolve() !== null) {
      return folder.resolve();
    }

    return folder;
  }

  function getScriptUIFiles() {
    var searchTerm = "*.jsx*"; // returns jsx and jsxbin files
    var aeVersion = parseFloat(app.version).toFixed(1);
    var isWindows = $.os.indexOf("Windows") !== -1;

    var aeFolder = checkAlias(Folder.appPackage);

    // get parent folder for macs
    if (!isWindows) aeFolder = checkAlias(aeFolder.parent);

    // Check the main install folder
    var scriptUIPanelPath = aeFolder.fullName + "/Scripts/ScriptUI Panels";
    var scriptUIPanelFolder = checkAlias(new Folder(scriptUIPanelPath));

    var scriptFiles = scriptUIPanelFolder.getFiles(searchTerm);

    // Now, check the no-admin user scriptUI folder on Windows
    if (isWindows) {
      var userScriptUIPath =
        checkAlias(Folder.userData).fullName +
        "/Adobe/After Effects/" +
        aeVersion +
        "/Scripts/ScriptUI Panels";
      var userScriptUIFolder = checkAlias(new Folder(userScriptUIPath));
      if (userScriptUIFolder.exists)
        scriptFiles = scriptFiles.concat(
          userScriptUIFolder.getFiles(searchTerm)
        );
    }

    return scriptFiles;
  }

  function forceLegacySkin(scriptFileName) {
    var commandID = app.findMenuCommandId(scriptFileName);

    try {
      if (
        !app.preferences.havePref(
          "Pref_SUI_PANEL_USES_LEGACY_SKIN",
          "Adobe Scripting-" + scriptFileName,
          PREFType.PREF_Type_MACHINE_INDEPENDENT
        )
      )
        return false;

      if (
        app.preferences.getPrefAsLong(
          "Pref_SUI_PANEL_USES_LEGACY_SKIN",
          "Adobe Scripting-" + scriptFileName,
          PREFType.PREF_Type_MACHINE_INDEPENDENT
        ) === 0
      )
        app.preferences.savePrefAsLong(
          "Pref_SUI_PANEL_USES_LEGACY_SKIN",
          "Adobe Scripting-" + scriptFileName,
          1,
          PREFType.PREF_Type_MACHINE_INDEPENDENT
        );
    } catch (e) {
      alert(e);
      return false;
    }

    app.preferences.saveToDisk();
    app.preferences.reload();

    if (closeOpenScripts) {
      app.executeCommand(commandID);
      app.executeCommand(commandID);
    }

    return true;
  }
})();
