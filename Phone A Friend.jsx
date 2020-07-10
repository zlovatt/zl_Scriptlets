/**
 * Generates Touch Tone noises for your input in AE!
 *
 * Uses markers & expressions-- move markers & change text to change audio!
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.1.0
 */
(function phoneAFriend () {
  // # Frames for the tone to last
  var toneDuration = 8.5;

  var number = getUserInput();

  if (!number) {
    return;
  }

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Open a comp!");
    return;
  }

  app.beginUndoGroup("Phone A Friend");

  try {
    var toneNull = comp.layers.addNull();
    toneNull.name = "Phone a Friend!";

    // Add the effect & expressions
    var toneEffect = toneNull
      .property("ADBE Effect Parade")
      .addProperty("ADBE Aud Tone");
    var freq1 = toneEffect.property("ADBE Aud Tone-0002");
    addPhoneAFriendExpression(freq1, toneDuration, 0);
    var freq2 = toneEffect.property("ADBE Aud Tone-0003");
    addPhoneAFriendExpression(freq2, toneDuration, 1);
    toneEffect.property("ADBE Aud Tone-0004").setValue(0);
    toneEffect.property("ADBE Aud Tone-0005").setValue(0);
    toneEffect.property("ADBE Aud Tone-0006").setValue(0);

    // Add muter. Annoying but needed to prevent warpy audio.
    var audioLevels = toneNull.property("ADBE Audio Group").property("ADBE Audio Levels");
    audioLevels.expression = [
      "// # frames for tone to last",
      "var toneLength = " + toneDuration + ";",
      "",
      "var priorMarkerIndex = 0;",
      "if (thisLayer.marker.numKeys > 0) {",
      "  var nearestMarker = thisLayer.marker.nearestKey(time);",
      "  priorMarkerIndex = nearestMarker.index;",
      "",
      "  if (nearestMarker.time > time) {",
      "    priorMarkerIndex = nearestMarker.index - 1;",
      "  }",
      "}",
      "",
      "var result = [-192, -192];",
      "if (priorMarkerIndex !== 0) {",
      "  var priorMarker = thisLayer.marker.key(priorMarkerIndex);",
      "  var inputMin = priorMarker.time + framesToTime(1);",
      "  var inputMax = inputMin + framesToTime(toneLength - 2);",
      "",
      "  if (time >= inputMin && time < inputMax) {",
      "    result = [0, 0];",
      "  }",
      "}",
      "",
      "result;",
    ].join("\n");

    // Add the markers
    addMarkersToLayer(toneNull, number, 15);
  } catch (e) {
    alert(e);
  } finally {
    app.endUndoGroup();
  }

  /**
   * Gets user input
   *
   * @returns {string} User input phone number
   */
  function getUserInput() {
    var valid = "1234567890*#";
    var number = prompt("Enter phone number!", "967-1111", "Phone A Friend");

    if (!number) {
      return;
    }

    number = number.toUpperCase();
    number = number.split("-").join("");
    number = number.split(" ").join("");

    var invalid = [];
    var result = [];
    for (var ii = 0, il = number.length; ii < il; ii++) {
      var key = number.charAt(ii);

      if (valid.indexOf(key) > -1) {
        result.push(key);
        continue;
      }

      switch (key) {
        case "A":
        case "B":
        case "C":
          result.push("2");
          break;

        case "D":
        case "E":
        case "F":
          result.push("3");
          break;

        case "G":
        case "H":
        case "I":
          result.push("4");
          break;

        case "J":
        case "K":
        case "L":
          result.push("5");
          break;

        case "M":
        case "N":
        case "O":
          result.push("6");
          break;

        case "P":
        case "Q":
        case "R":
        case "S":
          result.push("7");
          break;

        case "T":
        case "U":
        case "V":
          result.push("8");
          break;

        case "W":
        case "X":
        case "Y":
        case "Z":
          result.push("9");
          break;

        case "+":
          result.push("0");
          break;

        default:
          if (invalid.join("").indexOf(key) === -1) {
            invalid.push(key);
          }
          break;
      }
    }

    if (invalid.length > 0) {
      throw "Invalid characters: '" + invalid.join(", ") + "'";
    }

    return result;
  }

  /**
   * Adds expression to a given prop
   *
   * @param {Property} prop      Property to add exp to
   * @param {number} toneLength  # Frames to have the tone last for
   * @param {number} matrixIndex Matrix index to use
   */
  function addPhoneAFriendExpression(prop, toneLength, matrixIndex) {
    if (!prop.canSetExpression) {
      throw "Can't add expression!";
    }

    prop.expression = [
      "// # frames for tone to last",
      "var toneLength = " + toneLength + ";",
      "",
      "function characterToTone(character, matrixIndex) {",
      "  var toneMap = [",
      '    { "123": 697, "456": 770, "789": 852, "*0#": 941 },',
      '    { "147*": 1209, "2580": 1336, "369#": 1477 }',
      "  ];",
      "",
      "  var matrixSet = toneMap[matrixIndex];",
      "",
      "  for (var button in matrixSet) {",
      "    if (!matrixSet.hasOwnProperty(button)) { continue; }",
      "    if (button.indexOf(character) === -1) { continue; }",
      "    return matrixSet[button];",
      "  }",
      "}",
      "",
      "var priorMarkerIndex = 0;",
      "if (thisLayer.marker.numKeys > 0) {",
      "  var nearestMarker = thisLayer.marker.nearestKey(time);",
      "  priorMarkerIndex = nearestMarker.index;",
      "",
      "  if (nearestMarker.time > time) {",
      "    priorMarkerIndex = nearestMarker.index - 1;",
      "  }",
      "}",
      "",
      "var result = 0;",
      'var valid = "1234567890*#ABCD";',
      "if (priorMarkerIndex !== 0) {",
      "  var priorMarker = thisLayer.marker.key(priorMarkerIndex);",
      "",
      "  var button = priorMarker.comment;",
      "",
      '  if (button !== "" && valid.indexOf(button) > -1) {',
      "    var inputMin = priorMarker.time;",
      "    var inputMax = inputMin + framesToTime(toneLength);",
      "",
      "    if (time >= inputMin && time < inputMax) {",
      "      result = characterToTone(button, " + matrixIndex + ");",
      "    }",
      "  }",
      "}",
      "",
      "result;"
    ].join("\n");
  }

  /**
   * Adds markers to a layer at a given interval
   *
   * @param {Layer} layer         Layer to add markers to
   * @param {string[]} markerText Marker text array
   * @param {nubmer} interval     Interval in frames
   */
  function addMarkersToLayer(layer, markerText, interval) {
    var markers = layer.property("ADBE Marker");
    var intervalInSeconds = interval * layer.containingComp.frameDuration;

    for (var ii = 0, il = markerText.length; ii < il; ii++) {
      var marker = new MarkerValue(markerText[ii]);
      markers.setValueAtTime(intervalInSeconds * ii, marker);
    }
  }
})();
