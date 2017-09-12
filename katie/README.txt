This project is meant to be hosted on github.io
After updating files, make sure to rebuild the project by running

>> watchify index.js wiki.js -o bundle.js

This will continue to run indefinitely, so cancel it with control C

and then add the changes and push to the github page

>> git add -u
>> git commit -m "blah"
>> git push origin master