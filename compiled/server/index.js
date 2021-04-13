"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
var http_1 = require("http");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var s = http_1.createServer(function (request, response) {
    response.end('Hello world!');
});
var server = function () {
    s.listen(process.env.PORT_REST, function () {
        console.log("Running on " + process.env.PORT_REST + "!");
    });
};
exports.server = server;
//# sourceMappingURL=index.js.map