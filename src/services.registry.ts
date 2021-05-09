interface IService {
    //default HTTP REST URL
    readonly url: string
    readonly uriWS?: string
}

export const AccountService: IService  = {
    url: "http://localhost:3000"
}
export const PotService: IService = {
    url: "http://localhost:3001",
    uriWS: "ws://localhost:4001/pot"
}