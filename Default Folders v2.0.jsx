/**
 * Creates a number of folders (or, if ran as a window, lets you customzie folder names to create)
 *
 * Based on DefaultFolders by Impudent1 from http://aenhancers.com/viewtopic.php?t=37
 *
 * If run via `Window`, Shows a UI to set folder names
 * If run via `File > Script`, creates folders from preferences
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 2.0.2
 */
(function defaultFolders(thisObj) {
  var defaultFolderNames = [
    "Cross Referenced Solids",
    "Pre Comps",
    "Source Footage",
    "Guides/Adjustment Layers",
    "Render Queue Comps",
    "Work In Progress"
  ];

  /**
   * Creates folders from folderNames array
   *
   * @param {String[]} folderNames Array of folder names to create
   */
  function createFolders(folderNames) {
    for (var ii = 0, il = folderNames.length; ii < il; ii++) {
      var folderName = folderNames[ii];

      if (folderName === "") continue;

      app.project.items.addFolder(folderName);
    }
  }

  /**
   * Gets folder names from prefs (if present), or defaults
   *
   * @returns {String[]} Array of folder names
   */
  function getFolderNames() {
    if (app.settings.haveSetting("DefaultFolderPrefs", "Folder1")) {
      return [
        app.settings.getSetting("DefaultFolderPrefs", "Folder1"),
        app.settings.getSetting("DefaultFolderPrefs", "Folder2"),
        app.settings.getSetting("DefaultFolderPrefs", "Folder3"),
        app.settings.getSetting("DefaultFolderPrefs", "Folder4"),
        app.settings.getSetting("DefaultFolderPrefs", "Folder5"),
        app.settings.getSetting("DefaultFolderPrefs", "Folder6")
      ];
    }

    return defaultFolderNames;
  }


  /**
   * Sets folder names to prefs from parameter
   *
   * @param {String[]} Array of folder names
   */
  function setFolderNames(folderNames) {
    for (var ii = 0, il = folderNames.length; ii < il; ii++) {
      app.settings.saveSetting("DefaultFolderPrefs", "Folder" + (ii + 1), folderNames[ii]);
    }
  }

  /**
   * Creates the UI
   *
   * @param {object} thisObj Environment
   * @returns {Window}       SUI Palette
   */
  function createUI(thisObj) {
    var win = thisObj instanceof Panel ? thisObj : new Window("palette", "Default Folders");

    win.add("statictext", undefined, "Set default project folders.");

    var grpFolders = win.add("group");
    grpFolders.orientation = "column";

    var folderNames = getFolderNames();
    for (var ii = 0, il = folderNames.length; ii < il; ii++) {
      var folderName = folderNames[ii];

      var etFolder = grpFolders.add(
        "edittext",
        undefined,
        folderName
      );

      etFolder.characters = 30;
    }

    var grpMeta = win.add("group");
    grpMeta.orientation = "row";

    var btnOK = grpMeta.add("button", undefined, "Create!");
    btnOK.onClick = function() {
      app.beginUndoGroup("Default Folder Maker");

      var uiFolderNames = [];
      for (var ii = 0, il = grpFolders.children.length; ii < il; ii++) {
        uiFolderNames.push(grpFolders.children[ii].text);
      }

      setFolderNames(uiFolderNames);
      createFolders(uiFolderNames);
      app.endUndoGroup();
    };

    var btnReset = grpMeta.add("button", undefined, "Reset");
    btnReset.onClick = function() {
      for (var ii = 0, il = grpFolders.children.length; ii < il; ii++) {
        var etFolder = grpFolders.children[ii];
        etFolder.text = defaultFolderNames[ii];
      }
    }

    return win;
  }

  var win = createUI(thisObj);

  if (win instanceof Window) {
    var folderNames = getFolderNames();
    createFolders(folderNames);
  } else {
    win.layout.layout(true);
  }
})(this);
