import { useTranslation } from "react-i18next";
import {
  FaPlus,
  MdDelete,
  MdEdit,
  MdSavings,
} from "../../../assets/icons/icons";
import { useModal } from "../../../context";
import { useSearchParams } from "react-router-dom";

const TransactionActions = ({ variant, id, onDelete }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const { openModal } = useModal();

  const onEdit = () => {
    if (variant === "goals") {
      setSearchParams({ goalId: id });
      openModal("addGoals");
    } else if (variant === "budget") {
      setSearchParams({ budgetId: id });
      const el = document.querySelector(".main");
      el?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      const params = new URLSearchParams(searchParams);
      params.set("transactionId", id);
      setSearchParams(params);
      openModal("addTransaction");
    }
  };

  return (
    <div className="text-primary flex-1 space-x-4 text-end whitespace-nowrap">
      {variant === "goals" && (
        <button
          className="cursor-pointer text-xl"
          type="button"
          title={t("common.add")}
          onClick={() => {
            openModal("deposit");
            setSearchParams({ goalId: id });
          }}
        >
          <FaPlus />
        </button>
      )}
      <button
        className="text-accent cursor-pointer text-2xl"
        type="button"
        title={t("common.edit")}
        onClick={onEdit}
      >
        <MdEdit />
      </button>
      <button
        className="cursor-pointer text-2xl text-red-500 hover:text-red-600"
        type="button"
        title={t("common.delete")}
        onClick={() =>
          openModal("deleteItem", {
            variant: variant,
            onConfirm: () => onDelete(id),
          })
        }
      >
        <MdDelete />
      </button>
    </div>
  );
};

export default TransactionActions;
