import { User } from "./user";


export interface StaffRequest {
    id?:        number;
    idUser:    number;
    idCompany: number;
    date:      string;
    type:      number;
    status:    number;
    createdAt?: string;
    updatedAt?: string;
    user?:User
}
