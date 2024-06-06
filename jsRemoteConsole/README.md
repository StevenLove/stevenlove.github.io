# JS Remote Console

## Purpose
__JS Remote Console__ is useful for a web developer debugging a mobile site who is frustated by their inability to see their debugging statements generated with `console.log` on a mobile browser.

There are other possible solutions to this problem, but __JS Remote Console__ aims to solve it with the least amount of setup.


## Usage
1. Open __[www.jsconsole.net](www.jsconsole.net)__ and copy the provided &lt;script&gt; tag 
2. Insert the &lt;script&gt; tag into your page's HTML source
3. Load your page and watch your debugging statements appear on __[www.jsconsole.net](www.jsconsole.net)__


## 

## Limitations
This is not a replacement for a browser's developer tools. Debugging a complex application takes a lot more than simple debug messages, and you should invest in learning to use the right tools for the job.

If you are debugging on an __Android__ device, you should be able to connect the device to your computer and get access to full developer tools.

If you are debugging on an __iOS__ device then you should be able to connect it to your __Mac__ computer to access full developer tools. I actually created this project because I don't own a Mac computer and believed that I would not be able to see debug messages on iOS any other way. However, it looks like [this other project](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter) could have addressed my situation.

This project only works with the following functions that generate debug messages
```
console.log()
console.warn()
console.error()
console.info()
``` 