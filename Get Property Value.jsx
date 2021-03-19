/**
 * Gets value of current property at current time.
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.2.0
 */
(function getPropertyValue(thisObj) {
  /**
   * Draws UI
   */
  function createUI() {
    var win =
      thisObj instanceof Panel
        ? thisObj
        : new Window("palette", "Get Property Value", undefined, {
            resizeable: true
          });
    win.add("statictext", undefined, "Current Property Value:");
    win.alignChildren = ["left", "top"];
    win.minimumSize = [50, 80];

    win.et = win.add("edittext", undefined, "", {
      multiline: true
    });
    win.et.minimumSize = [50, 30];
    win.et.alignment = ["fill", "fill"];

    var grpBtns = win.add("group");
    grpBtns.orientation = "row";
    grpBtns.alignChildren = ["left", "top"];

    var btnUpdate = grpBtns.add("button", undefined, "Update");
    btnUpdate.onClick = function () {
      try {
        win.et.text = getValue();
      } catch (e) {
        alert(e, "Get Property Value Error");
        return;
      }
    };

    var btnCopy = grpBtns.add(
      "button",
      undefined,
      "Copy to Clipboard (wait 2s)"
    );
    btnCopy.onClick = function () {
      copyToClipboard(win.et.text);
    };

    win.layout.layout();
    win.et.active = true;

    win.onResizing = win.onResize = function () {
      this.layout.resize();
    };
    return win;
  }

  /**
   * Copies text to clipboard (may not work in all cases!)
   *
   * @param {string} text Text to copy
   */
  function copyToClipboard(text) {
    var command = 'echo "' + text + '" | pbcopy';

    if ($.os.indexOf("Windows") > -1) {
      command = 'cmd.exe /c cmd.exe /c "echo ' + text + ' | clip"';
    }

    system.callSystem(command);
  }

  /**
   * Gets value of currently selected property
   *
   * @returns {string} Text value of property
   */
  function getValue() {
    var comp = app.project.activeItem;

    if (!(comp && comp instanceof CompItem)) {
      throw "Open a comp!";
    }

    var properties = comp.selectedProperties;

    if (properties.length === 0 || properties.length > 2) {
      throw "Select only 1 property!";
    }

    var last = properties.pop();
    var lastName = last.name.toString();

    if (
      last.propertyValueType === PropertyValueType.NO_VALUE ||
      last.propertyValueType === PropertyValueType.CUSTOM_VALUE ||
      last.propertyValueType === PropertyValueType.MARKER ||
      last.propertyValueType === PropertyValueType.SHAPE
    ) {
      throw "Can't read property '" + lastName.toString() + "'";
    }

    var value = last.valueAtTime(comp.time, false);

    return value.toString();
  }

  var gpvWindow = createUI();

  if (!gpvWindow) {
    return;
  }

  if (gpvWindow instanceof Window) {
    var initialValue;

    // run right away
    try {
      initialValue = getValue();
    } catch (e) {
      alert(e, "Get Property Value Error");
      return;
    }

    gpvWindow.et.text = initialValue;
    gpvWindow.show();
  } else {
    // launch panel
    gpvWindow.layout.layout(true);
  }
})(this);
