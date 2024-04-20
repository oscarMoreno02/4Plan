export interface User {
    id:number,
    firstName:string,
    lastname:string,
    email:string,
    password?:string,
    access:string,
    hiredHours:number | null,
    idCompany:number  | null,
    salary:number| null,
}
