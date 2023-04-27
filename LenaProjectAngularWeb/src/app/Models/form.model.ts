import { Field } from "./field.model";

export class Form {
  Id: any;
  Name: any;
  Description: any;
  UserId: any;
  Fields: any;
  CreatedAt: any;
  CreatedBy: any;
  constructor(
    Id: number,
    Name: string,
    Description: string,
    UserId: string,
    Fields: Field,
    CreatedAt: Date,
    CreatedBy:string
  ) { }
}
