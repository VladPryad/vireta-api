"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_koa_1 = require("apollo-server-koa");
var PotRecords = apollo_server_koa_1.gql("\n\ntype Record {\n    timestamp: String\n    value: String\n}\n\ntype Measurement {\n    ph: Record[]\n    humidity: Record[]\n    mineralization: Record[]\n}\n\ntype PotRecords {\n    potId: String\n    potName: String\n    measurements: \n\n}\n");
exports.default = PotRecords;
//# sourceMappingURL=pot-records.dto.js.map