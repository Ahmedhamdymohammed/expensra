import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  useAddTransaction,
  useEditTransaction,
  useGetTransaction,
  useGetBudgets,
} from "../index";
import {
  checkBudgetWarning,
  formatDate,
  showToast,
  TRANSACTION_FORM_DEFAULTS,
} from "../../utils";

export const useTransactionForm = (variant = "expense", handleOpenDialog) => {
  const { data: budgets } = useGetBudgets();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const transactionId = searchParams.get("transactionId");
  const isEdit = !!transactionId;

  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate: addTransaction, isPending: isAdding } = useAddTransaction();
  const { mutate: editTransaction, isPending: isEditing } =
    useEditTransaction();
  const { data: getTransaction } = useGetTransaction(transactionId, {
    enabled: isEdit,
  });

  const form = useForm({
    defaultValues: {
      ...TRANSACTION_FORM_DEFAULTS,
      transaction_type: variant,
    },
  });

  const { reset } = form;

  const onCancel = () => {
    if (type) {
      setSearchParams({ type });
    } else {
      setSearchParams({});
    }
    handleOpenDialog(false);
    queryClient.removeQueries({
      queryKey: ["transaction", transactionId],
    });
    reset({
      ...TRANSACTION_FORM_DEFAULTS,
      transaction_type: variant,
    });
  };

  const onSubmit = (transaction) => {
    const formattedDate = formatDate(transaction.transaction_date);
    const newData = {
      ...transaction,
      force_save: true,
      transaction_date: formattedDate,
    };

    if (isEdit) {
      editTransaction(
        { id: transactionId, data: newData },
        {
          onSuccess: () => {
            variant === "expense"
              ? showToast("expenses.updateExpenseSuccess", "success", t)
              : showToast("income.updateIncomeSuccess", "success", t);
          },
          onSettled: onCancel,
        },
      );
    } else {
      addTransaction(newData, {
        onSuccess: () => {
          const isWarning = checkBudgetWarning(budgets, newData);
          if (isWarning) {
            showToast("budget.budgetWarning", "warning", t);
          } else {
            variant === "expense"
              ? showToast("expenses.addExpenseSuccess", "success", t)
              : showToast("income.addIncomeSuccess", "success", t);
          }
          reset();
          onCancel();
        },
        onError: () => {
          showToast("transactions.expenseExceedsBalance", "error", t);
        },
      });
    }
  };

  useEffect(() => {
    if (!getTransaction || !isEdit) return;

    reset({
      transaction_type: getTransaction.transaction_type,
      category: getTransaction.category.name,
      amount: getTransaction.amount,
      notes: getTransaction.notes,
      transaction_date: getTransaction.transaction_date,
    });
  }, [getTransaction, isEdit, reset]);

  return {
    ...form,
    onSubmit,
    onCancel,
    isEdit,
    isAdding,
    isEditing,
  };
};
