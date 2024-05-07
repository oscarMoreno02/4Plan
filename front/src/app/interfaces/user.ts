import { Assignment } from "./assignment";

export interface User {
    id:number,
    firstName:string,
    lastName:string,
    email:string,
    password?:string,
    access:string,
    hiredHours:number | null,
    idCompany:number  | null,
    salary:number| null,
    assignments?:Array<Assignment>
}
