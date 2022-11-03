/**
 * Prompts for start & end numbers, and creates in current artboard
 * a text item consisting of each #
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
(function createIncrementalTextItems() {
  /**
   * Prompts for user number input
   *
   * @param {string} label Number label to use
   * @param {number} def   Default number
   * @returns {number}     User number
   */
  function getNum(label, def) {
    var input = prompt(
      "Enter " + label + " number! (eg 1)",
      def,
      "Incremental Text Creator"
    );
    var num = parseInt(input, 10);

    if (isNaN(num)) {
      throw "Enter a valid " + label + " number!";
    }

    return num;
  }

  try {
    var startNum = getNum("Start", 1);
    var endNum = getNum("End", 10);

    if (endNum < startNum) {
      var temp = startNum;
      startNum = endNum;
      endNum = temp;
    }

    var docRef = app.activeDocument;

    var artboard = docRef.artboards[0];
    var rect = artboard.artboardRect;

    var textFrames = docRef.textFrames;
    var textItems = [];

    for (var ii = startNum; ii <= endNum; ii++) {
      var newText = textFrames.pointText([rect[2] / 2, rect[3] / 2]);
      newText.contents = ii;

      textItems.push(newText);
    }
  } catch (e) {
    alert(e);
  }
})();
