interface Record {
    timestamp: String
    value: String
}

interface Measurement {
    ph: Record[]
    humidity: Record[]
    mineralization: Record[]
}


export default interface PotRecord {
    potId: String
    potName: String
    measurements: Measurement
    total: Number
}