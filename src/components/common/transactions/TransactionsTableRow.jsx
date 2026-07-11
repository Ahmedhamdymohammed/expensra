import { useTranslation } from "react-i18next";
import {
  useDeleteBudget,
  useDeleteGoal,
  useDeleteTransaction,
} from "../../../hooks";
import { transformTableRowData } from "../../../utils";
import { BudgetRow } from "../../budget";
import { GoalsRow } from "../../goals";
import { TransactionRow } from "../../transactions";
import { TransactionActions } from "./index";

const TransactionsTableRow = ({ data, variant }) => {
  const { i18n} = useTranslation()
  const { mutate: deleteTransaction } = useDeleteTransaction();
  const { mutate: deleteBudget } = useDeleteBudget();
  const { mutate: deleteGoal } = useDeleteGoal();

  return (
    <>
      {data?.map((item, index) => {
        const rowData = transformTableRowData(item, variant, i18n.language);

        if (variant === "budget") {
          return (
            <BudgetRow key={index} item={rowData}>
              <TransactionActions
                variant="budget"
                id={item.id}
                onDelete={deleteBudget}
              />
            </BudgetRow>
          );
        }

        if (variant === "goals") {
          return (
            <GoalsRow key={index} item={rowData}>
              <TransactionActions
                variant="goals"
                id={item.id}
                onDelete={deleteGoal}
              />
            </GoalsRow>
          );
        }

        return (
          <TransactionRow key={index} item={rowData}>
            <TransactionActions id={item.id} onDelete={deleteTransaction} />
          </TransactionRow>
        );
      })}
    </>
  );
};

export default TransactionsTableRow;
