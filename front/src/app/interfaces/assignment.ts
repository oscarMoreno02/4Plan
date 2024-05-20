import { WorkArea } from "./work-area";
import { WorkPosition } from "./work-position";

export interface Assignment {
    id?:         number;
    idCompany:  number;
    idUser:     number;
    start:      string;
    end:        string;
    idPosition: number |null;
    cost:       number;
    valuation:  number | null;
    idWorkDay:  number;
    idArea:number | null,
    position?: WorkPosition ,
    area?:WorkArea,
    type:number,
    createdAt?:string,
    updatedAt?:string,
}
