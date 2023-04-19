# Zack Lovatt's Illustrator Scriptlets

A series of small, simple AI utilities to run via File > Scripts, or any other script file launcher.

Note that these all worked at the time they were developed; as AI has evolved, some may stop working. I'm absotively not liable if anything breaks; run at your own discretion 💝

All tools © 2023 Zack Lovatt unless otherwise stated. All rights reserved.

## TO RUN THESE SCRIPTS

- Click on any of the script names _below_.
- In the top right corner of the code block, press the 'Raw' button to view the actual .jsx script file
- Save (cmd/ctrl+s) this file somewhere on your computer
- In AI: `File > Script > Other Script...` and choose this script!

---

## [Create Incremental Text Items](Create&#32;Incremental&#32;Text&#32;Items.jsx)

Prompts for start & end numbers, and creates in current artboard a text item consisting of each #.

For example: Entering '0' and '10' will create a new text layer for each number between '0' and '10'.

---

## [Resize AI Artboard](Resize&#32;AI&#32;Artboard.jsx)

Adobe Illustrator script to resize the current artboard & all artwork within it.

Note that if your new dimensions are in a different aspect ratio than the current artboard, stroke widths will be scaled disproportionately!

This is based on "Illustrator_Scale_Artboard_and_Artwork.jsx" by Shivendra Agarwal, from https://gist.github.com/shivendra14/f135d6279a20053a62a798be5da5e174
