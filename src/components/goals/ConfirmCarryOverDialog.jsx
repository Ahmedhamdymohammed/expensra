import { useTranslation } from "react-i18next";
import { FaMoneyBillTransfer, FaXmark } from "../../assets/icons/icons";
import { useRemainingBalance } from "../../hooks";
import { showToast } from "../../utils";
import { FormButton, Overlay, Text } from "../common";

const ConfirmCarryOverDialog = ({ handleOpenDialog }) => {
  const { t } = useTranslation();
  const { mutate, isPending } = useRemainingBalance();
  const onCarryOver = () => {
    const data = {
      action: "to_income",
    };
    mutate(data, {
      onSuccess: (response) => {
        response.message.error
          ? showToast("goals.balanceCarryOverFailed", "error", t)
          : showToast("goals.carryOverSuccess", "success", t);
      },
      onSettled: () => handleOpenDialog(false),
    });
  };
  return (
    <Overlay
      onClick={() => {
        handleOpenDialog(false);
      }}
    >
      <div className="flex-center h-full w-full px-2">
        <div
          onClick={(e) => e.stopPropagation()}
          className="text-primary bg-primary border-default relative z-50 m-auto max-w-lg flex-1 rounded-2xl p-5 shadow-2xl"
        >
          <button
            type="button"
            className="icons-scale z-20 absolute top-5 text-2xl ltr:right-5 rtl:left-5"
            onClick={() => handleOpenDialog(false)}
          >
            <FaXmark />
          </button>
          <span className="flex-center text-accent m-auto w-full pt-4 text-5xl opacity-90 md:text-7xl">
            <FaMoneyBillTransfer />
          </span>
          <div className="space-y-6 py-3 text-center">
            <Text
              tagElement="h2"
              i18nKey="goals.carryOver"
              className="text-3xl font-semibold md:text-5xl"
            />
            <Text
              tagElement="h5"
              i18nKey="goals.carryOverConfirmation"
              className="text-secondary"
            />
          </div>
          <div className="flex-between border-top">
            <FormButton
              type="button"
              i18nKey="common.cancel"
              className="mt-5 bg-transparent text-(--accent) hover:font-semibold"
              onClick={() => handleOpenDialog(false)}
            />

            <FormButton
              onClick={() => onCarryOver()}
              type="submit"
              i18nKey="common.add"
              isPending={isPending}
              className="mt-5"
            />
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default ConfirmCarryOverDialog;
