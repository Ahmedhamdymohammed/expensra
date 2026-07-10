import { useNavigate } from "react-router-dom";
import { BudgetForm } from "../components/budget";
import {
  Loading,
  PageHeader,
  Pricing,
  Section,
  TransactionsTable,
} from "../components/common";
import { useGetBudgets, useGetCurrentUser } from "../hooks";
import { normalizeData } from "../utils";

const Budget = () => {
  const { data, isPending } = useGetCurrentUser();
  const { data: budget, isPending: isData } = useGetBudgets();
  const budgetData = normalizeData(budget?.Budgets);

  const navigate = useNavigate();
  if (isPending || isData) return <Loading />;
  return (
    <Section>
      {data?.system_role === "normal_user" && (
        <Pricing onClick={() => navigate(-1)} />
      )}
      <PageHeader variant="budget" />
      <BudgetForm />
      <TransactionsTable data={budgetData} variant="budget" />
    </Section>
  );
};

export default Budget;
