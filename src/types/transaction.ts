
export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TransactionFormData = {
  amount: string;
  date: Date;
  description: string;
};
