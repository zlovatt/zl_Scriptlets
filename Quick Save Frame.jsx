/**
 * Quickly prompts to save current frame to a png.
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.1.0
 */
(function quickSaveFrame() {
  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Please select a composition!");
    return;
  }

  var defaultLocation = new File(Folder.desktop + "/" + comp.name + ".png");
  var location = defaultLocation.saveDlg("Choose save location", "*.png");

  if (!location) {
    return;
  }

  var savedFile = comp.saveFrameToPng(comp.time, location);

  if (savedFile._hasException) {
    alert(["Couldn't save file!", savedFile.exception.toString()].join("\n"));
    return;
  }
})();
