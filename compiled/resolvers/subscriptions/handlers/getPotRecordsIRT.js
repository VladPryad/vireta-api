"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pubsub_1 = __importDefault(require("../../../server/pubsub"));
var ws_1 = __importDefault(require("ws"));
var events_1 = require("../constants/events");
var services_registry_1 = require("../../../services.registry");
var serverEvents_1 = require("../constants/serverEvents");
exports.default = (function (id) {
    var ws = new ws_1.default(services_registry_1.PotService.uriWS);
    ws.onopen = function (event) {
        ws.send(id);
    };
    ws.onmessage = function (event) {
        var message = JSON.parse(event.data.toString());
        console.log(message.event);
        if (message.event == serverEvents_1.MSG) {
            pubsub_1.default.publish(events_1.NEW_INCOMING_MEASUREMENT, {
                getPotRecordsIRT: message.payload
            });
        }
    };
});
//# sourceMappingURL=getPotRecordsIRT.js.map