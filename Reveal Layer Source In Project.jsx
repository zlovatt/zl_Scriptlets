/**
 * Reveals the 'source' of a layer in project panel, if it exists
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.2.0
 */
(function revealFirstSelectionInProject() {
  var comp = app.project.activeItem;

  // If there isn't a comp, get out
  if (!(comp && comp instanceof CompItem)) {
    return;
  }

  var selection = comp.selectedLayers;
  var ii;
  var il;

  // Unselect everything except the first item
  for (ii = 1, il = selection.length; ii < il; ii++) {
    selection[ii].selected = false;
  }

  // 'Reveal Layer Source in Project'
  app.executeCommand(2517);

  // Reset selection to what it was
  for (ii = 1, il = selection.length; ii < il; ii++) {
    selection[ii].selected = true;
  }
})();
