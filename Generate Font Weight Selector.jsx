/**
 * Looks at an existing text layer, and tries to create an expression to select
 * font weight, based on the existing text layer's font.
 *
 * TO USE:
 *  - Select a text layer
 *  - Run script
 *  - It will create a slider on the text layer, and an expression on sourceText
 *  - The expression will list all available font weights it can detect!
 *  - Animate / play with the slider, from 1 -> # of font weights in the list
 *
 * Note:
 *  - this may not work in every case. Fonts are weird.
 *  - this relies on CC 2019+.
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.1.0
 */
(function generateFontWeightSelector() {
  if (parseFloat(app.version) < 16.0) {
    alert('This script only works in CC 2019 (16.0) or higher!');
    return;
  }

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert('Select a text layer!');
    return;
  }

  var layer = comp.selectedLayers[0];

  if (!(layer && layer instanceof TextLayer)) {
    alert('Select a text layer!');
    return;
  }

  app.beginUndoGroup('Generate Weight Slider Expression');

  var sourceText = layer.text.sourceText;
  sourceText.expressionEnabled = false;

  var textDoc = sourceText.value;
  var weights = getWeightsFromTextDoc(textDoc);

  // Force new expression engine
  app.expressionEngine = "javascript-1.0";

  buildWeightSlider(layer);
  buildWeightSliderExpression(sourceText, weights);

  app.endUndoGroup();

  /**
   * Builds a slider on a layer
   *
   * @param {Layer} layer Layer to build slider on
   */
  function buildWeightSlider(layer) {
    var effects = layer.property('ADBE Effect Parade');

    if (effects.numProperties > 0) {
      for (var ii = 1, il = effects.numProperties; ii <= il; ii++) {
        var effect = effects.property(ii);
        if (effect.name === 'Weight Selection') {
          return;
        }
      }
    }

    var weightSlider = effects.addProperty('ADBE Slider Control');
    weightSlider.name = 'Weight Selection';
    weightSlider.property(1).setValue(1);
    // weightSlider.property(1).expression = 'clamp(Math.floor(value), 1, ' + weights.length + ');';
  }

  /**
   * Builds weight slider expression from weights list
   *
   * @param {Property} sourceText Source text property to put expression on
   * @param {string[]} weightList Weight names
   */
  function buildWeightSliderExpression(sourceText, weightList) {
    var expressionTemplateHeader = [
      'var weightSelection = effect("Weight Selection")("Slider").value;',
      'var weights = [',
      ''
    ].join('\n');
    var expressionTemplateFooter = [
      '',
      '];',
      '',
      'var newStyle = text.sourceText.createStyle();',
      'var selected = weights[Math.floor(weightSelection) - 1];',
      '',
      'newStyle.setFont(selected);',
    ].join('\n');

    var formattedWeightList = [];

    for (var ii = 0, il = weightList.length; ii < il; ii++) {
      var weight = weightList[ii];
      formattedWeightList.push('  "' + weight + '",');
    }

    sourceText.expression =
      expressionTemplateHeader +
      formattedWeightList.join('\n') +
      expressionTemplateFooter;
  }

  /**
   * Gets stripped filenames of files in a folder
   *
   * @param {Folder} folder Folder to search
   * @param {string} filter File filter
   * @returns {string[]}    Array of files matching filter
   */
  function getFilenamesFromRoot(folder, filter) {
    var filenames = [];

    var files = folder.getFiles(filter);

    for (var ii = 0, il = files.length; ii < il; ii++) {
      var filename = files[ii].displayName;
      var strippedFilename = filename.substr(
        0,
        filename.lastIndexOf('.')
      );

      filenames.push(strippedFilename);
    }

    return filenames;
  }

  /**
   * Gets filenames from a folder with specified delimiter
   *
   * @param {Folder} folder       Folder to look in
   * @param {string} rootFilename Root filename to check for
   * @param {string} [delimiter]  Delimiter to use
   * @returns {string[]}          Matching filenames
   */
  function getFilenamesWithDelimiter(folder, rootFilename, delimiter) {
    var root = rootFilename.split(delimiter)[0];

    if (typeof delimiter === 'undefined') {
      root = rootFilename;
      delimiter = '';
    }

    var filter = root + delimiter + '*';
    var filenames = getFilenamesFromRoot(folder, filter);

    return filenames;
  }

  /**
   * Gets weight names from a textdoc
   *
   * @param {TextDocument} textDoc TextDoc to get weights from
   * @returns {string[]}           Weight names
   */
  function getWeightsFromTextDoc(textDoc) {
    var font = textDoc.font;
    var loc = textDoc.fontLocation;

    var fontObj = new File(loc);
    if (!fontObj) {
      alert('Can\'t find location of font ' + loc);
      return;
    }

    var fontFolder = fontObj.parent;

    // Pass 1 -- "MyFont-Weight"
    var weights = getFilenamesWithDelimiter(fontFolder, font, '-');

    if (weights.length > 0) {
      return weights;
    }

    // Pass 2 -- "MyFont Weight"
    weights = getFilenamesWithDelimiter(fontFolder, font, ' ');

    if (weights.length > 0) {
      return weights;
    }

    // Pass 3 -- "MyFontWeight"
    weights = getFilenamesWithDelimiter(fontFolder, font);

    if (weights.length > 0) {
      return weights;
    }

    // Pass 4 -- "MyFont" (without any suffix; this is a fallback)
    alert('Couldn\'t find any weights. If you\'re SURE they exist, you\'ll have to make your own list. Sorry!');
    return [font];
  }
})();
