/**
 * Gets value of current property at current time.
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.1.0
 */
(function getPropertyValue() {
  var comp = app.project.activeItem;

  if (!(comp && comp instanceof CompItem)) {
    alert("Open a comp!");
    return;
  }

  var properties = comp.selectedProperties;

  if (properties.length > 2) {
    alert("Select only 1 property!");
    return;
  }

  var last = properties.pop();
  var lastName = last.name.toString();

  if (
    last.propertyValueType === PropertyValueType.NO_VALUE ||
    last.propertyValueType === PropertyValueType.CUSTOM_VALUE ||
    last.propertyValueType === PropertyValueType.MARKER ||
    last.propertyValueType === PropertyValueType.SHAPE
  ) {
    alert("Can't read property '" + lastName.toString() + "'");
    return;
  }

  var value = last.valueAtTime(comp.time, false);

  prompt(lastName + " equals:", value.toString(), "Current Property Value");
})();
