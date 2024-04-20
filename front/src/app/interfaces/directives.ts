import { WorkParameter } from "./work-parameter"
import { WorkPosition } from "./work-position"

export interface WorkDirective {
    id?:number,
    idCompany:number
    idParameter:number,
    idPosition:number,
    expectedValuation:number,
    position?:WorkPosition,
    parameter?:WorkParameter
}
