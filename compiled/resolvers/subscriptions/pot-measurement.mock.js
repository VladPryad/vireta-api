"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
function backendTest() {
    var socket = new ws_1.default("ws://localhost:4001/pot");
    function openHandler() {
        socket.send("Client Connection opened");
    }
    socket.on("open", openHandler);
}
exports.default = (function () {
    var seed = Date.now();
    var id = Math.floor(Math.random() * 10);
    backendTest();
    return {
        potId: id + '',
        potName: "Pot " + id,
        measurements: {
            ph: [{
                    timestamp: seed + '',
                    value: Math.random() * 10 + ''
                }, {
                    timestamp: seed + 10 + '',
                    value: Math.random() * 10 + ''
                }, {
                    timestamp: seed + 20 + '',
                    value: Math.random() * 10 + ''
                }],
            humidity: [{
                    timestamp: seed + '',
                    value: Math.random() * 10 + ''
                }, {
                    timestamp: seed + 10 + '',
                    value: Math.random() * 10 + ''
                }, {
                    timestamp: seed + 20 + '',
                    value: Math.random() * 10 + ''
                }],
            mineralization: [{
                    timestamp: seed + '',
                    value: Math.random() * 10 + ''
                }, {
                    timestamp: seed + 10 + '',
                    value: Math.random() * 10 + ''
                }, {
                    timestamp: seed + 20 + '',
                    value: Math.random() * 10 + ''
                }]
        },
        total: 3
    };
});
//# sourceMappingURL=pot-measurement.mock.js.map