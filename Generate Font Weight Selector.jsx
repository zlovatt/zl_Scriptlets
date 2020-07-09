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
 * Font PSName from https://github.com/ten-A/Extend_Script_experimentals,
 * licensed under MIT:
 *
 *    The MIT License (MIT)
 *    Copyright (c) 2016 Ten
 *    Permission is hereby granted, free of charge, to any person obtaining a copy of those softwares and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.2.0
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

  buildWeightSlider(layer, weights.length);
  buildWeightSliderExpression(sourceText, weights);

  app.endUndoGroup();

  /**
   * Builds a slider on a layer
   *
   * @param {Layer} layer       Layer to build slider on
   * @param {number} numWeights Number of found weights
   */
  function buildWeightSlider(layer, numWeights) {
    var comp = layer.containingComp;
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
    weightSlider.property(1).setValuesAtTimes([
      0,
      comp.duration - 1 / comp.frameRate
    ],
    [
      1,
      numWeights
    ]);
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
   * Gets PS names from fonts in a folder
   *
   * @param {Folder} folder Folder to search
   * @param {string} filter File filter
   * @returns {string[]}    Array of font PS names
   */
  function getPSNamesFromFolder(folder, filter) {
    var psNames = [];

    var files = folder.getFiles(filter);

    for (var ii = 0, il = files.length; ii < il; ii++) {
      var file = files[ii];
      var psName = getFontPSName(file);
      psNames.push(psName);
    }

    return psNames;
  }

  /**
   * Gets font PS name from a file
   *
   * @author Ten <https://github.com/ten-A/Extend_Script_experimentals>
   * @copyright 2016 Ten
   * @param {File} fontFile        Font file to get info from
   * @returns {string | undefined} PS Name for file
   */
  function getFontPSName(fontFile) {
    function getPSName(r){function e(r){var e=256*r.readch().charCodeAt(0);return e+=r.readch().charCodeAt(0)}function a(r){for(var e=0,a=16777216,t=0;t<4;t++)e+=r.readch().charCodeAt(0)*a,a/=256;return e}function t(r){var e=r.readch().charCodeAt(0),a=e<<8;return a+=e=r.readch().charCodeAt(0)}try{var c=function(e){for(j=0;j<e;j++){for(dat=["",0,0,0],i=0;i<4;i++)dat[0]+=r.readch();if(dat[1]=a(r),dat[2]=a(r),dat[3]=a(r),"name"==dat[0])return dat}}(function(){var e,a=["",0,0,0,0],c=r.readch();if("O"==c)for(a[0]=c,i=0;i<3;i++)a[0]+=r.readch();else for(a[0]="0x0"+c.charCodeAt(0).toString(16),i=0;i<3;i++)1==(e=(c=r.readch()).charCodeAt(0).toString(16)).length&&(e="0"+e),a[0]+=e;return a[1]=t(r),a[2]=t(r),a[3]=t(r),a[4]=t(r),a}()[1]);r.seek(c[2]);for(var d=[],h="",o=0,n=(e(r),e(r)),f=e(r),i=0;i<n&&6!=(d=[e(r),e(r),e(r),e(r),e(r),e(r)+f+c[2]])[3];i++);if(r.seek(d[5]),0==(h+=r.readch()).charCodeAt(0))for(h=r.readch(),o=1;o<d[4]/2;o++)r.readch(),h+=r.readch(),$.writeln(h.charCodeAt(o));else for(o=0;o<d[4] - 1;o++)h+=r.readch();return h}catch(r){alert(r)}}

    var psName;

    fontFile.encoding = 'BINARY';

    try {
      if (fontFile.open('r')) {
        psName = getPSName(fontFile);
      }
    } catch (e) {
    } finally {
      fontFile.close();
    }

    return psName;
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
    var filenames = getPSNamesFromFolder(folder, filter);

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
