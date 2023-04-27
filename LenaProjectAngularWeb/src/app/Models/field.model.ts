import { DataTypes } from "./enum.model";

export class Field {
  Id: any;
  Required: any;
  Name: any;
  DataType: any;
  FormId: any;
  constructor(
    Id: number,
    Required: boolean,
    Name: string,
    DataType: DataTypes,
    FormId: number
  ) { }
}
