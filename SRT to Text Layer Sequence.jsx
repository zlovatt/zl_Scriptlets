/**
 * SRT to Text Layers
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.1.2
 */
(function subtitleFileToTextLayerSequenceComp() {
  var compOptions = {
    width: 4096,
    height: 2304,
    fps: 23.976
  };

  app.beginUndoGroup("Set to Average Position");

  try {
    var subtitleFiles = getSubtitleFiles();
    var subtitleData = getFilesData(subtitleFiles);
    generateSubtitleComps(subtitleData, compOptions);
  } catch (e) {
    alert(e);
  } finally {
    app.endUndoGroup();
  }

  /**
   * Gets text data from received files
   *
   * @param {File[]} subtitleFiles              Subtitle files to parse
   * @return {{name: string, text: string[]}[]} Subtitle data
   */
  function getFilesData(subtitleFiles) {
    var subtitleData = [];

    for (var ii = 0, il = subtitleFiles.length; ii < il; ii++) {
      var subtitleFile = subtitleFiles[ii];
      var fileData = parseSubtitleFile(subtitleFile);

      subtitleData.push(fileData);
    }

    return subtitleData;
  }

  /**
   * Parses text from a given file into data
   *
   * @param {File} subtitleFile               Subtitle file to parse
   * @return {{name: string, text: string[]}} Subtitle data for this file
   */
  function parseSubtitleFile(subtitleFile) {
    var filenameNoExtension = subtitleFile.name.replace(/\.[^\/.]+$/, "")

    var subtitleData = {
      name: filenameNoExtension,
      text: []
    };

    subtitleFile.open("r");
    var contents = subtitleFile.read();
    subtitleFile.close();

    var subtitleDataStart = "<begin subtitles>";
    var subtitleDataEnd = "<end subtitles>";

    var contentsCropped = contents.substring(
      contents.indexOf(subtitleDataStart) + subtitleDataStart.length,
      contents.indexOf(subtitleDataEnd)
    );

    var contentsSplit = contentsCropped.split(/\s+^\d.+\s+/gm);

    var textRegexp = /^(\D+)/g;

    for (var ii = 0, il = contentsSplit.length; ii < il; ii++) {
      var line = contentsSplit[ii];

      // Trim the line of whitespace
      var trimmed = line.replace(/^\s+|\s+$/g, "");

      if (trimmed == "") {
        continue;
      }

      if (!trimmed.match(textRegexp)) {
        continue;
      }

      subtitleData.text.push(trimmed);
    }

    return subtitleData;
  }

  /**
   * Generates subtitle comps from all the data, given comp options
   *
   * @param {{name: string, text: string[]}[]} subtitlesData Subtitle data to populate comps with
   * @param {object} compOptions                             Options to generate comps from
   * @returns {CompItem[]}                                   Created comps
   */
  function generateSubtitleComps(subtitlesData, compOptions) {
    var comps = [];

    for (var ii = 0, il = subtitlesData.length; ii < il; ii++) {
      var subtitleData = subtitlesData[ii];

      var duration = subtitleData.text.length / compOptions.fps;
      var comp = app.project.items.addComp(
        subtitleData.name,
        compOptions.width,
        compOptions.height,
        1,
        duration,
        compOptions.fps
      );

      createTextLayers(comp, subtitleData.text);

      comp.openInViewer();

      comps.push(comp);
    }

    return comps;
  }

  /**
   * Creates 1-frame text layers from given text data
   *
   * @param {CompItem} comp     Comp to make layers in
   * @param {string[]} textData Text to make layers from
   */
  function createTextLayers(comp, textData) {
    for (var ii = 0, il = textData.length; ii < il; ii++) {
      var textLine = textData[ii];
      var textLayer = comp.layers.addText(textLine);

      textLayer.startTime = ii / comp.frameRate;
      textLayer.outPoint = (ii + 1) / comp.frameRate;
    }
  }

  /**
   * Prompts user to select srt or txt subtitle files
   *
   * @returns {File[]} SRT/TXT files
   */
  function getSubtitleFiles() {
    var subtitleFiles = File.openDialog(
      "Select SRT/TXT File",
      "*.srt;*.txt",
      true
    );

    if (subtitleFiles.length === 0) {
      throw "Select some srt/txt files!";
    }

    return subtitleFiles;
  }
})();
