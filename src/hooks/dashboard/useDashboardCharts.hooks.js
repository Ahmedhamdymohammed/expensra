import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetMonthlyTransactions } from "../index";
import { normalizeData } from "../../utils";

export const useTrendsData = () => {
  const currentMonth = new Date().getMonth() + 1;
  const [searchParams] = useSearchParams();

  const month = Number(searchParams.get("month")) || currentMonth;
  const { data, isPending } = useGetMonthlyTransactions({ month: month });
  const transactions = normalizeData(data);

  const trendsData = useMemo(() => {
    const expenseTransactions = transactions?.filter((t) => {
      return t.transaction_type === "expense";
    });

    const map = {};

    expenseTransactions?.forEach((t) => {
      const date = t.transaction_date;
      map[date] = (map[date] || 0) + Number(t.amount || 0);
    });

    return Object.entries(map)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([date, amount]) => ({
        date,
        amount,
      }));
  }, [transactions]);

  return { trendsData, isPending };
};
