/**
 * "Simple" utility to search & replace fonts in a project.
 *
 * TO USE:
 *  - Open the panel & hit "Load Fonts" to get installed system fonts
 *    - If a text layer is selected, it'll set the "Search" dropdown to this font
 *  - Select a text layer and press "Get Selected Font" to set the "Search" font
 *  - Change the "Replace" font
 *  - Press "Replace" to replace all layers with "Search" font to the "Replace" font
 *    - If you have layers selected, it will only search in these layers
 *    - If you have no layers selected, it will search all layers in the comp
 *
 * Note:
 *  - this may not work in every case. Fonts are weird.
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
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function searchReplaceFonts(thisObj) {
  var ui = createUI(thisObj);
  ui.show();

  /**
   * Builds UI
   *
   * @returns {Window | Panel} Created window
   */
  function createUI(thisObj) {
    var win =
      thisObj instanceof Panel
        ? thisObj
        : new Window("palette", "Search/Replace Fonts", undefined, {
            resizeable: true
          });

    win.orientation = "column";
    win.margins = 5;
    win.spacing = 5;

    var pnlDropdowns = win.add("panel");
    pnlDropdowns.preferredSize.width = 300;
    pnlDropdowns.alignChildren = "fill";

    var grpSearch = pnlDropdowns.add("group");
    var stSearch = grpSearch.add("staticText", undefined, "Search:");
    stSearch.preferredSize.width = 50;

    var ddlSearch = grpSearch.add("dropdownlist", undefined, [
      "Press 'Load Fonts!'"
    ]);
    ddlSearch.alignment = ["fill", "fill"];
    ddlSearch.selection = 0;

    var grpReplace = pnlDropdowns.add("group");
    var stReplace = grpReplace.add("staticText", undefined, "Replace:");
    stReplace.preferredSize.width = 50;

    var ddlReplace = grpReplace.add("dropdownlist", undefined, [
      "Press 'Load Fonts!'"
    ]);
    ddlReplace.alignment = ["fill", "fill"];
    ddlReplace.selection = 0;

    var grpButtons = win.add("group");

    var btnLoad = grpButtons.add("button", undefined, "Load Font List");
    btnLoad.helpTip = "Refresh Fonts";
    btnLoad.onClick = function () {
      var fonts = _getInstalledFonts();

      if (fonts.length === 0) {
        alert("Couldn't load fonts!");
        return;
      }

      ddlSearch.removeAll();
      ddlReplace.removeAll();

      for (var ii = 0, il = fonts.length; ii < il; ii++) {
        var font = fonts[ii];
        ddlSearch.add("item", font);
        ddlReplace.add("item", font);
      }

      // Check whether there's a selected layer; if so, get its idx in the list
      var selectedFontName = _getSelectedFontName();

      if (selectedFontName) {
        var selectedFontIndex = _quickArrayIndexOf(fonts, selectedFontName);
        ddlSearch.selection = selectedFontIndex;
        ddlReplace.selection = selectedFontIndex;
      } else {
        ddlSearch.selection = 0;
        ddlReplace.selection = 0;
      }
    };

    var btnGet = grpButtons.add("button", undefined, "Get Selected Font");
    btnGet.helpTip = "Get the font of the currently-selected layer";
    btnGet.onClick = function () {
      var selectedFontName = _getSelectedFontName();

      $.writeln(selectedFontName);

      if (!selectedFontName) {
        alert("Select a text layer!");
        return;
      }

      var itemsText = _getListItemsText(ddlSearch);
      var selectedFontIndex = _quickArrayIndexOf(itemsText, selectedFontName);

      if (selectedFontIndex > -1) {
        ddlSearch.selection = selectedFontIndex;
      }
    };

    var btnReplace = grpButtons.add("button", undefined, "Replace");
    btnReplace.helpTip = "Replace font in selected layer(s)";
    btnReplace.onClick = function () {
      var ddlSearchItem = ddlSearch.selection;

      if (!ddlSearchItem) {
        alert("Select font to search!");
        return;
      }

      var ddlReplaceItem = ddlReplace.selection;

      if (!ddlReplaceItem) {
        alert("Select font to replace!");
        return;
      }

      var searchFont = ddlSearchItem.text;
      var replaceFont = ddlReplaceItem.text;

      _replaceFonts(searchFont, replaceFont);
    };

    return win;
  }

  /**
   * Replaces fonts in selected layers that match search & replace names
   *
   * @param {string} search  Font name to search for
   * @param {string} replace Font name to replace with
   */
  function _replaceFonts(search, replace) {
    var comp = app.project.activeItem;

    if (!(comp && comp instanceof CompItem)) {
      alert("Select a text layer or open a comp!");
      return;
    }

    app.beginUndoGroup("Search/Replace Fonts");

    try {
      var layers = _getSelectedLayersOrAll(comp);

      for (var ii = 0, il = layers.length; ii < il; ii++) {
        var layer = layers[ii];

        var font = _getLayerFontName(layer);

        if (!font || font !== search) {
          continue;
        }

        var sourceText = layer.text.sourceText;
        var textDoc = sourceText.value;

        textDoc.font = replace;
        sourceText.setValue(textDoc);
      }
    } catch (e) {
      alert(e);
    } finally {
      app.endUndoGroup();
    }
  }

  /**
   * Gets the font name for the selected layer, if text layer
   *
   * @return {string} Selected layer font name
   */
  function _getSelectedFontName() {
    $.writeln("--> _getSelectedFontName");
    var comp = app.project.activeItem;

    if (!(comp && comp instanceof CompItem)) {
      return;
    }

    var layer = comp.selectedLayers[0];
    var layerFontName = _getLayerFontName(layer);

    $.writeln("<-- _getSelectedFontName: " + layerFontName);
    return layerFontName;
  }

  /**
   * Gets an array of strings from a listbox's items
   *
   * @param {List} list SUI List
   * @return {string[]} Collect of list labels
   */
  function _getListItemsText(list) {
    var itemsText = [];
    var items = list.items;

    for (var ii = 0, il = items.length; ii < il; ii++) {
      var item = items[ii];
      itemsText.push(item.text);
    }

    return itemsText;
  }

  /**
   * Gets the font name for a given layer
   *
   * @param {Layer} layer Layer to get name from
   * @return {string}     Layer name
   */
  function _getLayerFontName(layer) {
    $.writeln("--> _getLayerFontName: " + (layer ? layer.name : "NO LAYER"));
    if (!(layer && layer instanceof TextLayer)) {
      return;
    }

    var sourceText = layer.text.sourceText;
    var textDoc = sourceText.value;
    var layerFontName = textDoc.font;

    $.writeln("<-- _getLayerFontName: " + layerFontName);
    return layerFontName;
  }

  /**
   * Gets PS names from fonts in a folder
   *
   * @param {Folder} folder Folder to search
   * @param {string} filter File filter
   * @returns {string[]}    Array of font PS names
   */
  function _getPSNamesFromFolder(folder) {
    $.writeln("--> _getPSNamesFromFolder: " + folder.fsName);

    var psNames = [];

    var files = folder.getFiles();

    for (var ii = 0, il = files.length; ii < il; ii++) {
      var file = files[ii];

      if (!(file instanceof File)) {
        continue;
      }

      var psName = _getFontPSName(file);

      if (!psName) {
        continue;
      }

      psNames.push(psName);
    }

    $.writeln("<-- _getPSNamesFromFolder: " + psNames.length);
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
  function _getFontPSName(fontFile) {
    function getPSName(r){function e(r){var e=256*r.readch().charCodeAt(0);return e+=r.readch().charCodeAt(0)}function a(r){for(var e=0,a=16777216,t=0;t<4;t++)e+=r.readch().charCodeAt(0)*a,a/=256;return e}function t(r){var e=r.readch().charCodeAt(0),a=e<<8;return a+=e=r.readch().charCodeAt(0)}try{var c=function(e){for(j=0;j<e;j++){for(dat=["",0,0,0],i=0;i<4;i++)dat[0]+=r.readch();if(dat[1]=a(r),dat[2]=a(r),dat[3]=a(r),"name"==dat[0])return dat}}(function(){var e,a=["",0,0,0,0],c=r.readch();if("O"==c)for(a[0]=c,i=0;i<3;i++)a[0]+=r.readch();else for(a[0]="0x0"+c.charCodeAt(0).toString(16),i=0;i<3;i++)1==(e=(c=r.readch()).charCodeAt(0).toString(16)).length&&(e="0"+e),a[0]+=e;return a[1]=t(r),a[2]=t(r),a[3]=t(r),a[4]=t(r),a}()[1]);if(!c){return}r.seek(c[2]);for(var d=[],h="",o=0,n=(e(r),e(r)),f=e(r),i=0;i<n&&6!=(d=[e(r),e(r),e(r),e(r),e(r),e(r)+f+c[2]])[3];i++);if(r.seek(d[5]),0==(h+=r.readch()).charCodeAt(0))for(h=r.readch(),o=1;o<d[4]/2;o++)r.readch(),h+=r.readch();else for(o=0;o<d[4] - 1;o++)h+=r.readch();return h}catch(r){alert(r)}}

    var psName;

    fontFile.encoding = "BINARY";

    try {
      if (fontFile.open("r")) {
        psName = getPSName(fontFile);
      }
    } catch (e) {
    } finally {
      fontFile.close();
    }

    return psName;
  }

  /**
   * Gets system font folder paths
   *
   * @return {string[]} Paths to system font folders
   */
  function _getFontFolderPaths() {
    var userFontFolder = "~/Library/Fonts";
    var systemFontFolder = "/System/Library/Fonts";

    if ($.os.indexOf("Windows") > -1) {
      userFontFolder = "~/AppData/Local/Microsoft/Windows/Fonts";
      systemFontFolder = "C:/Windows/Fonts";
    }

    return [userFontFolder, systemFontFolder];
  }

  /**
   * Gets all installed fonts on your system
   *
   * @return {string[]}
   */
  function _getInstalledFonts() {
    $.writeln("--> _getInstalledFonts");

    var fontFolders = _getFontFolderPaths();
    var fonts = [];

    for (var ii = 0, il = fontFolders.length; ii < il; ii++) {
      var fontFolderPath = fontFolders[ii];
      var fontFolder = new Folder(fontFolderPath);

      if (!fontFolder.exists) {
        continue;
      }

      var folderFonts = _getPSNamesFromFolder(fontFolder);
      fonts = fonts.concat(folderFonts);
    }

    // Sort the list
    fonts.sort(function (a, b) {
      return a > b;
    });

    // Deduplicate the list
    var deduplicatedFonts = _deduplicateArray(fonts);

    $.writeln("<-- _getInstalledFonts: " + deduplicatedFonts.length);
    return deduplicatedFonts;
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

  /**
   * Naive array deduplication method, ensuring each item only appears once
   *
   * @param {any[]} array Array to deduplicate
   * @return {any[]}      Deduplicated array
   */
  function _deduplicateArray(array) {
    $.writeln("--> _deduplicateArray: " + array.length);
    var deduplicated = [];
    var arrayObj = {};

    for (var ii = 0, il = array.length; ii < il; ii++) {
      var item = array[ii];

      // If we've found it, skip
      if (arrayObj.hasOwnProperty(item)) {
        continue;
      }

      arrayObj[item] = true;
      deduplicated.push(item);
    }

    $.writeln("<-- _deduplicateArray: " + deduplicated.length);
    return deduplicated;
  }

  /**
   * Quick & easy array.indexOf
   *
   * @param {any[]} array       Array to search
   * @param {any} searchElement Element to search in array
   * @return {number}           Index of element in array
   */
  function _quickArrayIndexOf(array, searchElement) {
    for (var ii = 0, il = array.length; ii < il; ii++) {
      var element = array[ii];

      if (element === searchElement) {
        return ii;
      }
    }

    return -1;
  }
})(this);
