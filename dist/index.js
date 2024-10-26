var express = require("express");
var app = express();
Port = 8000;
var routes = require("./routes");
var morgan = require("morgan");
routes(app);
app.use(morgan("combined"));
app.listen(Port, function () {
    console.log("listening on ".concat(Port));
});
