
import { useMemo } from "react";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactions } from "@/context/TransactionContext";
import { formatCurrency } from "@/lib/formatters";

export function ExpensesChart() {
  const { transactions } = useTransactions();

  const chartData = useMemo(() => {
    const monthlyData: Record<string, { month: string, expenses: number, income: number }> = {};
    
    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthKey = format(date, "yyyy-MM");
      const monthLabel = format(date, "MMM yyyy");
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthLabel,
          expenses: 0,
          income: 0,
        };
      }
      
      if (transaction.amount < 0) {
        monthlyData[monthKey].expenses += Math.abs(transaction.amount);
      } else {
        monthlyData[monthKey].income += transaction.amount;
      }
    });
    
    return Object.values(monthlyData);
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-4 border rounded-lg shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-income">Income: {formatCurrency(payload[0].value)}</p>
          <p className="text-expense">Expenses: {formatCurrency(payload[1].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {chartData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              No transaction data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar name="Income" dataKey="income" fill="#4ADE80" />
                <Bar name="Expenses" dataKey="expenses" fill="#F87171" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
