export type UserRole = 'admin' | 'principal' | 'cashier';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  name: string;
}

export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  course: string;
  section: string;
  year: string;
  totalFee: number;
  paidAmount: number;
  pendingBalance: number;
  feeStatus: 'Fully Paid' | 'Partially Paid' | 'Pending';
  parentPhone: string;
  parentEmail: string;
}

export interface FeeHead {
  id: string;
  name: string;
  amount: number;
}

export interface Payment {
  id: string;
  receiptNo: string;
  studentId: string;
  studentName: string;
  amount: number;
  paymentMode: 'Cash' | 'Card' | 'UPI' | 'Cheque';
  remarks: string;
  timestamp: Date;
  cashierId: string;
  cashierName: string;
}

export interface DailySession {
  id: string;
  date: string;
  openedBy: string;
  openedAt: Date;
  closedBy?: string;
  closedAt?: Date;
  isOpen: boolean;
  totalTransactions: number;
  totalAmount: number;
  cashAmount: number;
  cardAmount: number;
  upiAmount: number;
  chequeAmount: number;
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  user: string;
  role: UserRole;
  action: string;
  recordId: string;
  details: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
}

export interface Section {
  id: string;
  name: string;
  courseId: string;
  year: string;
}
