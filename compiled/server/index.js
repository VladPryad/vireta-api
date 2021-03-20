"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
var http_1 = require("http");
var port = 5000;
var s = http_1.createServer(function (request, response) {
    response.end('Hello world!');
});
var server = function () {
    s.listen(port, function () {
        console.log('Running on 5000!');
    });
};
exports.server = server;
//# sourceMappingURL=index.js.map