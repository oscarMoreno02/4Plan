import { User } from "./user";

export interface UnregisterRequest {
    id?: number;
    idCompany: number;
    idUser: number;
    status: number;
    idProcessor: number | null;
    createdAt?: string;
    updatedAt?: string;
    user?:User
}

