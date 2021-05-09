/**
 * Loads last autosave file, if one exists
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.1.0
 */
(function loadLastAutosave() {
  var autosaveFolderName = "Adobe After Effects Auto-Save";

  /**
   * Gets AE autosave directory
   *
   * @return {Folder} Autosave directory
   */
  function _getAutosaveDirectory() {
    var saveToCustom = app.preferences.getPrefAsBool(
      "Auto Save",
      "Save To Custom Location",
      PREFType.PREF_Type_MACHINE_INDEPENDENT
    );
    var autosavePath = "";

    if (saveToCustom) {
      autosavePath = app.preferences.getPrefAsString(
        "Auto Save",
        "Auto Save Folder",
        PREFType.PREF_Type_MACHINE_INDEPENDENT
      );
    } else {
      var aep = app.project.file;

      if (!aep) {
        throw new Error("AEP not saved!");
      }

      var aepDir = aep.parent;
      autosavePath = aepDir.fsName + "/" + autosaveFolderName;
    }

    var autosaveDir = new Folder(autosavePath);

    if (!autosaveDir.exists) {
      throw new Error(
        "Can't find autosave folder at " + autosaveDir.fsName + " !"
      );
    }

    return autosaveDir;
  }

  /**
   * Gets the newest file in a directory
   *
   * @param {Folder} directory Directory to get file from
   * @returns {File}           Newest file
   */
  function _getNewestFile(directory) {
    var files = directory.getFiles("*.aep");

    if (files.length === 0) {
      throw new Error("No autosave files in " + directory.fsName + " !");
    }

    var latestModified = new Date(0);
    var newestFile;

    var currentFilename;

    if (app.project.file) {
      currentFilename = app.project.file.displayName.split(".aep")[0];
    }

    for (var ii = 0, il = files.length; ii < il; ii++) {
      var file = files[ii];

      if (!(file instanceof File)) {
        continue;
      }

      if (currentFilename && file.displayName.indexOf(currentFilename) === -1) {
        continue;
      }

      if (file.modified > latestModified) {
        latestModified = file.modified;
        newestFile = file;
      }
    }

    return newestFile;
  }

  try {
    var autosaveDir = _getAutosaveDirectory();
    var newestFile = _getNewestFile(autosaveDir);

    app.open(newestFile);
  } catch (e) {
    alert(e);
  }
})();
