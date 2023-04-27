import { Field } from "./field.model";

export class CreateForm {
  Name: any;
  Description: any;
  UserId: any;
  Fields: any;
  constructor(
    Name: string,
    Description: string,
    UserId: string,
    Fields: Field,
  ) { }
}
