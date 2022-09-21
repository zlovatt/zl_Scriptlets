/**
 * Sets the active comp's duration to a specified number of frames
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.1.0
 */
(function setCompDurationToXFrames() {
  var NUM_FRAMES = 1;

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert('Please select a composition!', 'Set Comp Duration to X Frames');
    return;
  }

  var framesInSeconds = Math.max(NUM_FRAMES, 1) / comp.frameRate;

  app.beginUndoGroup('Set Comp Dur to ' + NUM_FRAMES.toString() + ' Frames');
  comp.duration = framesInSeconds;
  app.endUndoGroup();
})();
