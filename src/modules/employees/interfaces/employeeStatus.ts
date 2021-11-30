import { ObjectID } from 'mongodb';
export interface EmployeeStatus {
   _id: ObjectID;
    name: string;
    lastname:string;
    email: string;
    telephone: string;
    avatar: string;
    status: string;
  }