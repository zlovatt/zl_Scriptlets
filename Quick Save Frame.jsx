/**
 * Quickly prompts to save current frame to a png.
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.1
 */
(function quickSaveFrame() {
  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Please select a composition!");
    return;
  }

  var defaultLocation = new File(Folder.desktop.fsName + "/" + comp.name + ".png");
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
