zl_Scriptlets
zack@zacklovatt.com

Copyright (c) 2018 Zack Lovatt. All rights reserved.

-----------------------
#### Description

Series of small, simple utilities for ft-toolbar or any other script launcher.

* addTrimPaths                         - Adds Trim Paths to selected shape layers
* applyColourFileToColoristaFree       - Prompts user to select a CCC/CDL, creates an adj layer w/ Colorista Free with the CDL
* applyPseudoEffect                    - Write ffx binary string to disk and apply to layer, adaptation of same from @rendertom
* bridgetalkCaller                     - Cross-host bridgetalk caller setup
* convertNewGaussianBlurToOld          - Convert the new (CC 2015.3+) Gaussian Blur effect to Gaussian Blur (Legacy)
* Create Nulls From Paths - Responsive - A responsive layout version of the native "Create Nulls from Paths" panel (as of 2018/04/27)
* defaultFolders-v2.0                  - Creates a number of folders (or, if ran as a window, lets you customzie folder names to create)
* deleteKeysAtTime                     - Delete all keys at current time
* findAllPresetFiles                   - Returns array of all preset ffx files installed
* forceLegacySkin                      - Tries to force 'use legacy skin' to ON for specific script passed by filename
* forceLegacySkinForAllScripts         - Tries to force 'use legacy skin' to ON for all installed scriptUI panels
* getOSScaleFactor                     - Returns OS UI/Display scale factor
* loopSelectedLayers                   - Loop out ('cycle') selected layers
* mistikaVRToAENull                    - Translates a Mistika VR .grp file to null sliders for yaw/pitch/roll
* moveFirstLayerOfSelectedCompsToEnd   - Moves the first layer of each selected comp in project panel to the end of each comp
* newTextLayer                         - Creates a new text layer
* parentEachToAbove                    - Parent each selected layer to above layer
* propertyKeysToCubicBezier            - Gives an alert of cubic bezier values for each curve between all keys on selected property
* randomizeShapeGroupOrder             - Randomize order of selected shape groups
* recursiveEnableMoblur                - Recursively enable motion blur on selected comps
* responsiveLayout                     - Responsive scriptUI panel layout, now supporting multi-dimension buttons
* revealCurrentFile                    - Opens a Finder/Explorer window to the current AEP
* revealFirstSelectionInProject        - Reveals source of first selected layer in project
* reverseShapeGroupOrder               - Reverse shape group order in a shape layer
* selectDuplicateSourceLayers          - Select all layers that are multiple instances of the same file source
* selectKeysAtCTI                      - Select all keys at current time indicator. Set flag to TRUE to append selection, FALSE to overwrite
* selectKeysInWorkArea                 - Select all keys under the work area. Set flag to TRUE to append selection, FALSE to overwrite
* selectLaterLayers                    - Select all layers that start after current time
* setToAvgPosition-Expression          - Select three layers; third layer will be expression-set to average position of first two
* setToAvgPosition-Fixed               - Select three layers; third layer will be set to average position of first two at current time
* spatialPropToJson                    - Creates a JSON object of selected spatial properties x/y values
* toggleAppBrightness                  - Toggles AE brightness between min and max
* toggleJSDebugger                     - Toggles Javascript debugger enabled/disabled
* toggleTemporalContinuous             - Toggles Continuous on selected keys; Run to enable, shift+click to disable.
* ungroupSelectedShapeGroups           - Ungroup the selected shape groups
* updateDefaultImportFPS               - Prompts the user for to update default import FPS
* writeLayerNamesToFile                - Writes layer names to a file, separated by a new line
