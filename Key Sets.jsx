/**
 * Save & load sets of selected keyframes.
 *
 * You get 5 selection sets at a time. You can overwrite a selection by saving over an existing one.
 * The top button will SAVE selection, while the bottom button will LOAD that selection.
 * Hold SHIFT when saving to specify the name for a set.
 *
 *
 * If run as a kbar Script button:
 *  • Specify a unique Kbar Argument to save/restore that key set
 *  • You can have as many simultaneous sets, as long as each as a unique name
 *  • Press the button to SAVE
 *  • Hold SHIFT to LOAD that selection.
 *
 * @author Zack Lovatt <zack@zacklovatt.com>
 * @version 0.1.0
 */
(function keySets(thisObj) {
  var NUM_SETS = 5;
  $._sskCache = $._sskCache || {};

  var ui = createUI(thisObj);

  if (ui instanceof Window) {
    if (typeof kbar !== "undefined" && kbar.button && kbar.button.argument !== "") {
      // ran as script, with kbar
      var argument = kbar.button.argument;
      _quickKbarAction(argument);
    } else {
      // run as script, not kbar
      ui.show();
    }
  } else {
    // set window layout
    ui.layout.layout(true);
  }

  /**
   * Quickly stores or loads a given ID
   *
   * @param {string} cacheID Cache ID to save to
   */
  function _quickKbarAction(cacheID) {
    if (ScriptUI.environment.keyboardState.shiftKey) {
      loadSelection(cacheID);
    } else {
      storeSelection(cacheID);
    }
  }

  /**
   * Builds UI
   *
   * @returns {Window | Panel} Created window
   */
  function createUI(thisObj) {
    var win =
      thisObj instanceof Panel
        ? thisObj
        : new Window("palette", "Key Sets", undefined, {
            resizeable: true
          });

    win.orientation = "row";
    win.margins = 5;
    win.spacing = 5;

    for (var ii = 0; ii < NUM_SETS; ii++) {
      var setNum = ii + 1;
      var pnl = win.add("panel", undefined, "Set " + setNum);

      pnl.margins = 10;
      pnl.spacing = 5;

      pnl.id = ii.toString();

      var btnStore = pnl.add("button", undefined, "⤵");
      btnStore.helpTip = "Store Set " + setNum;

      btnStore.onClick = function () {
        var pnl = this.parent;
        var id = pnl.id;

        // Customize name
        if (ScriptUI.environment.keyboardState.shiftKey) {
          var setNum = id + 1;
          var name = prompt(
            "Enter Name for Set " + setNum,
            pnl.text,
            "Specify Set Name"
          );

          if (name) {
            pnl.text = name;
          }
        }

        storeSelection(id);

        var setLoadBtn = pnl.children[1];
        setLoadBtn.enabled = $._sskCache[id] && $._sskCache[id].length > 0;
      };

      var btnLoad = pnl.add("button", undefined, "⤴");
      btnLoad.helpTip = "Load Set " + setNum;

      btnLoad.enabled = false;
      btnLoad.onClick = function () {
        var pnl = this.parent;
        var id = pnl.id;

        restoreSelection(id);
      };

      btnStore.preferredSize.width = btnLoad.preferredSize.width = 30;
    }

    return win;
  }

  /**
   * Stores collection of selected properties and keyframes
   *
   * @param {string} cacheID Cache ID to save as
   */
  function storeSelection(cacheID) {
    var comp = app.project.activeItem;

    if (!(comp && comp instanceof CompItem)) {
      alert("Please select a composition!");
      return;
    }

    var props = comp.selectedProperties;
    var selectedKeyframes = getSelectedKeyframes(props);

    if (selectedKeyframes.length === 0) {
      return;
    }

    $._sskCache[cacheID] = selectedKeyframes;
  }

  /**
   * Deselects everything and tries to load selection from cache
   *
   * @param {string} cacheID Cache ID to load from
   */
  function restoreSelection(cacheID) {
    app.executeCommand(2004); // Deselect all

    var cached = $._sskCache[cacheID];

    if (!cached) {
      return;
    }

    loadSelection(cached);
  }

  /**
   * Deselects keys on a property
   *
   * @param {Property} prop Property to check
   */
  function deselectKeys(prop) {
    for (var ii = 1, il = prop.numKeys; ii <= il; ii++) {
      prop.setSelectedAtKey(ii, false);
    }
  }

  /**
   * Builds selected keyframe collection from given comps
   *
   * @param {Property[]} props Properties to get selected keyrames from
   * @return {object}          Keyframe collection data
   */
  function getSelectedKeyframes(props) {
    var selection = [];

    for (var ii = 0, il = props.length; ii < il; ii++) {
      var prop = props[ii];

      if (prop.propertyType !== PropertyType.PROPERTY) {
        continue;
      }

      var selectedKeys = prop.selectedKeys;

      if (selectedKeys.length === 0) {
        continue;
      }

      selection.push({
        prop: prop,
        keys: selectedKeys
      });
    }

    return selection;
  }

  /**
   * Selects keyframe based on stored data
   *
   * @param {object} cache Keyframe collection data
   */
  function loadSelection(cache) {
    for (var ii = 0, il = cache.length; ii < il; ii++) {
      var selection = cache[ii];
      var prop = selection.prop;

      // Check if property exists
      try {
        prop.toString();
      } catch (e) {
        continue;
      }

      var keys = selection.keys;

      // Check if prop has fewer keys than we're trying to load
      if (prop.numKeys < keys.length) {
        continue;
      }

      deselectKeys(prop);

      for (var jj = 0, jl = keys.length; jj < jl; jj++) {
        var key = keys[jj];
        prop.setSelectedAtKey(key, true);
      }
    }
  }
})(this);
