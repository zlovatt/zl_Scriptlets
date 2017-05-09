/*
    Heavily based on / uses functions from: 
        https://github.com/SupportClass/ae-ease-to-gsap-customease
    
    Select a single property with keys, run the script.
    You'll get an alert of cubic bezier values for each curve between keys, like:
        [0.17,0.17,0.83,0.83],[0.17,0.17,0.83,0.83],[0.33,0.000,0.67,1.00],[0.17,0.17,0.83,0.83],[0.76,-0.29,0.23,1.33]

    If the curve is invalid, you'll see "+Infinite" or "-Infinite".
    Alternatively, you can enable the clampInfiniteValues variable on line 16 to clamp ±inf to ±10
*/

(function propertyKeysToCubicBezier () {
	'use strict';

	var clampInfiniteValues = true; // Whether to clamp Infinite values or leave them as "Infinite"
	var curItem = app.project.activeItem;

	if (curItem === null || !(curItem instanceof CompItem)) {
		alert('Please Select a Comp');
		return;
	}

	var framerate = curItem.frameRate;
	var selectedProperties = curItem.selectedProperties;

	if (selectedProperties.length === 0) {
		alert('Please Select at least one Property (Scale, Opacity, etc)');
		return;
	}

	var bezierCurveArray = [];
	for (var i = 1, il = selectedProperties[0].numKeys; i < il; i++) {
		bezierCurveArray.push(getBezierVals(selectedProperties[0], i, i+1));
	}

	var outputString = "[" + bezierCurveArray.join("],[") + "]";

	copyTextToClipboard(outputString);

	alert('Copied to clipboard:\n' + outputString);




	// Above this line is the main logic of the script.
	/* ---------------------------------------------------------------------------- */
	// Below this line are the helper functions that the main logic uses.

	function Point(x, y) {
		this.x = x;
		this.y = y;
	}

	function calcTweenData(property, startIndex, endIndex) {
		var startTime = property.keyTime(startIndex);
		var endTime = property.keyTime(endIndex);
		var durationTime = endTime - startTime;

		var startFrame = startTime * framerate;
		var endFrame = endTime * framerate;
		var durationFrames = endFrame - startFrame;

		var startValue;
		var endValue;

		if (property.value instanceof Array) {
			startValue = property.keyValue(startIndex)[0];
			endValue = property.keyValue(endIndex)[0];
		} else {
			startValue = property.keyValue(startIndex);
			endValue = property.keyValue(endIndex);
		}

		return {
			startTime: startTime,
			endTime: endTime,
			durationTime: durationTime,
			startFrame: startFrame,
			endFrame: endFrame,
			durationFrames: durationFrames,
			startValue: startValue,
			endValue: endValue
		};
	}

	function calcOutgoingControlPoint(tweenData, property, keyIndex) {
		var outgoingEase = property.keyOutTemporalEase(keyIndex);
		var outgoingSpeed = outgoingEase[0].speed;
		var outgoingInfluence = outgoingEase[0].influence / 100;

		var m = outgoingSpeed / framerate; // Slope
		var x = tweenData.durationFrames * outgoingInfluence;
		var b = tweenData.startValue; // Y-intercept
		var y = (m * x) + b;

		var correctedX = tweenData.startFrame + x;
		return new Point(correctedX, y);
	}

	function calcIncomingControlPoint(tweenData, property, keyIndex) {
		var incomingEase = property.keyInTemporalEase(keyIndex + 1);
		var incomingSpeed = incomingEase[0].speed;
		var incomingInfluence = incomingEase[0].influence / 100;

		var m = -incomingSpeed / framerate; // Slope
		var x = tweenData.durationFrames * incomingInfluence;
		var b = tweenData.endValue; // Y-intercept
		var y = (m * x) + b;

		var correctedX = tweenData.endFrame - x;
		return new Point(correctedX, y);
	}


	function getNormalizedCurve (tweenData, p0, p1) {
		function normalize (val, min, max) {
			var delta = max - min;
			var normalized = (val - min)/delta;

			// Clamps infinite values. Optional.
			if (clampInfiniteValues) {
				if (normalized === Number.NEGATIVE_INFINITY)
					normalized = -10;
				if (normalized === Number.POSITIVE_INFINITY)
					normalized = 10;
			}

			return normalized;
		}

		var x1 = normalize(p0.x, tweenData.startFrame, tweenData.endFrame).toFixed(3);
		var y1 = normalize(p0.y, tweenData.startValue, tweenData.endValue).toFixed(3);

		if (isNaN(y1)) y1 = x1;

		var x2 = normalize(p1.x, tweenData.startFrame, tweenData.endFrame).toFixed(3);
		var y2 = normalize(p1.y, tweenData.startValue, tweenData.endValue).toFixed(3);

		if (isNaN(y2)) y2 = x2;

		return [x1, y1, x2, y2];
	}

	function getBezierVals (prop, startIndex, endIndex) {
		var tweenData = calcTweenData(prop, startIndex, endIndex);
		var outgoingPoint = calcOutgoingControlPoint(tweenData, prop, startIndex);
		var incomingPoint = calcIncomingControlPoint(tweenData, prop, startIndex);


		return getNormalizedCurve(tweenData, outgoingPoint, incomingPoint);
	}

	// From https://forums.adobe.com/message/9157695#9157695
	function copyTextToClipboard(str) {
		var cmdString;
		if ($.os.indexOf('Windows') === -1) {
			cmdString = 'echo "' + str + '" | pbcopy';
		} else {
			cmdString = 'cmd.exe /c cmd.exe /c "echo ' + str + ' | clip"';
		}

		system.callSystem(cmdString);
	}
})();
