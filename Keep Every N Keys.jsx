/**
 * Keeps every N keyframes on selected properties.
 *
 * By default, keeps every 2nd key.
 * Hold SHIFT to change the frequency of keyframes to keep.
 *
 * This doesn't delete the first or last keyframes on a property.
 *
 * zack@zacklovatt.com
 *
 * @author Zack Lovatt
 * @version 1.0.0
 */
(function keepEveryNKeys () {
  var interval = 2;

  if (ScriptUI.environment.keyboardState.shiftKey) {
    var intervalInput = prompt(
      'Enter interval (2 = keep every 2nd key, 3 = every 3rd)',
      interval,
      'Keep Every N Keys'
    );
    var intervalNum = parseInt(intervalInput, 10);

    if (isNaN(intervalNum)) {
      alert('Enter a valid whole number!');
      return;
    }

    interval = intervalNum;
  }

  /**
   * Removes every {interval} keyframes on a property
   * (doesn't remove first or last)
   *
   * @param {Property} prop   Property to remove keys on
   * @param {number} interval Frequency of keys to keep
   */
  function keepEveryNthKey(prop, interval) {
    for (var ii = prop.numKeys - 1; ii >= 1; ii--) {
      if (ii % interval === 1) {
        continue;
      }

      prop.removeKey(ii);
    }
  }

  app.beginUndoGroup('Keep Every N Keys');

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert('Open a comp!');
    return;
  }

  var props = comp.selectedProperties;

  if (!(props && props.length > 0)) {
    alert('Select some properties!');
    return;
  }

  for (var ii = 0, il = props.length; ii < il; ii++) {
    var prop = props[ii];

    keepEveryNthKey(prop, interval);
  }

  app.endUndoGroup();
})();
