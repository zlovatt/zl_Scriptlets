<div>

# Zack Lovatt's Scriptlets

A series of small, simple AE utilities for [kbar2](https://aescripts.com/kbar), [Tool Launcher](https://aescripts.com/tool-launcher/), [Quick Menu 2](https://aescripts.com/quick-menu/) or any other script file launcher.

Note that these all worked at the time they were developed; as AE has evolved, some may stop working. I'm absotively not liable if anything breaks; run at your own discretion 💝

All tools © 2021 Zack Lovatt. All rights reserved.

## Installation Instructions

  - Click on the name of the scriptlet you'd like to download
  - `File > Save` this to your computer, ensuring you're saving as "[filename].jsx"
  - In AE: `File > Script > Run Script File...` and choose this script!

## Adobe Illustrator Scripts

See the [Illustrator](/illustrator/) folder for a few AI scripts.

</div>

---

<div>
  <div>
  <div>
  <div>

#### [Add Random Effect](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Add&#32;Random&#32;Effect.jsx)

  </div>
  <div>

Adds a random layer effect to your first selected layer 🙃

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Add Trim Paths](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Add&#32;Trim&#32;Paths.jsx)

  </div>
  <div>

Adds Trim Paths to selected shape layers, including a keyframe to start and one to end the animation.

| Modifier |        Effect         |
| -------- | --------------------- |
| SHIFT    | Skip adding keyframes |

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Apply Colour File To Colorista Free](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Apply&#32;Colour&#32;File&#32;To&#32;Colorista&#32;Free.jsx)

  </div>
  <div>

Prompts user to select a CCC/CDL, creates an adj layer w/ Colorista Free, using settings from the CDL.

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Convert New Gaussian Blur to Old](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Convert&#32;New&#32;Gaussian&#32;Blur&#32;to&#32;Old.jsx)

  </div>
  <div>

Convert the new (CC 2015.3+) Gaussian Blur effect to Gaussian Blur (Legacy)

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Count Keyframes](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Count&#32;Keyframes.jsx)

  </div>
  <div>

Counts all of the keyframes (including markers) in selected comps in project panel, or the open comp if none selected. Will recurse into precomps.

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Create Average Position Null](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Create&#32;Average&#32;Position&#32;Null.jsx)

  </div>
  <div>

Select some layers; a new null will be created at the average position of them.

| Modifier |                                    Effect                                    |
| -------- | ---------------------------------------------------------------------------- |
| SHIFT    | Set position to a fixed value at current time, vs using a dynamic expression |

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Default Folders v2.0](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Default&#32;Folders&#32;v2.0.jsx)

  </div>
  <div>

Creates a number of folders (or, if ran as a window, lets you customzie folder names to create).

Based on [DefaultFolders by Impudent1](http://aenhancers.com/viewtopic.php?t=37).

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Delete Keys at Time](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Delete&#32;Keys&#32;at&#32;Time.jsx)

  </div>
  <div>

Delete all keys at current time

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Disable All Comp Expressions](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Disable&#32;All&#32;Comp&#32;Expressions.jsx)

  </div>
  <div>

Disables all expressions in active comp

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Freeze Properties](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Freeze&#32;Properties.jsx)

  </div>
  <div>

Uses expressions to freeze selected properties (or layers) to current value.

Run the script again to unfreeze selected properties/layers.

##### Notes:

  - Skips properties that already have expressions.

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Generate Font Weight Selector](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Generate&#32;Font&#32;Weight&#32;Selector.jsx)

  </div>
  <div>

Looks at an existing text layer, and tries to create an expression to select
font weight, based on the existing text layer's font.

##### To use:

  - Select a text layer
  - Run script
  - It will create a slider on the text layer, and an expression on sourceText
  - The slider will animate from 1 to the # of weights found
  - The expression will list all available font weights it can detect!

##### Notes:

  - this may not work in every case. Fonts are weird.
  - this relies on CC 2019+.
  - Font PostScript name logic from [Ten](https://github.com/ten-A/Extend_Script_experimentals) and licensed under MIT (included in the file)

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Get Property Value](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Get&#32;Property&#32;Value.jsx)

  </div>
  <div>

![Get Property Value UI](https://github.com/zlovatt/zl_Scriptlets/raw/master/img/getPropertyValue.png)

Displays the current value of the selected property (after expressions), letting you copy & paste it elsewhere.

If run as a script (or from kbar), panel will display the value immediately.

If run as a ScriptUI Panel (if installed in AE), you can dock the panel to get values quickly.

##### Notes:

  - The panel also includes an experimental 'copy to clipboard' function; it usually takes a few seconds to actually copy to clipboard, so be patient with it.

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Keep Every N Keys](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Keep&#32;Every&#32;N&#32;Keys.jsx)

  </div>
  <div>

Looks at your keyframes and keeps every # of them.

By default, will keep every 2nd keyframe, and delete the rest. Note that the first and last keyframes are always kept.

Intended for use with baked expressions, such as when exporting with Bodymovin.

##### Example:

Based on 10 keyframes (🔷)

| Interval      | Result              |
|---------------|---------------------|
| 1 (no change) | 🔷 🔷 🔷 🔷 🔷 🔷 🔷 🔷 🔷 🔷 |
| 2 (default)   | 🔷 ✖️ 🔷 ✖️ 🔷 ✖️ 🔷 ✖️ 🔷 🔷 |
| 3             | 🔷 ✖️ ✖️ 🔷 ✖️ ✖️ 🔷 ✖️ ✖️ 🔷 |
| 4             | 🔷 ✖️ ✖️ ✖️ 🔷 ✖️ ✖️ ✖️ 🔷 🔷 |
| 5             | 🔷 ✖️ ✖️ ✖️ ✖️ 🔷 ✖️ ✖️ ✖️ 🔷 |


| Modifier |           Effect           |
| -------- | -------------------------- |
| SHIFT    | Specify the interval value |

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Key Stumbler](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Key&#32;Stumbler.jsx)

  </div>
  <div>

![Key Stumbler Example](https://github.com/zlovatt/zl_Scriptlets/raw/master/img/keyStumbler.gif)

Takes a pair of keyframes and adds extra randomly stumbling, staggering keyframes between them.

Helpful for making realistic progress bars, and probably not much else!

Options for the # of keyframes to create, the chance of each keyframe being hold or bezier (vs linear, the default); the chance of bezier keyframes being autobezier or continuous, and the min # of frames to keep between keyframes.

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Load Last Autosave](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Load&#32;Last&#32;Autosave.jsx)

  </div>
  <div>

Tries to find the last autosave project based on your current AEP, and open it.

##### Notes:

  - Only works in English installs of AE at the moment.

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Loop Selected Layers](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Loop&#32;Selected&#32;Layers.jsx)

  </div>
  <div>

Enables time remapping on selected layers, and adds a loopOut("cycle") to loop the layer.

| Modifier |          Effect           |
| -------- | ------------------------- |
| CTRL     | Loop IN instead of OUT    |
| SHIFT    | PINGPONG instead of CYCLE |
| BOTH     | Loop IN with PINGPONG     |

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Mistika VR to AE Null](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Mistika&#32;VR&#32;to&#32;AE&#32;Null.jsx)

  </div>
  <div>

Translates a Mistika VR .grp file to null sliders for yaw/pitch/roll

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Move First Layer of Selected Comps to End](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Move&#32;First&#32;Layer&#32;of&#32;Selected&#32;Comps&#32;to&#32;End.jsx)

  </div>
  <div>

Moves the first layer of each selected comp in project panel to the end of each comp

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [New Text Layer](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/New&#32;Text&#32;Layer.jsx)

  </div>
  <div>

Makes a new empty text layer.

| Modifier |                         Effect                          |
| -------- | ------------------------------------------------------- |
| SHIFT    | Create Paragraph (box) text layer instead of Point text |

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Parent Each Layer to Layer Above](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Parent&#32;Each&#32;Layer&#32;to&#32;Layer&#32;Above.jsx)

  </div>
  <div>

Parent each selected layer to above layer

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Points to Nulls](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Points&#32;to&#32;Nulls.jsx)

  </div>
  <div>

Adds nulls to points of seleted shape layers or masks.

This was developed before the official "Paths to Nulls" panel 😅

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Phone a Friend](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Phone&#32;A&#32;Friend.jsx)

  </div>
  <div>

Generates Touch Tone noises for your input in AE!

Uses markers & expressions-- move markers & change text to change audio!

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Quick Rename Layers](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Quick&#32;Rename&#32;Layers.jsx)

  </div>
  <div>

Quickly renames all selected layers to text of your choice, adding an incrementer # to the end of the layer name.

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Randomize Shape Group Order](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Randomize&#32;Shape&#32;Group&#32;Order.jsx)

  </div>
  <div>

Randomize order of selected shape groups

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Recursive Enable Moblur](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Recursive&#32;Enable&#32;Moblur.jsx)

  </div>
  <div>

Recursively enable motion blur on selected comps, including all layers & precomps

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Reveal Current File](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Reveal&#32;Current&#32;File.jsx)

  </div>
  <div>

Opens a Finder/Explorer window to the current AEP

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Reveal Layer Source In Project](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Reveal&#32;Layer&#32;Source&#32;In&#32;Project.jsx)

  </div>
  <div>

Reveals source of first selected layer in project

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Reverse Shape Group Order](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Reverse&#32;Shape&#32;Group&#32;Order.jsx)

  </div>
  <div>

Reverse shape group order in a shape layer

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Select Duplicate Source Layers](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Select&#32;Duplicate&#32;Source&#32;Layers.jsx)

  </div>
  <div>

Select all layers that are multiple instances of the same file source.

So-- if you have two instances of the same movie file, this will select them both.

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Select Keys at Current Time](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Select&#32;Keys&#32;at&#32;Current&#32;Time.jsx)

  </div>
  <div>

Select all keys at current time indicator.

| Modifier |                           Effect                           |
| -------- | ---------------------------------------------------------- |
| SHIFT    | Add keyframes to current selection, vs replacing selection |

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Select Keys in Work Area](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Select&#32;Keys&#32;in&#32;Work&#32;Area.jsx)

  </div>
  <div>

Select all keys under the work area.

| Modifier |                           Effect                           |
| -------- | ---------------------------------------------------------- |
| SHIFT    | Add keyframes to current selection, vs replacing selection |

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Select Later Layers](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Select&#32;Later&#32;Layers.jsx)

  </div>
  <div>

Selects all layers in your comp that start after the selected layer.

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Smart-Separate Dimensions](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Smart&#32;Separate&#32;Dimensions.jsx)

  </div>
  <div>

Separates a layer's position dimensions, preserving easing if keyframes exist.

##### Notes:

  - If you've adjusted the spatial interpolation (by changing bezier handles in comp viewer), this won't maintain that. That's... hard.

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Swap Item Names](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Swap&#32;Item&#32;Names.jsx)

  </div>
  <div>

Swaps the names of 2 selected project items.

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Time Stretch Layer](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Time&#32;Stretch&#32;Layer.jsx)

  </div>
  <div>

Uses Time Remap to stretch layers, prompting user to enter speed. Also lengthens comp to fit, if necessary.

| Modifier |           Effect           |
| -------- | -------------------------- |
| CTRL/CMD | Remap to half (0.5x) speed |
| SHIFT    | Remap to double (2x) speed |

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Toggle AE Brightness](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Toggle&#32;AE&#32;Brightness.jsx)

  </div>
  <div>

Toggles AE brightness between min and max

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Toggle JS Debugger](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Toggle&#32;JS&#32;Debugger.jsx)

  </div>
  <div>

Toggles Javascript debugger enabled/disabled

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Toggle Layer Expressions](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Toggle&#32;Layer&#32;Expressions.jsx)

  </div>
  <div>

Disables all enabled expressions on selected layers & enables all disabled expressions.

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Toggle Legacy UI (for all scripts)](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Toggle&#32;Legacy&#32;UI&#32;(for&#32;all&#32;scripts).jsx)

  </div>
  <div>

Toggles 'Use Legacy UI' to either ON or OFF (depending on your tastes) for all installed scriptUI panels

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Toggles Temporal Continuous](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Toggle&#32;Temporal&#32;Continuous.jsx)

  </div>
  <div>

Toggles Continuous on selected keys.

| Modifier |                Effect                 |
| -------- | ------------------------------------- |
| SHIFT    | Disable Continuous, instead of Enable |

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Ungroup Selected Shape Groups](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Ungroup&#32;Selected&#32;Shape&#32;Groups.jsx)

  </div>
  <div>

Ungroups all selected shape groups.

##### Notes:

  - This assumes that each group ONLY has a 'path' within it. If there's more, it'll fail.
  - I know this isn't great, buuut it's a start! 🤷‍♀️

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Update Default Import FPS](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Update&#32;Default&#32;Import&#32;FPS.jsx)

  </div>
  <div>

Prompts the user for to update default import FPS.

This is used when importing image sequences, the fps that AE interprets it as.

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Write Item Uses To Comment](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Write&#32;Item&#32;Uses&#32;To&#32;Comment.jsx)

  </div>
  <div>

Counts the # of times a project item is used, and writes it to the item comment field (which can be sorted!).

  </div>
  </div>
  </div>
</div>

---

<div>
  <div>
  <div>
  <div>

#### [Write Layer Names to File](https://raw.githubusercontent.com/zlovatt/zl_Scriptlets/master/Write&#32;Layer&#32;Names&#32;to&#32;File.jsx)

  </div>
  <div>

Writes layer names to a file, one layer name per line.

  </div>
  </div>
  </div>
</div>
