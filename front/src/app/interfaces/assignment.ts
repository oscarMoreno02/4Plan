import { User } from "./user";
import { WorkArea } from "./work-area";
import { WorkDay } from "./work-day";
import { WorkPosition } from "./work-position";

export interface Assignment {
    id?:         number;
    idCompany:  number;
    idUser:     number | null;
    start:      string;
    end:        string;
    idPosition: number |null;
    cost:       number;
    valuation:  number | null;
    idWorkDay:  number;
    idArea:number | null,
    position?: WorkPosition ,
    area?:WorkArea,
    workDay?:WorkDay,
    user?:User,
    type:number,
    createdAt?:string,
    updatedAt?:string,
}
