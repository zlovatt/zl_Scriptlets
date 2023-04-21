/**
 * Changes the background colour of all selected comps to the specified hex value
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function changeSelectedCompsBackground() {
  var selectedComps = app.project.selection;

  if (selectedComps.length === 0) {
    alert("Please select a composition!");
    return;
  }

  var userColour = _getUserColour();

  if (!userColour) {
    alert("Enter a valid hex value!");
    return;
  }

  app.beginUndoGroup("Change Selected Comps Background");

  try {
    changeCompsBackground(selectedComps, userColour);
  } catch (e) {
    alert(e, "Change Selected Comps Background");
  } finally {
    app.endUndoGroup();
  }

  /**
   * Changes colour of selected comps to user-specified colour
   *
   * @param {Item[]} selectedComps Collection of items
   * @param {ThreeDColorValue} rgb Colour to change to
   */
  function changeCompsBackground(selectedComps, rgb) {
    for (var ii = 0, il = selectedComps.length; ii < il; ii++) {
      var comp = selectedComps[ii];

      if (!(comp instanceof CompItem)) {
        continue;
      }

      comp.bgColor = rgb;
    }
  }

  /**
   * Gets user colour hex
   *
   * @return {ThreeDColorValue | null} User colour as number array
   */
  function _getUserColour() {
    var userColour = prompt(
      "Enter desired hex value",
      "#888888",
      "Change Selected Comps Background"
    );

    if (!userColour || !_isValidHex(userColour)) {
      return null;
    }

    return _hexToRgb(userColour);
  }

  /**
   * Checks whether hex string is valid
   *
   * @param {string} hexString Hex string to check
   * @return {boolean}         Whether it's valid
   */
  function _isValidHex(hexString) {
    var hasHash = hexString.indexOf("#") > -1;

    if (hasHash && hexString.length !== 7) {
      return false;
    }

    if (!hasHash && hexString.length !== 6) {
      return false;
    }

    var colour = _hexToRgb(hexString);

    for (var ii = 0, il = colour.length; ii < il; ii++) {
      var colourValue = colour[ii];

      if (isNaN(colourValue)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Converts hex string to RGB array
   *
   * @param {string} hex   Hex string
   * @returns {ThreeDColorValue} RGB
   */
  function _hexToRgb(hex) {
    var fallback = [1, 1, 1];
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) {
      /** @ts-ignore */
      return fallback;
    }

    return [
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255
    ];
  }
})();
