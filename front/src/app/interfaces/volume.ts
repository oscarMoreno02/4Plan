import { TimeZone } from "./time-zone";

export interface Volume {
    id:number,
    idWorkDay:number,
    idTimeZone:number,
    timeZone:TimeZone,
    volumeExpect:number,
    reachedVolume:number
}
