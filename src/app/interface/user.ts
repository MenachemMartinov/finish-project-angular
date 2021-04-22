export interface User {
  _id?: string;
  name?: string;
  email?:string;
  password?: string;
  user?: boolean;
  business?: boolean;
  manager?: boolean;
}
