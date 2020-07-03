# Zack Lovatt's Scriptlets

A series of small, simple AE utilities for [kbar2](https://aescripts.com/kbar), [Tool Launcher](https://aescripts.com/tool-launcher/), [Quick Menu 2](https://aescripts.com/quick-menu/) or any other script file launcher.

Note that these all worked at the time they were developed; as AE has evolved, some may stop working. I'm absotively not liable if anything breaks; run at your own discretion 💝

zack@zacklovatt.com

Copyright (c) 2019 Zack Lovatt. All rights reserved.

## TO RUN THESE SCRIPTS

### via Github:

- Click on any of the script names _below_.
- In the top right corner of the code block, press the 'Raw' button to view the actual .jsx script file
- Save (cmd/ctrl+s) this file somewhere on your computer
- In AE: File > Script > Run Script File... and choose this script!

### via Bitbucket:

- Click on any of the filenames _above_.
- In the top right corner of the code block, press the '...' button
- Choose 'Open Raw' to view the actual .jsx script file
- Save (cmd/ctrl+s) this file somewhere on your computer
- In AE: File > Script > Run Script File... and choose this script!

---

## [Add Random Effect](Add&#32;Random&#32;Effect.jsx)

Adds a random layer effect to your first selected layer 🙃

---

## [Add Trim Paths](Add&#32;Trim&#32;Paths.jsx)

Adds Trim Paths to selected shape layers

---

## [Apply Colour File To Colorista Free](Apply&#32;Colour&#32;File&#32;To&#32;Colorista&#32;Free.jsx)

Prompts user to select a CCC/CDL, creates an adj layer w/ Colorista Free with the CDL

---

## [Convert New Gaussian Blur to Old](Convert&#32;New&#32;Gaussian&#32;Blur&#32;to&#32;Old.jsx)

Convert the new (CC 2015.3+) Gaussian Blur effect to Gaussian Blur (Legacy)

---

## [Create Nulls From Paths - Responsive](Create&#32;Nulls&#32;From&#32;Paths&#32;-&#32;Responsive.jsx)

A responsive layout version of the native "Create Nulls from Paths" panel (as of 2018/04/27)

---

## [Default Folders v2.0](Default&#32;Folders&#32;v2.0.jsx)

Creates a number of folders (or, if ran as a window, lets you customzie folder names to create)

---

## [Delete Keys at Time](Delete&#32;Keys&#32;at&#32;Time.jsx)

Delete all keys at current time

---

## [Disable All Comp Expressions](Disable&#32;All&#32;Comp&#32;Expressions.jsx)

Disables all expressions in active comp

---

## [Force Legacy Skin](Force&#32;Legacy&#32;Skin.jsx)

Tries to force 'use legacy skin' to ON for specific script passed by filename

---

## [Force Legacy Skin (for all scripts)](Force&#32;Legacy&#32;Skin&#32;(for&#32;all&#32;scripts).jsx)

Tries to force 'use legacy skin' to ON for all installed scriptUI panels

---

## [Keep Every N Keys](Keep&#32;Every&#32;N&#32;Keys.jsx)

Looks at your keyframes and keeps every # of them.

By default, will keep every 2nd keyframe, and delete the rest. Note that the first and last keyframes are always kept.

Hold SHIFT when running the script to specify the interval.

Examples, starting with 10 keyframes: 🔷

| Interval      | Result              |
|---------------|---------------------|
| 1 (no change) | 🔷 🔷 🔷 🔷 🔷 🔷 🔷 🔷 🔷 🔷 |
| 2 (default)   | 🔷 ✖️ 🔷 ✖️ 🔷 ✖️ 🔷 ✖️ 🔷 🔷 |
| 3             | 🔷 ✖️ ✖️ 🔷 ✖️ ✖️ 🔷 ✖️ ✖️ 🔷 |
| 4             | 🔷 ✖️ ✖️ ✖️ 🔷 ✖️ ✖️ ✖️ 🔷 🔷 |
| 5             | 🔷 ✖️ ✖️ ✖️ ✖️ 🔷 ✖️ ✖️ ✖️ 🔷 |


Intended for use with baked expressions, such as when exporting with Bodymovin.

---

## [Loop Selected Layers](Loop&#32;Selected&#32;Layers.jsx)

Loop out ('cycle') selected layers

---

## [Mistika VR to AE Null](Mistika&#32;VR&#32;to&#32;AE&#32;Null.jsx)

Translates a Mistika VR .grp file to null sliders for yaw/pitch/roll

---

## [Move First Layer of Selected Comps to End](Move&#32;First&#32;Layer&#32;of&#32;Selected&#32;Comps&#32;to&#32;End.jsx)

Moves the first layer of each selected comp in project panel to the end of each comp

---

## [New Text Layer](New&#32;Text&#32;Layer.jsx)

Creates a new text layer

---

## [Parent Each Layer to Layer Above](Parent&#32;Each&#32;Layer&#32;to&#32;Layer&#32;Above.jsx)

Parent each selected layer to above layer

---

## [Points to Nulls](Points&#32;to&#32;Nulls.jsx)

Adds nulls to points of seleted shape layers or masks.

This was developed before the official "Paths to Nulls" panel 😅

---

## [Randomize Shape Group Order](Randomize&#32;Shape&#32;Group&#32;Order.jsx)

Randomize order of selected shape groups

---

## [Recursive Enable Moblur](Recursive&#32;Enable&#32;Moblur.jsx)

Recursively enable motion blur on selected comps

---

## [Reveal Current File](Reveal&#32;Current&#32;File.jsx)

Opens a Finder/Explorer window to the current AEP

---

## [Reveal Layer Source In Project](Reveal&#32;Layer&#32;Source&#32;In&#32;Project.jsx)

Reveals source of first selected layer in project

---

## [Reverse Shape Group Order](Reverse&#32;Shape&#32;Group&#32;Order.jsx)

Reverse shape group order in a shape layer

---

## [Select Duplicate Source Layers](Select&#32;Duplicate&#32;Source&#32;Layers.jsx)

Select all layers that are multiple instances of the same file source

---

## [Select Keys at Current Time](Select&#32;Keys&#32;at&#32;Current&#32;Time.jsx)

Select all keys at current time indicator.

Set flag to `true` to append selection, `false` to overwrite

---

## [Select Keys in Work Area](Select&#32;Keys&#32;in&#32;Work&#32;Area.jsx)

Select all keys under the work area.

Set flag to `true` to append selection, `false` to overwrite

---

## [Select Later Layers](Select&#32;Later&#32;Layers.jsx)

Select all layers that start after current time

---

## [Set to Average Position (Expression)](Set&#32;to&#32;Average&#32;Position&#32;(Expression).jsx)

Select three layers; third layer will be expression-set to average position of first two

---

## [Set to Average Position (Fixed)](Set&#32;to&#32;Average&#32;Position&#32;(Fixed).jsx)

Select three layers; third layer will be set to average position of first two at current time

---

## [Smart-Separate Dimensions](Smart&#32;Separate&#32;Dimensions.jsx)

Separates a layer's position dimensions, preserving easing if keyframes exist.

Note: If you've adjusted the spatial interpolation (by changing bezier handles in comp viewer), this won't maintain that. That's... a very very hard task.

---

## [Toggle AE Brightness](Toggle&#32;AE&#32;Brightness.jsx)

Toggles AE brightness between min and max

---

## [Toggle JS Debugger](Toggle&#32;JS&#32;Debugger.jsx)

Toggles Javascript debugger enabled/disabled

---

## [Toggle Temporal Continuous](Toggle&#32;Temporal&#32;Continuous.jsx)

Toggles Continuous on selected keys.

Run to enable, hold SHIFT to disable.

---

## [Ungroup Selected Shape Groups](Ungroup&#32;Selected&#32;Shape&#32;Groups.jsx)

Ungroup the selected shape groups

---

## [Update Default Import FPS](Update&#32;Default&#32;Import&#32;FPS.jsx)

Prompts the user for to update default import FPS

---

## [Write Layer Names to File](Write&#32;Layer&#32;Names&#32;to&#32;File.jsx)

Writes layer names to a file, separated by a new line
