

export interface RegisterRequest {
    id?:            number;
    idCompany:     number;
    newFirstName:  string;
    newLastName:   string;
    newEmail:      string;
    newHiredHours: number;
    newSalary:     number;
    status:        number;
    idProcessor:   number | null;
    createdAt?:     string;
    updatedAt?:     string;
}


