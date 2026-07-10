import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useRemainingBalance } from "./useRemainingBalance.hooks";
import { showToast } from "../../utils";
import { useTranslation } from "react-i18next";

export const useTransferToGoal = (handleOpenDialog) => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams();
  const goalId = searchParams.get("goalId");

  const { mutate } = useRemainingBalance();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const close = () => {
    setSearchParams({});
    handleOpenDialog(false);
  };
  const onSubmit = (data) => {
    const formattedData = {
      amount: data.amount,
      action: "to_goal",
      goal_id: Number(goalId),
    };
    mutate(formattedData, {
      onSuccess: () => {
        showToast("goals.carryOverSuccess", "success", t);
      },
      onError: () => {
        showToast("goals.goalCarryOverFailed", "error", t);
      },
    });
    close();
  };

  return {
    goalId,
    register,
    handleSubmit,
    control,
    errors,
    onSubmit,
    close,
  };
};
