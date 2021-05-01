"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("./events");
var pot_measurement_mock_1 = __importDefault(require("./pot-measurement.mock"));
var pubsub_1 = __importDefault(require("../../server/pubsub"));
function delay(i) {
    setTimeout(function () {
        pubsub_1.default.publish(events_1.NEW_INCOMING_MEASUREMENT, {
            getPotRecordsIRT: pot_measurement_mock_1.default()
        });
    }, 1000 * i);
}
exports.default = {
    Subscription: {
        getPotRecordsIRT: {
            subscribe: function (_, args, _a) {
                var pubsub = _a.pubsub;
                for (var i = 0; i < 10; i++) {
                    delay(i);
                }
                return pubsub.asyncIterator(events_1.NEW_INCOMING_MEASUREMENT);
            }
        }
    }
};
//# sourceMappingURL=getPotRecordsIRT.js.map