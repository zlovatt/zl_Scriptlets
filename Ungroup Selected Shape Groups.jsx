/**
 * Ungroups all selected shape groups.
 *
 * Note: This assumes that each group ONLY has a 'path' within it.
 * If there's more, it'll fail.
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.2.1
 */
(function ungroupSelectedShapeGroups() {
  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert('Please select a composition!');
    return;
  }

  var props = comp.selectedProperties;
  var parentProp = props[0].propertyGroup();
  var idxList = [];
  var ii, il;

  // Build list of indices
  for (ii = 0, il = props.length; ii < il; ii++) {
    idxList.push(props[ii].propertyIndex);
  }

  app.beginUndoGroup('Ungroup Selected Shape Groups');

  app.executeCommand(2004); // Deselect all

  // Deselect them
  for (ii = 0, il = idxList.length; ii < il; ii++) {
    var prop = parentProp.property(idxList[ii]);
    prop.selected = true;

    try {
      app.executeCommand(3742);
    } catch (e) {}

    parentProp.property(idxList[ii]).selected = false;
  }

  app.endUndoGroup();
})();
