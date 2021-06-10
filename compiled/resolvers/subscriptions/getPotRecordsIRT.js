"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("./constants/events");
var getPotRecordsIRT_1 = __importDefault(require("./handlers/getPotRecordsIRT"));
exports.default = {
    Subscription: {
        getPotRecordsIRT: {
            subscribe: function (_, args, _a) {
                var pubsub = _a.pubsub;
                getPotRecordsIRT_1.default(args.id);
                return pubsub.asyncIterator(events_1.NEW_INCOMING_MEASUREMENT);
            }
        }
    }
};
//# sourceMappingURL=getPotRecordsIRT.js.map