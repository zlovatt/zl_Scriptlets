/**
 * Creates a simple Slider Driver system for a given property
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function createSliderDriver() {
  const SLIDER_NAME = "Slider Driver";

  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Please select a composition!", "Create Slider Driver");
    return;
  }

  var layer = comp.selectedLayers[0];
  var props = comp.selectedProperties;

  if (props.length == 0) {
    alert("Select a property!", "Create Slider Driver");
    return;
  }

  var prop = props[props.length - 1];

  if (!(prop instanceof Property && prop.canSetExpression)) {
    alert("Select a valid property!", "Create Slider Driver");
    return;
  }

  app.beginUndoGroup("Create Slider Driver");

  try {
    prop.expression = [
      "const slider = effect('" + SLIDER_NAME + "')(1);",
      "",
      "if (numKeys > 1) {",
      "  const t0 = key(1).time;",
      "  const t1 = key(numKeys).time;",
      "  const t = linear(slider, 0, 100, t0, t1);",
      "  valueAtTime(t);",
      "} else {",
      "  value;",
      "}"
    ].join("\n");

    var sliderEffect = layer.effect.addProperty("ADBE Slider Control");
    sliderEffect.name = SLIDER_NAME;

    var sliderProp = sliderEffect.property(1);
    sliderProp.setValuesAtTimes([0, 1], [0, 100]);
  } catch (e) {
    alert(e, "Create Slider Driver");
  } finally {
    app.endUndoGroup();
  }
})();
