/**
 * Separates dimensions on ALL unlocked layers in current comp,
 * attempting to preserve easing
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.3.0
 */
(function separateDimensionsPreserveEasing() {
  /**
   * Makes an array of objects containing in and out ease for a property
   *
   * @param {Property} property Property to check (really only works with Position)
   * @returns {{ite: KeyframeEase, ote: KeyframeEase}[]} Array of ite/ote keyframe objects
   */
  function buildPropTemporalEaseArray(property) {
    var propTemporalEases = [];

    for (var ii = 1, il = property.numKeys; ii <= il; ii++) {
      var ite = property.keyInTemporalEase(ii)[0];

      if (
        property.keyInInterpolationType(ii) == KeyframeInterpolationType.HOLD ||
        property.keyInInterpolationType(ii) == KeyframeInterpolationType.LINEAR
      )
        ite = new KeyframeEase(0, 10);

      var ote = property.keyOutTemporalEase(ii)[0];

      if (
        property.keyOutInterpolationType(ii) == KeyframeInterpolationType.HOLD ||
        property.keyOutInterpolationType(ii) == KeyframeInterpolationType.LINEAR
      )
        ote = new KeyframeEase(0, 10);

      propTemporalEases.push({
        ite: ite,
        ote: ote,
      });
    }

    return propTemporalEases;
  }

  /**
   * Sets X, Y and Z positions from a pre-generated object array
   *
   * @param {PropertyGroup} transformGroup Transform group to set props in
   * @param {{ite: KeyframeEase, ote: KeyframeEase}[]} propTemporalEases Array of ite/ote keyframe objects
   */
  function setDimensionTemporalEaseFromObject(
    transformGroup,
    propTemporalEases
  ) {
    var posProps = [
      transformGroup("ADBE Position_0"),
      transformGroup("ADBE Position_1"),
      transformGroup("ADBE Position_2"),
    ];

    for (var ii = 0, il = posProps.length; ii < il; ii++) {
      var property = posProps[ii];

      for (var jj = 1, jl = property.numKeys; jj <= jl; jj++) {
        var temporalEaseObject = propTemporalEases[jj - 1];
        property.setTemporalEaseAtKey(
          jj,
          [temporalEaseObject.ite],
          [temporalEaseObject.ote]
        );
      }
    }
  }

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Open a comp!");
    return;
  }

  app.beginUndoGroup("Separate Dimensions & Preserve Easing");

  var selection = comp.selectedLayers;

  for (var ii = 0, il = selection.length; ii < il; ii++) {
    var layer = selection[ii];

    if (layer.locked) {
      continue;
    }

    var transform = layer.transform;
    var pos = transform.position;

    if (pos.dimensionsSeparated) {
      continue;
    }

    var propTemporalEases = buildPropTemporalEaseArray(pos);

    pos.dimensionsSeparated = true;

    setDimensionTemporalEaseFromObject(transform, propTemporalEases);
  }

  app.endUndoGroup();
})();
