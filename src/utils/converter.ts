import RawRecord from '../resolvers/database-raw-record.dto';
import Measurement from '../resolvers/pot-record.dto';

export function rawRecordsToStandardMeasurement(raw: RawRecord[]): Measurement {

    function minmax(arr: Number[]) {
        let min;
        let max;

        for(let el of arr) {

            if(typeof min !== 'number') min = el;
            if(typeof max !== 'number') max = el

            if(min > el) min = el;
            if(max < el) max = el;
        }
        return [min, max];
    }

    let res: Measurement;


    let minmaxValues = {
        ph: minmax(raw.filter(el => !!el.ph).map(el => Number(el.ph))),
        h: minmax(raw.filter(el => !!el.humidity).map(el => Number(el.humidity))),
        t: minmax(raw.filter(el => !!el.salinity).map(el => Number(el.salinity)))
    }

    let measurements: any = {};
    measurements.ph = {
        min: (minmaxValues.ph[0] || 0).toString(),
        max: (minmaxValues.ph[0] || 0).toString(),
        values: Array.from(raw.filter(el => !!el.ph).map(el => {
            return {
                value: el.ph!,
                timestamp: Math.round(new Date(el.timestamp.toString()).getTime()/1000)
            }
        }))
    }
    measurements.humidity = {
        min: (minmaxValues.h[0] || 0).toString(),
        max: (minmaxValues.h[0] || 0).toString(),
        values: raw.filter(el => !!el.humidity).map(el => {
            return {
                value: el.humidity!,
                timestamp: Math.round(new Date(el.timestamp.toString()).getTime()/1000)
            }
        })
    }
    measurements.temperature = {
        min: (minmaxValues.t[0] || 0).toString(),
        max: (minmaxValues.t[0] || 0).toString(),
        values: raw.filter(el => !!el.salinity).map(el => {
            return {
                value: el.salinity!,
                timestamp:Math.round(new Date(el.timestamp.toString()).getTime()/1000)
            }
        })
    }

    res = {
        potId: (!!raw[0] ? raw[0].potId : 0).toString(),
        potName: "",
        measurements,
        total: raw.length 
    }

    return res;
}