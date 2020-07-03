/**
 * Write layer names in comp to a file
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.2.1
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

    fileObj.open('w');
    fileObj.write(contents);
    fileObj.close();
  }

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert('Open a comp!');
    return;
  }

  var layers = comp.layers;
  var layerNames = [];

  for (var ii = 1, il = layers.length; ii <= il; ii++) {
    layerNames.push(layers[ii].name);
  }

  var defaultPath = Folder.desktop.fullName + '/Layer Names.txt';
  var outputFile = new File(defaultPath).saveDlg(
    'Choose output file',
    'txt:*.txt;'
  );

  if (!outputFile) {
    alert('Output canceled!');
    return;
  }

  try {
    writeFile(outputFile, layerNames.join('\n'));
    alert('Saved file to ' + String(outputFile));
  } catch (e) {
    alert(e);
  }
})();
