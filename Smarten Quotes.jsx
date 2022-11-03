/**
 * Convert flat to curly ("smart") quotes in your AE text layers
 *
 * Licensed under MIT as a requirement of the developer from whom the smartenQuotes function was adapted by.
 *
 *    The MIT License (MIT)
 *    Copyright (c) 2022 Zack Lovatt <zack@lova.tt>
 *    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function smartenQuotes() {
  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Select a text layer or open a comp!");
    return;
  }

  app.beginUndoGroup("Smarten Quotes");

  try {
    var layers = _getSelectedLayersOrAll(comp);

    for (var ii = 0, il = layers.length; ii < il; ii++) {
      var layer = layers[ii];

      if (!(layer instanceof TextLayer)) {
        continue;
      }

      var text = layer.text.sourceText;
      var smartened = smartenQuotes(text.value.text);
      text.setValue(smartened);
    }
  } catch (e) {
    alert(e);
  } finally {
    app.endUndoGroup();
  }

  /**
   * Converts quotes to smart quotes
   *
   * @author https://github.com/blakegarretson/smart-quotes-plus
   * @param {string} input String to smarten
   * @return {string}      Smartened string
   */
  function smartenQuotes(input) {
    var txt = input;

    var open_single = "\u2018";
    var close_single = "\u2019";
    var open_double = "\u201C";
    var close_double = "\u201D";

    var open_double_single = open_double + open_single;
    var open_single_double = open_single + open_double;

    var close_single_double = close_single + close_double;
    var close_double_single = close_double + close_single;

    // quotes
    txt = txt.replace(/"'(?=\w)/g, open_double_single);
    txt = txt.replace(/([\w\.\!\?\%,])'"/g, "$1" + close_single_double);
    txt = txt.replace(/'"(?=\w)/g, open_single_double);
    txt = txt.replace(/([\w\.\!\?\%,])"'/g, "$1" + close_double_single);
    txt = txt.replace(/"(?=\w)/g, open_double);
    txt = txt.replace(/([\w.!?%,])"/g, "$1" + close_double);
    txt = txt.replace(/([\w.!?%,])'/g, "$1" + close_single);

    // single tick use cases
    txt = txt.replace(/([\s])'(?=(tis\b|twas\b))/g, "$1" + close_single);
    txt = txt.replace(/(\s)'(?=[0-9]+s*\b)/g, "$1" + close_single);
    txt = txt.replace(/([^\w]|^)'(?=\w)/g, "$1" + open_single);

    // misc chars
    // txt = txt.replace(/([\w])---(?=[a-z])/g, "$1" + "—");
    // txt = txt.replace(/([0-9])--(?=[0-9])/g, "$1" + "–");

    return txt;
  }

  /**
   * Gets the selected layers in a given comp, or all
   *
   * @param {CompItem} comp Comp to get layers from
   * @return {Layer[]}      Layers
   */
  function _getSelectedLayersOrAll(comp) {
    var layers = comp.selectedLayers;

    if (layers.length === 0) {
      for (var ii = 1, il = comp.numLayers; ii <= il; ii++) {
        var layer = comp.layer(ii);
        layers.push(layer);
      }
    }

    return layers;
  }
})();
