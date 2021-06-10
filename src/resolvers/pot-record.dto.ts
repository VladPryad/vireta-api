interface Record {
    timestamp: String
    value: String
}

interface Parameter {
    max: String,
    min: String,
    values: Record[]
}

interface Measurement {
    ph: Parameter
    humidity: Parameter
    temperature: Parameter
}


export default interface PotRecord {
    potId: String
    potName: String
    measurements: Measurement
    total: Number
}