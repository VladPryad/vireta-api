"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawRecordsToStandardMeasurement = void 0;
function rawRecordsToStandardMeasurement(raw) {
    function minmax(arr) {
        var min;
        var max;
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var el = arr_1[_i];
            if (typeof min !== 'number')
                min = el;
            if (typeof max !== 'number')
                max = el;
            if (min > el)
                min = el;
            if (max < el)
                max = el;
        }
        return [min, max];
    }
    var res;
    var minmaxValues = {
        ph: minmax(raw.filter(function (el) { return !!el.ph; }).map(function (el) { return Number(el.ph); })),
        h: minmax(raw.filter(function (el) { return !!el.humidity; }).map(function (el) { return Number(el.humidity); })),
        t: minmax(raw.filter(function (el) { return !!el.salinity; }).map(function (el) { return Number(el.salinity); }))
    };
    var measurements = {};
    measurements.ph = {
        min: (minmaxValues.ph[0] || 0).toString(),
        max: (minmaxValues.ph[0] || 0).toString(),
        values: Array.from(raw.filter(function (el) { return !!el.ph; }).map(function (el) {
            return {
                value: el.ph,
                timestamp: Math.round(new Date(el.timestamp.toString()).getTime() / 1000)
            };
        }))
    };
    measurements.humidity = {
        min: (minmaxValues.h[0] || 0).toString(),
        max: (minmaxValues.h[0] || 0).toString(),
        values: raw.filter(function (el) { return !!el.humidity; }).map(function (el) {
            return {
                value: el.humidity,
                timestamp: Math.round(new Date(el.timestamp.toString()).getTime() / 1000)
            };
        })
    };
    measurements.temperature = {
        min: (minmaxValues.t[0] || 0).toString(),
        max: (minmaxValues.t[0] || 0).toString(),
        values: raw.filter(function (el) { return !!el.salinity; }).map(function (el) {
            return {
                value: el.salinity,
                timestamp: Math.round(new Date(el.timestamp.toString()).getTime() / 1000)
            };
        })
    };
    res = {
        potId: (!!raw[0] ? raw[0].potId : 0).toString(),
        potName: "",
        measurements: measurements,
        total: raw.length
    };
    return res;
}
exports.rawRecordsToStandardMeasurement = rawRecordsToStandardMeasurement;
//# sourceMappingURL=converter.js.map