import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";



interface TransactionsProviderProps {
  children: ReactNode;
}

interface Transactions {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

type TransactionInput = Omit<Transactions, "id" | "createdAt">;


interface TransactionsContextData {
  transactions: Transactions[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

// type TransactionInput = Pick<Transactions,"title"| "type"| "category"| "amount">;


const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsContextProvider({ children }: TransactionsProviderProps) {

  const [transactions, setTransactions] = useState<Transactions[]>([]);

  useEffect(() => {

    async function getTransaction() {
      const { data } = await api.get("transactions");
      setTransactions(data.transactions);
    }
    getTransaction();
  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", {...transactionInput, createdAt: new Date()})
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);

  }


  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) throw new Error("shoulbe use with TransactionsContextProvider");
  return context;
};