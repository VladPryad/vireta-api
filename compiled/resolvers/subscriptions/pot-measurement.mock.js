"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function () {
    var seed = Date.now();
    var id = Math.floor(Math.random() * 10);
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