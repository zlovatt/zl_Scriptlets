/**
 * Provides a panel to quickly create a populated dropdown effect on a layer
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function createDropdownFromText(thisObj) {
  if (parseFloat(app.version) < 17.0) {
    alert("This script requires AE 17.0 or newer to run!");
    return;
  }

  var ui = _createUI(thisObj);
  ui.show();

  /**
   * Builds UI
   *
   * @returns {Window | Panel} Created window
   */
  function _createUI(thisObj) {
    var win =
      thisObj instanceof Panel
        ? thisObj
        : new Window("palette", "Create Dropdown from Text", undefined, {
            resizeable: true
          });

    win.orientation = "column";
    win.margins = 5;
    win.spacing = 5;

    var pnlText = win.add("panel");
    pnlText.preferredSize.width = 300;
    pnlText.alignChildren = "fill";

    pnlText.add("statictext", undefined, "Enter items below, one line per item.");
    pnlText.add("statictext", undefined, "For a separator, use: (-");

    var etInput = pnlText.add(
      "edittext",
      undefined,
      ["Enter", "Items", "Here"].join("\n"),
      { multiline: true }
    );

    var btnCreateDropdown = win.add(
      "button",
      undefined,
      "Create Dropdown From Text"
    );
    btnCreateDropdown.onClick = function () {
      // Trim the input
      var input = etInput.text.replace(/^\s+|\s+$/g, "");

      // Break it into lines
      var inputSplit = input.replace(/\n\r|\n|\r/gm, "||||").split("||||");

      // Check for empty text or empty split
      if (input == "" || inputSplit.length == 0) {
        alert("Enter some text!");
        return;
      }

      // Validate vs AE rules
      if (input.indexOf("|") > -1) {
        alert("Text can't contain pipe symbol ('|')!");
        return;
      }

      _createDropdown(inputSplit);
    };

    return win;
  }

  /**
   * Creates a dropdown controller on the given layer with provided text
   *
   * @param {string[]} text Multiline text to create with
   */
  function _createDropdown(text) {
    var comp = app.project.activeItem;

    if (!(comp && comp instanceof CompItem)) {
      alert("Open a comp!", "Create Dropdown from Text");
      return;
    }

    var layer = comp.selectedLayers[0];

    if (!(layer && layer instanceof AVLayer)) {
      alert("Select a layer!");
      return;
    }

    app.beginUndoGroup("Create Dropdown from Text");

    try {
      // Create the dropdown effect & name it
      var dropdownEffect = layer.effect.addProperty("ADBE Dropdown Control");
      var updatedDropdown = dropdownEffect
        .property(1)
        .setPropertyParameters(text);
      updatedDropdown.propertyGroup(1).name = "Created Dropdown";
    } catch (e) {
      alert(e, "Create Dropdown from Text");
    } finally {
      app.endUndoGroup();
    }
  }
})(this);
