/**
 * Adobe Illustrator script to resize the current artboard & all artwork within it.
 *
 * Note that if you provide a new resolution in a different aspect ratio, stroke widths will be scaled disproportionately!
 *
 * Based on "Illustrator_Scale_Artboard_and_Artwork.jsx" by Shivendra Agarwal from https://gist.github.com/shivendra14/f135d6279a20053a62a798be5da5e174
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.3.2
 */
(function resizeAIArtboard () {
  try {
    var userDimensions = getNewDimensions();
    resizeArtboardAndArtwork(userDimensions);
  } catch (e) {
    alert(e, "Resize AI Artboard");
  }

  /**
   * Size and placement data for an object
  *
   * @typedef Bounds
   * @type {object}
   * @property {number} left   Left bound
   * @property {number} top    Top bound
   * @property {number} width  Width of the object
   * @property {number} height Height of the object
   */

  /**
   * Data containing scale factors between two objects
   *
   * @typedef ScaleFactor
   * @type {object}
   * @property {number} factor Area-based scaling factor
   * @property {number} width  Width of the object
   * @property {number} height Height of the object
   */

  /**
   * Gets new width and height value from user
   *
   * @return {Dimensions}
   */
  function getNewDimensions() {
    var newUserSize = prompt(
      "Enter new width and height, separated by commas",
      "1920,1080",
      "Artboard Resizer"
    );

    if (!newUserSize) {
      return;
    }

    var parsedUserInput = newUserSize.split(",");

    if (parsedUserInput.length !== 2) {
      throw new Error("Enter only 2 values, separated by commas!");
    }

    var userWidth = parseInt(parsedUserInput[0], 10);
    var userHeight = parseInt(parsedUserInput[1], 10);

    if (
      isNaN(userWidth) ||
      isNaN(userHeight) ||
      userWidth <= 0 ||
      userHeight <= 0
    ) {
      throw new Error("Enter valid width & height values!");
    }

    return {
      width: userWidth,
      height: userHeight
    };
  }

  /**
   * Resizes current artboard and containing art
   *
   * @param {Dimensions} newArtboardDimensions New size to set artboard to
   */
  function resizeArtboardAndArtwork(newArtboardDimensions) {
    var activeDoc = app.activeDocument;
    var artboards = activeDoc.artboards;

    if (
      artboards.length > 1 &&
      !confirm("This tool can only operate on the active artboard. Proceed?")
    ) {
      return;
    }

    var activeArtboard = artboards[artboards.getActiveArtboardIndex()];

    var artboardBounds = getArtboardBounds(activeArtboard);
    var scaleFactors = getScaleFactors(artboardBounds, newArtboardDimensions);

    var artboardXOffset = -1 * (artboardBounds.left + artboardBounds.width / 2);
    var artboardYOffset = -1 * (artboardBounds.top - artboardBounds.height / 2);

    var lockedLayers = {};
    var lockedItems = {};
    var hiddenLayers = {};
    var hiddenItems = {};
    var pageItems = activeDoc.pageItems;

    // Store item state for all items;
    // unlock and unhide eligible items
    // select eligible items, to only scale these
    for (var ii = 0, il = pageItems.length; ii < il; ii++) {
      var item = pageItems[ii];
      var layer = item.layer;

      if (!layer.visible) {
        hiddenLayers[layer.zOrderPosition] = true;
      }

      layer.visible = true;

      if (layer.locked) {
        lockedLayers[layer.zOrderPosition] = true;
      }

      layer.locked = false;

      if (item.hidden) {
        hiddenItems[item.uuid] = true;
      }

      item.hidden = false;

      if (item.locked) {
        lockedItems[item.uuid] = true;
      }

      item.locked = false;

      pageItems[ii].selected = true;
    }

    // Scale and translate selectable artwork
    var selectedItems = activeDoc.selection;
    if (selectedItems.length > 0) {
      for (var ii = 0, il = selectedItems.length; ii < il; ii++) {
        var item = selectedItems[ii];

        item.translate(
          artboardXOffset,
          artboardYOffset,
          true,
          true,
          true,
          true
        );

        item.resize(
          scaleFactors.width * 100,
          scaleFactors.height * 100,
          true,
          true,
          true,
          true,
          scaleFactors.factor * 100,
          Transformation.DOCUMENTORIGIN
        );
      }
    }

    // Reset items
    for (var ii = 0, il = pageItems.length; ii < il; ii++) {
      var item = pageItems[ii];

      item.selected = false;

      var layer = item.layer;
      var uuid = item.uuid;

      if (hiddenItems.hasOwnProperty(uuid)) {
        item.hidden = true;
      }

      if (lockedItems.hasOwnProperty(uuid)) {
        item.locked = true;
      }
    }

    // Reset layers
    for (var ii = 0, il = activeDoc.layers.length; ii < il; ii++) {
      var layer = activeDoc.layers[ii];

      if (hiddenLayers.hasOwnProperty(layer.zOrderPosition)) {
        layer.visible = false;
      }

      if (lockedLayers.hasOwnProperty(layer.zOrderPosition)) {
        layer.locked = true;
      }
    }


    // Rebuild artboard
    var scaledArtboardRect = buildRectangleBounds(
      (-artboardBounds.width / 2) * scaleFactors.width,
      (-artboardBounds.height / 2) * scaleFactors.height,
      artboardBounds.width * scaleFactors.width,
      artboardBounds.height * scaleFactors.height
    );

    artboards.add(scaledArtboardRect);
    activeArtboard.remove();

    // Zoom to fit
    app.executeMenuCommand("fitall");
  }

  /**
   * Gets all scale factors based on current and target artboard size
   *
   * @param {Bounds} currentBounds Bounds for current artboard
   * @param {Size} newArtboardSize Target artboard size
   * @return {ScaleFactor}         Amount to scale various properties
   */
  function getScaleFactors(currentBounds, newArtboardSize) {
    var currentArea = currentBounds.width * currentBounds.height;
    var newArea = newArtboardSize.width * newArtboardSize.height;

    var scaleFactor = Math.sqrt(newArea / currentArea);

    return {
      factor: scaleFactor,
      width: newArtboardSize.width / currentBounds.width,
      height: newArtboardSize.height / currentBounds.height
    };
  }

  /**
   * Gets the bounds from the current artboard
   *
   * @param {Artboard} artboard Artboard to get bounds of
   * @return {Bounds}           Bounds of the artboard
   */
  function getArtboardBounds(artboard) {
    var bounds = artboard.artboardRect;

    var left = bounds[0];
    var top = bounds[1];
    var right = bounds[2];
    var bottom = bounds[3];
    var width = right - left;
    var height = top - bottom;

    return {
      left: left,
      top: top,
      width: width,
      height: height
    };
  }

  /**
   * Builds rectangle bounds from provided values
   *
   * @param {number} x      X position to create rectangle at
   * @param {number} y      Y position to create rectangle at
   * @param {number} width  Width of rectangle
   * @param {number} height Height of rectangle
   * @return {number[]}     Rectangle creation properties from given details
   */
  function buildRectangleBounds(x, y, width, height) {
    var left = 0;
    var top = 1;
    var right = 2;
    var bottom = 3;

    var rect = [];

    rect[left] = x;
    rect[top] = -y;
    rect[right] = width + x;
    rect[bottom] = -(height - rect[top]);

    return rect;
  }


})();
