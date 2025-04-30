
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Transaction, TransactionFormData } from "@/types/transaction";
import { toast } from "@/components/ui/sonner";

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (data: TransactionFormData) => void;
  updateTransaction: (id: string, data: TransactionFormData) => void;
  deleteTransaction: (id: string) => void;
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
}

type TransactionProviderProps = {
  children: ReactNode;
};

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      amount: 1250.00,
      date: new Date("2025-04-01"),
      description: "Monthly Salary",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      amount: -45.99,
      date: new Date("2025-04-05"),
      description: "Grocery Shopping",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      amount: -120.50,
      date: new Date("2025-04-10"),
      description: "Electric Bill",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      amount: -55.00,
      date: new Date("2025-04-15"),
      description: "Internet Subscription",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "5",
      amount: -12.99,
      date: new Date("2025-04-18"),
      description: "Video Streaming Service",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);

  const addTransaction = (data: TransactionFormData) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: Number(data.amount),
      date: data.date,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setTransactions([...transactions, newTransaction]);
    toast.success("Transaction added successfully!");
  };

  const updateTransaction = (id: string, data: TransactionFormData) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === id
          ? {
              ...transaction,
              amount: Number(data.amount),
              date: data.date,
              description: data.description,
              updatedAt: new Date(),
            }
          : transaction
      )
    );
    toast.success("Transaction updated successfully!");
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
    toast.success("Transaction deleted successfully!");
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, updateTransaction, deleteTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
