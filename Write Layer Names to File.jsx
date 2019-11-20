/**
 * This will write the names of layers in your comp to a file
 */
(function writeLayerNamesToFile() {
  /**
   * Writes a file to path with contents
   * Doesn't check for encoding, the folder existing, overwrite checks, etc.
   * Super straightforward.
   *
   * @param {File | String} path File path to write to
   * @param {String} contents    File contents
   */
  function writeFile(path, contents) {
    var fileObj = path instanceof File ? path : new File(path);

    fileObj.open("w");
    fileObj.write(contents);
    fileObj.close();
  }

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Can't find comp!");
    return;
  }

  var layers = comp.layers;
  var layerNames = [];

  for (var i = 1, il = layers.length; i <= il; i++) {
    layerNames.push(layers[i].name);
  }

  var defaultPath = Folder.desktop.fullName + "/Layer Names.txt";
  var outputFile = new File(defaultPath).saveDlg(
    "Choose output file",
    "txt:*.txt;"
  );

  if (!outputFile) {
    alert("Output canceled!");
  }

  try {
    writeFile(outputFile, layerNames.join("\n"));
    alert("Saved file to " + String(outputFile));
  } catch (e) {
    alert(e);
  }
})();
