/**
 * Reveals current AEP in your OS file browser.
 * Mostly an abridged version of the aequery method of doing this.
 */
(function revealCurrentFile() {
  /**
   * Reveals a file in finder/explorer
   *
   * @param {File | string} filePath Path of file to reveal
   */
  function revealFile(filePath) {
    if (filePath instanceof File) {
      filePath = filePath.fsName;
    }

    if (typeof filePath !== 'string') {
      alert('Invalid path!');
      return;
    }

    var command = $.os.indexOf('Windows') > -1 ? 'Explorer /select, ' : 'open -R ';

    system.callSystem(command + '"' + filePath + '"');
  }

  var aep = app.project.file;

  if (!aep) {
    alert('AEP not saved!');
    return;
  }

  revealFile(aep);
})();
