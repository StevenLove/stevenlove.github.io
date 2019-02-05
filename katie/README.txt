This project is meant to be hosted on github.io
After updating files, make sure to rebuild the project by running

>> watchify index.js wiki.js -o bundle.js

This will continue to run indefinitely, so cancel it with control C.
you also need another window to run

>> nodemon serve.js

if you want to visit this page at localhost:3002.
Otherwise you can just open index.html in your browser.


=======================================
When done editing, add the changes and push to the github page

>> git add -u
>> git commit -m "blah"
>> git push origin master

