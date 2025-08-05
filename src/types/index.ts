import { DebtsStatus, UsersRole } from '@prisma/client';

export class DebtType {
  id: string;
  name: string;
  term: number;
  remainingMonths: number;
  description: string;
  status: DebtsStatus;
  createdAt: string;
  startingTime: string;
  summaryAmount: number;
  remainingAmount: number;
  monthlyPayment: number;
}


export class SellerType{
  id:string;
  name :     string
  login  :   string              
  phone  :   string              
  password : string
  role   :   UsersRole           
  PINcode:   number
  createdAt: any            
  email   :  string              
  balance :  number | null
}