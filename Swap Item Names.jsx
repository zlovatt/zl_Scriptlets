/**
 * Swaps names of 2 selected project items.
 *
 * @author Zack Lovatt <zack@lova.tt>
 * @version 0.1.0
 */
 (function swapItemNames() {
	var items = app.project.selection;

    if (items.length !== 2) {
        alert("Select TWO items to swap names!");
        return;
    }

    app.beginUndoGroup("Swap Item Names");
    var item1Name = items[0].name;
    items[0].name = items[1].name;
    items[1].name = item1Name;
    app.endUndoGroup();
})();
