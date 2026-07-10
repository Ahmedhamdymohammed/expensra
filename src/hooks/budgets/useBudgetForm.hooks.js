import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import { DEFAULT_BUDGET_VALUES, formatDate, showToast } from "../../utils";

import { useAddBudget, useEditBudget, useGetBudget } from "./budgets.hooks";
import { useTranslation } from "react-i18next";

export const useBudgetForm = () => {
  const { t } = useTranslation();
  const form = useForm({ defaultValues: DEFAULT_BUDGET_VALUES });
  const { reset, handleSubmit } = form;

  const [searchParams, setSearchParams] = useSearchParams();
  const budgetId = searchParams.get("budgetId");
  const isEdit = !!budgetId;

  const { data } = useGetBudget(Number(budgetId));
  const { mutate: addBudget, isPending: isAdding } = useAddBudget();
  const { mutate: editBudget, isPending: isEditing } = useEditBudget();
  useEffect(() => {
    if (!data || !isEdit) return;

    reset({
      category_name: data.category.name || "",
      limit_amount: data.limit_amount || "",
      start_date: data.start_date || "",
      end_date: data.end_date || "",
    });
  }, [data, isEdit, reset]);

  const onCancel = () => {
    reset(DEFAULT_BUDGET_VALUES);
    setSearchParams({});
  };

  const onSubmit = (formData) => {
    const formattedData = {
      ...formData,
      start_date: formatDate(formData.start_date),
      end_date: formatDate(formData.end_date),
    };
    const editData = {
      category_name: formData.category_name,
      limit_amount: formData.limit_amount,
      end_date: formatDate(formData.end_date),
    };

    if (!isEdit) {
      addBudget(formattedData, {
        onSuccess: () => {
          showToast("budget.createSuccess", "success", t);
        },
        onError: () => {
          showToast("budget.createError", "error", t);
        },
      });
    } else {
      editBudget(
        { id: Number(budgetId), data: editData },
        {
          onSuccess: () => {
            showToast("budget.updateSuccess", "success", t);
          },
          onError: (err) => {
            showToast("budget.updateError", "error", t);
            console.log(editData);
            console.log(err);
          },
        },
      );
    }
    setSearchParams({});
    reset(DEFAULT_BUDGET_VALUES);
  };

  return {
    form,
    isAdding,
    isEditing,
    isEdit,
    onCancel,
    onSubmit: handleSubmit(onSubmit),
  };
};
