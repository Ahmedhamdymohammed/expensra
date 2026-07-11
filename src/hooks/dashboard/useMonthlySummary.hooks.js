import { useSearchParams } from "react-router-dom";
import { useFinancialSummary } from "../index";

export const useMonthlySummary = () => {
  const currentMonth = new Date().getMonth() + 1;
  const [searchParams] = useSearchParams();

  const month = Number(searchParams.get("month")) || currentMonth;
  const prevMonth = month === 1 ? 12 : month - 1;

  const { data: currentData, isPending: loadingCurrent } = useFinancialSummary({
    month: month,
  });

  const { data: prevData, isPending: loadingPrev } = useFinancialSummary({
    month: prevMonth,
  });

  const totalIncomes =
    currentData?.totalIncomes?.incomes_by_category?.total_incomes ?? 0;

  const totalExpenses =
    currentData?.totalExpenses?.expenses?.total_expenses ?? 0;

  const totalBalance = totalIncomes - totalExpenses;

  const prevIncomes =
    prevData?.totalIncomes?.incomes_by_category?.total_incomes ?? 0;

  const prevExpenses = prevData?.totalExpenses?.expenses?.total_expenses ?? 0;

  const prevBalance = prevIncomes - prevExpenses;

  const incomeChange =
    prevIncomes === 0
      ? 0
      : Math.round(((totalIncomes - prevIncomes) / prevIncomes) * 100);

  const expenseChange =
    prevExpenses === 0
      ? 0
      : Math.round(((totalExpenses - prevExpenses) / prevExpenses) * 100);

  const balanceChange =
    prevBalance === 0
      ? 0
      : Math.round(((totalBalance - prevBalance) / prevBalance) * 100);

  return {
    data: currentData,
    month,
    
    totalIncomes,
    totalExpenses,
    totalBalance,
    prevBalance,

    incomeChange,
    expenseChange,
    balanceChange,

    isPending: loadingCurrent || loadingPrev,
  };
};
