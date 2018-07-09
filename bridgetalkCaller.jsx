/**
 * Very simple framework for handling function calling and
 * function returns, using Bridgetalk.
 */
(function bridgetalkCaller() {
  /**
   * Calls a function and executes the callback with the result
   * Any arguments after the func and callback get passed into the func
   *
   * @param {Function} func     Function to run
   * @param {Callback} callback Callback to execute on result
   */
  function callFunc(func, callback) {
    var args = Array.prototype.slice.call(arguments, 2);

    var bt = new BridgeTalk;

    bt.target = "illustrator";
    bt.body = func + "\n" + func.name + "(" + args.toString() + ");";

    bt.onResult = function (msg) {
      // Note: msg.body is a string!
      // If you are receiving data, you'll need to parse it.
      callback(msg.body);
    }

    bt.send();
  }

  /**
   * Alerts the first arg passed
   *
   * @param {String} thingToAlert Argument to alert
   */
  function alertArg(thingToAlert) {
    alert(thingToAlert);
  }

  /**
   * Gets the sum of passed integers
   *
   * @returns {Number} Sum of numbers
   */
  function getSum() {
    var sum = 0;

    for (var i = 0, il = arguments.length; i < il; i++)
      sum += parseInt(arguments[i]);

    return sum;
  }

  /**
   * Creates UI
   */
  function createUI() {
    var win = new Window('palette', "Bridgetalk Function Caller");

    var btn = win.add("button", undefined, "Execute");
    btn.onClick = function () {
      callFunc(getSum, alertArg, 2, 5);
    }

    win.show();
  }

  createUI();
})();
