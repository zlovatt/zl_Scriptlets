/**
 * Takes a pair of keyframes and adds extra randomly stumbling, staggering keyframes between them.
 *
 * Helpful for making realistic progress bars, and probably not much else!
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.1.2
 */
 (function keyStumbler(thisObj) {
  var NUM_KEYS = 20;
  var MIN_GAP_FRAMES = 2;

  // The chance to have certain types of animation (out of 100)
  var HOLD_CHANCE_PERCENT = 5;
  var BEZIER_CHANCE_PERCENT = 50;

  // Only if IN and OUT are both bezier will these come into play:
  var AUTOBEZIER_CHANCE_PERCENT = 33;
  var CONTINUOUS_CHANCE_PERCENT = 33;

    /**
   * Draws UI
   *
   * @returns {Window} Created window
   */
     function createUI() {
      var win =
        thisObj instanceof Panel
          ? thisObj
          : new Window("palette", "Key Stumbler", undefined, {
              resizeable: true
            });
      win.alignChildren = ["fill", "top"];
      win.minimumSize = [50, 80];

      var pnlOptions = win.add("panel", undefined, "Options");
      pnlOptions.alignChildren = ["left", "top"];

      var grpNumKeys = pnlOptions.add("group");
      grpNumKeys.alignment = ["fill", "fill"];
      grpNumKeys.alignChildren = ["fill", "top"];

      var stNumKeys = grpNumKeys.add("statictext", undefined, "Number of Keys to Create:");
      var etNumKeys = grpNumKeys.add("edittext", undefined, "20");
      stNumKeys.helpTip = etNumKeys.helpTip = "How many keyframes should we make between your selected keys?";

      var grpGap = pnlOptions.add("group");
      grpGap.alignment = ["fill", "fill"];
      grpGap.alignChildren = ["fill", "top"];

      var stGap = grpGap.add("statictext", undefined, "Minimum # Frames between Keys:");
      var etGap = grpGap.add("edittext", undefined, "2");
      etGap.characters = 6;
      stGap.helpTip = etGap.helpTip = "What's the minimum number of frames between keyframes?";

      var pnlInterpolations = win.add("panel");
      pnlInterpolations.alignChildren = ["left", "top"];
      pnlInterpolations.add("statictext", undefined, "Chance of keyframes being HOLD or BEZIER:");

      var grpHoldChance = pnlInterpolations.add("group");
      grpHoldChance.alignment = ["fill", "fill"];
      grpHoldChance.alignChildren = ["fill", "top"];

      var stHoldChance = grpHoldChance.add("statictext", undefined, "Hold Chance %:");
      var etHoldChance = grpHoldChance.add("edittext", undefined, "5");
      stHoldChance.helpTip = etHoldChance.helpTip = "% chance for a keyframe to be HOLD";

      var grpBezierChance = pnlInterpolations.add("group");
      grpBezierChance.alignment = ["fill", "fill"];
      grpBezierChance.alignChildren = ["fill", "top"];

      var stBezierChance = grpBezierChance.add("statictext", undefined, "Bezier Chance %:");
      var etBezierChance = grpBezierChance.add("edittext", undefined, "50");
      stBezierChance.helpTip = etBezierChance.helpTip = "% chance for a keyframe to be BEZIER";

      var pnlBezierMode = win.add("panel");
      pnlBezierMode.alignChildren = ["left", "top"];
      pnlBezierMode.add("statictext", undefined, "Chance of BEZIER keyframes being Autobezier or Continuous:");

      var grpAutobezChance = pnlBezierMode.add("group");
      grpAutobezChance.alignment = ["fill", "fill"];
      grpAutobezChance.alignChildren = ["fill", "top"];

      var stAutobezChance = grpAutobezChance.add("statictext", undefined, "Autobezier Chance %:");
      var etAutobezChance = grpAutobezChance.add("edittext", undefined, "33");
      stAutobezChance.helpTip = etAutobezChance.helpTip = "% chance for a BEZIER keyframe to be AUTOBEZIER";

      var grpContChance = pnlBezierMode.add("group");
      grpContChance.alignment = ["fill", "fill"];
      grpContChance.alignChildren = ["fill", "top"];

      var stContChance = grpContChance.add("statictext", undefined, "Continuous Chance %:");
      var etContChance = grpContChance.add("edittext", undefined, "33");
      stContChance.helpTip = etContChance.helpTip = "% chance for a BEZIER keyframe to be CONTINUOUS";

      var grpBtns = win.add("group");
      grpBtns.orientation = "row";
      grpBtns.alignChildren = ["left", "top"];

      var btnStumble = grpBtns.add("button", undefined, "Stumble!");
      btnStumble.onClick = function () {
        var numKeysInput = parseInt(etNumKeys.text, 10);
        if (isNaN(numKeysInput)) {
          throw new Error("Enter a valid Number of Keys!");
        }

        var gapInput = parseInt(etGap.text, 10);
        if (isNaN(gapInput)) {
          throw new Error("Enter a valid Gap Frame Amount!");
        }

        // The chance to have certain types of animation (out of 100)
        var holdChanceInput = parseFloat(etHoldChance.text);
        if (isNaN(holdChanceInput)) {
          throw new Error("Enter a valid Hold Chance!");
        }

        var bezierChanceInput = parseFloat(etBezierChance.text);
        if (isNaN(bezierChanceInput)) {
          throw new Error("Enter a valid Bezier Chance!");
        }

        // Only if IN and OUT are both bezier will these come into play:
        var autobezChanceInput = parseFloat(etAutobezChance.text);
        if (isNaN(autobezChanceInput)) {
          throw new Error("Enter a valid Autobezier Chance!");
        }

        var contChanceInput = parseFloat(etContChance.text);
        if (isNaN(contChanceInput)) {
          throw new Error("Enter a valid Continuous Chance!");
        }

        NUM_KEYS = numKeysInput;
        MIN_GAP_FRAMES = gapInput;

        // The chance to have certain types of animation (out of 100)
        HOLD_CHANCE_PERCENT = holdChanceInput;
        BEZIER_CHANCE_PERCENT = bezierChanceInput;

        // Only if IN and OUT are both bezier will these come into play:
        AUTOBEZIER_CHANCE_PERCENT = autobezChanceInput;
        CONTINUOUS_CHANCE_PERCENT = contChanceInput;

        stumble();
      }

      win.layout.layout();

      win.onResizing = win.onResize = function () {
        this.layout.resize();
      };
      return win;
    }

  function _getNumber(input) {
    var num = parseFloat(input, )
  }

  /**
   * Linear interpolation
   *
   * @param {number} t        Input
   * @param {number} tMin     Input min
   * @param {number} tMax     Input max
   * @param {number} valueMin Output min
   * @param {number} valueMax Output max
   * @returns {number}        Interpolated number
   */
  function _lerp(t, tMin, tMax, valueMin, valueMax) {
    return ((t - tMin) * (valueMax - valueMin)) / (tMax - tMin) + valueMin;
  }

  /**
   * Converts frame count to time.
   *
   * Pulled from aequery.
   *
   * @param  {number} frames    Frame count to convert
   * @param  {number} frameRate FPS to convert with
   * @return {number}           Frame count in time
   */
  function _framesToTime(frames, frameRate) {
    return frames / frameRate;
  }

  /**
   * Converts time to frame count.
   *
   * Pulled from aequery.
   *
   * @param  {number} time      Time to convert
   * @param  {number} frameRate FPS to convert with
   * @return {number}           Time in frames
   */
  function _timeToFrames(time, frameRate) {
    return time * frameRate;
  }

  /**
   * Checks whether a property is able to be stumbled
   *
   * @param {Property} prop Property to check
   * @returns {boolean}     Whether property is supported
   */
  function _isSupportedProperty(prop) {
    var supportedTypes = [
      PropertyValueType.COLOR,
      PropertyValueType.OneD,
      PropertyValueType.ThreeD,
      PropertyValueType.ThreeD_SPATIAL,
      PropertyValueType.TwoD,
      PropertyValueType.TwoD_SPATIAL,
    ].join("|");

    return supportedTypes.indexOf(prop.propertyValueType) > -1;
  }

  /**
   * Generates keyframe times from random sequence between existing keyframes
   *
   * @param {number[]} timeDeltas Array of time offsets
   * @param {object} timeData     Required info to generate times
   * @returns {number[]}          Randomized times
   */
  function _generateKeyTimes(timeDeltas, timeData) {
    var startTime = timeData.startTime;
    var endTime = timeData.endTime;
    var minGap = timeData.minGap;
    var frameRate = timeData.frameRate;

    var keyTimes = [];

    for (var ii = 0, il = timeDeltas.length; ii < il; ii++) {
      var timeDelta = timeDeltas[ii];

      var mappedTime = _lerp(
        timeDelta,
        timeDeltas[0],
        timeDeltas[timeDeltas.length - 1],
        startTime,
        endTime
      );

      var lastTime = startTime;
      if (keyTimes.length > 0) {
        lastTime = keyTimes[ii - 1];
      }

      var mappedInFrames = Math.floor(_timeToFrames(mappedTime, frameRate));
      var lastInFrames = Math.floor(_timeToFrames(lastTime, frameRate));
      var frameDelta = mappedInFrames - lastInFrames;

      if (frameDelta < minGap) {
        mappedInFrames = lastInFrames + minGap;
      }

      var mappedInSeconds = _framesToTime(mappedInFrames, frameRate);
      keyTimes.push(mappedInSeconds);
    }

    return keyTimes;
  }

  /**
   * Generates random keyframe values at provided times
   *
   * @param {number[]} valueDeltas Array of value offsets
   * @param {object} valueData     Required info to generate values
   * @returns {number[]}           Randomized values
   */
  function _generateKeyValues(valueDeltas, valueData) {
    var startValue = valueData.startValue;
    var endValue = valueData.endValue;
    var keyValues = [];

    for (var ii = 0, il = valueDeltas.length; ii < il; ii++) {
      var valueDelta = valueDeltas[ii];

      var mappedValue = _lerp(
        valueDelta,
        valueDeltas[0],
        valueDeltas[valueDeltas.length - 1],
        startValue,
        endValue
      );

      keyValues.push(mappedValue);
    }

    return keyValues;
  }

  /**
   * Generates X amount of incremental random numbers
   *
   * @param {number} numValues Number of values to generate
   * @returns {number[]}       Generated number sequence
   */
  function _generateIncrementalRandomNumbers(numValues) {
    var randomValues = [];
    var sum = 0;

    for (var ii = 0; ii <= numValues; ii++) {
      var num = generateRandomNumber();

      sum += num;
      randomValues.push(sum);
    }

    return randomValues;
  }

  /**
   * Randomly picks an interpolation method for keyframes
   *
   * @param {object} interpolationTypeChances Object of interpolation chance data
   * @returns {KeyframeInterplationType}      Chosen interpolation type
   */
  function _getInterpolationType(interpolationTypeChances) {
    var interpolationNumber = generateRandomNumber();

    var holdWeight = interpolationTypeChances.hold / 100;
    var bezierWeight = interpolationTypeChances.bezier / 100;

    if (interpolationNumber <= holdWeight) {
      return KeyframeInterpolationType.HOLD;
    }

    if (
      interpolationNumber > holdWeight &&
      interpolationNumber <= bezierWeight
    ) {
      return KeyframeInterpolationType.BEZIER;
    }

    return KeyframeInterpolationType.LINEAR;
  }

  /**
   * Generates a KeyfameEase array for a given property
   *
   * @todo Fix overshoot
   *
   * @param {Property} prop     Property to generate ease on
   * @param {number} valueDelta Difference in value during keyframe span
   * @returns {KeyframeEase[]}  Array of eases
   */
  function _generateBezierEase(prop, valueDelta) {
    var speed = generateRandomNumber() * valueDelta;
    var influence = Math.max(generateRandomNumber() * 100, 0.1);

    var ease = [];

    var numDimensions = prop.value instanceof Array ? prop.value.length : 1;

    for (var ii = 0, il = numDimensions; ii < il; ii++) {
      var dimensionEase = new KeyframeEase(speed, influence);
      ease.push(dimensionEase);
    }

    return ease;
  }

  /**
   * Sets eases for keyframes
   *
   * @param {Property} prop     Property to set eases on
   * @param {object} keyIndices Start/end keyframe info
   * @param {object} chances    Collection of probability values
   */
  function _setKeyEases(prop, keyIndices, chances) {
    var interpolationTypeChances = {
      hold: chances.hold,
      bezier: chances.bezier,
    };
    var autobezierChance = chances.autobezier;
    var continuousChance = chances.continuous;

    var startIndex = keyIndices.start;
    var endIndex = keyIndices.end;

    var firstValue = prop.keyValue(startIndex);
    var lastValue = prop.keyValue(endIndex);

    var animationDirection = firstValue < lastValue ? -1 : 1;
    var valueDelta = Math.abs(firstValue - lastValue) * animationDirection * -1;

    for (var ii = startIndex + 1; ii <= endIndex - 1; ii++) {
      var inType = _getInterpolationType(interpolationTypeChances);
      var outType = _getInterpolationType(interpolationTypeChances);

      var inEase = prop.keyInTemporalEase(ii);
      var outEase = prop.keyOutTemporalEase(ii);

      prop.setInterpolationTypeAtKey(ii, inType, outType);

      if (inType === KeyframeInterpolationType.BEZIER) {
        inEase = _generateBezierEase(prop, valueDelta);
      }

      if (outType === KeyframeInterpolationType.BEZIER) {
        outEase = _generateBezierEase(prop, valueDelta);
      }

      if (
        inType === KeyframeInterpolationType.BEZIER ||
        outType === KeyframeInterpolationType.BEZIER
      ) {
        prop.setTemporalEaseAtKey(ii, inEase, outEase);
      }

      if (
        inType === KeyframeInterpolationType.BEZIER &&
        outType === KeyframeInterpolationType.BEZIER
      ) {
        var temporalMode = generateRandomNumber();

        var autoBezierWeight = autobezierChance / 100;
        var continousWeight = continuousChance / 100;

        if (temporalMode <= autoBezierWeight) {
          prop.setTemporalAutoBezierAtKey(ii, true);
        } else if (
          temporalMode > autoBezierWeight &&
          temporalMode <= continousWeight
        ) {
          prop.setTemporalContinuousAtKey(ii, true);
        }
      }
    }
  }

  /**
   * Generates stumbled keyframes on the selected property
   *
   * @param {Property} prop  Property to generate keyframes on
   * @param {object} options Options about how to generate them
   * @param {object} chances Chances of different behaviours happening
   */
  function _generateStumbledKeys(prop, options, chances) {
    var selectedKeys = prop.selectedKeys;

    if (selectedKeys.length !== 2) {
      throw new Error("Select only 2 keyframes!");
    }

    var keyIndices = {
      start: selectedKeys[0],
      end: selectedKeys[1],
    };

    if (keyIndices.end - keyIndices.start !== 1) {
      throw new Error("Keyframes must be a sequence!");
    }

    var numKeys = options.numKeys;
    var minGap = options.minGap;

    var startTime = prop.keyTime(keyIndices.start);
    var endTime = prop.keyTime(keyIndices.end);
    var comp = prop.propertyGroup(prop.propertyDepth).containingComp;
    var frameRate = comp.frameRate;

    var spanFrameDuration = _timeToFrames(endTime - startTime, frameRate);
    var requiredFrameDuration = numKeys * minGap;

    if (requiredFrameDuration > spanFrameDuration) {
      throw new Error(
        "Not enough time between selected keys to create " +
          numKeys +
          " frames! Try extending span."
      );
    }

    var randomTimes = _generateIncrementalRandomNumbers(numKeys);
    var keyTimes = _generateKeyTimes(randomTimes, {
      startTime: startTime,
      endTime: endTime,
      minGap: minGap,
      frameRate: frameRate,
    });

    var whileCounter = 0;
    var whileLimit = 10;

    // Make sure our keyframes are only within the range
    while (
      whileCounter < whileLimit &&
      keyTimes[keyTimes.length - 1] > endTime
    ) {
      whileCounter++;

      randomTimes = _generateIncrementalRandomNumbers(numKeys);
      keyTimes = _generateKeyTimes(randomTimes, {
        startTime: startTime,
        endTime: endTime,
        minGap: minGap,
        frameRate: frameRate,
      });
    }

    if (whileCounter == whileLimit) {
      throw new Error(
        "Not enough time between selected keys to create " +
          numKeys +
          " frames! Try extending span."
      );
    }

    var randomValues = _generateIncrementalRandomNumbers(numKeys);
    var keyValues = _generateKeyValues(randomValues, {
      startValue: prop.keyValue(keyIndices.start),
      endValue: prop.keyValue(keyIndices.end),
    });

    prop.setValuesAtTimes(keyTimes, keyValues);

    keyIndices.end += options.numKeys;

    _setKeyEases(prop, keyIndices, chances);
  }

  function stumble() {
    var options = {
      numKeys: NUM_KEYS,
      minGap: MIN_GAP_FRAMES,
    };

    var interpolationChanceData = {
      hold: HOLD_CHANCE_PERCENT,
      bezier: BEZIER_CHANCE_PERCENT,
      autobezier: AUTOBEZIER_CHANCE_PERCENT,
      continuous: CONTINUOUS_CHANCE_PERCENT,
    };

    app.beginUndoGroup("Stumble Selected Keyframes");

    try {
      var comp = app.project.activeItem;

      if (!(comp && comp instanceof CompItem)) {
        throw new Error("Select an animated property!");
      }

      var selectedProps = comp.selectedProperties;

      for (var ii = 0, il = selectedProps.length; ii < il; ii++) {
        var prop = selectedProps[ii];

        if (!prop.canVaryOverTime) {
          continue;
        }

        if (!_isSupportedProperty(prop)) {
          throw new Error("Property " + prop.name + " is not supported!");
        }

        _generateStumbledKeys(prop, options, interpolationChanceData);
      }
    } catch (e) {
      alert(e);
    } finally {
      app.endUndoGroup();
    }
  }

  var ui = createUI();

  if (ui instanceof Window) {
    ui.show();
  } else {
    ui.layout.layout(true);
  }

})(this);
