## Overview
This project takes a word like "taco" and spits out all of the english dictionary words that can be formed with the letters 't', 'a', 'c', and 'o'. Repeats are allowed.

The project is designed in such a way that it can be hosted by a static page hosting site, like github pages.

We use an sqlite database for the english dictionary.
Normally, a database would require us to implement a back end and not use a static site hoster, but we make use of a really cool project [https://github.com/phiresky/sql.js-httpvfs]. 

This may be unnecessary since in practice we actually load the entire dictionary into memory. But it is very cool. One downside is that I had trouble when I tried to modify some of the build steps to work with bun.js. I think due to ESM vs CJS module issues.

Additionally, I wanted to use a sqlite REGEXP statement which would be very convenient. And the version of sqlite provided by sql.js did not support it. It does seem to support the ability to add custom user functions, but I could not figure it out. I tried building sql.js-httpvfs from source and modifying the `LazyHttpDatabase` interface to try to expose the `create_function` method. No dice. The regular expression would have looked like this: `SELECT word FROM xxxxxentries WHERE word REGEXP '^[tacoTACO]+$';`

We load the entire wordlist into memory (not the definitions) and actually send it over to a web worker. Then whenever we want to run some regexp over the dictionary, we send the regexp to the web worker which does its thing and responds when it has finished. It usually only takes 0.007s to run such a query, so the web worker is somewhat unnecessary. The idea to use a web worker came about because removing duplicates from the returned words could actually take 30s+ with a regex like `/^..*$/` that would return 174000 words. So now we limit the maximum results to 2000. And removing duplicates is fast enough to perform every keystroke.

## Development
`npm install`
likely necessary before any development can take place

`npm run watch`
This allows you to make changes to index.ts and automatically create the dist/bundle.js

`npm run serve`
will allow you to navigate to localhost:8080 to see the page

At the moment we have to have two separate threads running in the terminal for watching/rebuilding and for serving to localhost. It would be nice to condense these to one but it is more trouble than it is worth :)

*worker.js* will be cached by the browser and cause development problems.
Make sure to separately open localhost:8080/dist/worker.js and force refresh that page to get changes to flush through.

## Build

`npm run build`


## Thanks
https://github.com/AyeshJayasekara/English-Dictionary-SQLite
https://github.com/DirtyHairy/worker-rpc
https://github.com/phiresky/sql.js-httpvfs
Github Copilot
WebPack
My cousin, Maddox, for the idea
