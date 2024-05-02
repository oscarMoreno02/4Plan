export interface Assignment {
    id?:         number;
    idCompany:  number;
    idUser:     number;
    start:      string;
    end:        string;
    idPosition: null;
    cost:       number;
    valuation:  number | null;
    idWorkDay:  number;
    createdAt:  string;
    updatedAt:  string;
}
