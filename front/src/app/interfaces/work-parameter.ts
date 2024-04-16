import { TimeZone } from "./time-zone"

export interface WorkParameter {
    id? :number,
    idCompany:number,
    expectedVolume:number
    idTimeZone:number,
    timeZone?:TimeZone
}
