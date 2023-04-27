export class Alert {
  id: any;
  type: any;
  message: any;
  autoClose: any;
  keepAfterRouteChange: any;
  fade: any;

  constructor(
    id: string,
    type: AlertType,
    message: string,
    autoClose: boolean,
    keepAfterRouteChange: boolean,
    fade: boolean){}
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}
