
import { TransactionProvider } from "@/context/TransactionContext";
import { FinanceSummary } from "@/components/FinanceSummary";
import { ExpensesChart } from "@/components/ExpensesChart";
import { TransactionList } from "@/components/TransactionList";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";

const Index = () => {
  return (
    <TransactionProvider>
      <div className="container py-8 bg-background">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Personal Finance Tracker</h1>
            <AddTransactionDialog />
          </div>
          
          <FinanceSummary />
          
          <ExpensesChart />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Recent Transactions</h2>
            </div>
            <TransactionList />
          </div>
        </div>
      </div>
    </TransactionProvider>
  );
};

export default Index;
