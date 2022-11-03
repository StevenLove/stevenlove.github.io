## Overview
This project is for use with Android logs generated from `adb logcat`.
The goal is to display these logs in a better way, more conducive to analysis.

## Getting Started
This project is still in development, so you are probably developing it.
1. `git clone https://github.com/StevenLove/stevenlove.github.io.git`
2. `cd stevenlove.github.io/betterlogcat`
3. `npm install`
4. `npm run dev` will host the page on localhost:3000
copy the logs you want to view into your clipboard. There are some demo logs for you at public/logcat.txt.
scroll down on the webpage and click the button that will read them from your clipboard.
Then you should see the data table populate with your logs.

## Making changes
hot reloading means changes are made when you save a file and you don't have to refresh the page.
That being said, changes to the nature of the Ag-Grid require a page refresh.

The files that you might want to change are at 
src/pages/index.tsx
src/grid.ts
src/lib.ts
src/parsing.ts


## Ideas about how to change the logs
1. color the datetime so it is clear when there is little time vs when >1s passes
2. maybe translate pid/tid/uid to something simpler since we only ever match them with each other
3. give an option to filter out certain repeated messages that we don't care about
4. clarify whether a given message is coming from (radio|main|system|...)
5. condense repeated messages


## Conclusion
I've decided to look into making a vscode plugin.
This app is not as pleasant as vscode to just scroll up and down. You cannot use CMD+F to search the logs easily here. you do not see the zoomed out preview. And it's just not as smooth to scroll through. 

I like the idea of programmatically assessing which lines are important - I can score each line and subtract some if it appears in a recording that I take of me doing nothing, as well as hand-picked unimportant lines. And add points for known important things like I have recorded in my notes. All my vscode plugin needs to do is perhaps apply some highlighting to different lines.

