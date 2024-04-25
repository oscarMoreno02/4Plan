export interface TimeZone {
    id?:number,
    idCompany:number,
    start:string,
    end:string,
    days?:Array<Day>
    formated?:string,
   
}
export interface Day {
    name: string,
    number: number,
    idTimeZone?:number,
    checked?:boolean
  }