var express = require('express');
var app = express();

app.use(express.static('.'));
app.listen(3002, function(){
    console.log("listening on port 3002");
})
