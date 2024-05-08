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
    position?: WorkPosition ,
    type:number
}
