
import { Assignment } from "./assignment";
import { Volume } from "./volume";

export interface WorkDay {
    id?:            number;
    date:           Date;
    expectVolume:   number;
    reachedVolume:  number | null;
    published:      boolean;
    idCompany:      number;
    dayAssignments?: Assignment[];
    volumes?:Volume[]
}

