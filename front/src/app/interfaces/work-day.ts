
import { Assignment } from "./assignment";

export interface WorkDay {
    id?:            number;
    date:           Date;
    expectVolume:   number;
    reachedVolume:  number | null;
    published:      boolean;
    idCompany:      number;
    dayAssignments?: Assignment[];
}

