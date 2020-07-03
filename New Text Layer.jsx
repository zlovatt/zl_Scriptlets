/**
 * Makes a new empty text layer.
 *
 * Modifiers:
 *   - Hold SHIFT to create a paragraph text layer instead of point text.
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.1.2
 */
(function newTextLayer() {
  var makeParagraphText = ScriptUI.environment.keyboardState.shiftKey;

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert('Please select a composition!');
    return;
  }

  var newTextLayer;

	app.beginUndoGroup('New Text Layer');

  if (makeParagraphText) {
    newTextLayer = comp.layers.addBoxText();
  } else {
    newTextLayer = comp.layers.addText();
  }

  newTextLayer.selected = true;

  app.endUndoGroup();
})();
