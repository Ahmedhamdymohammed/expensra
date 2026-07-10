import { BudgetForm } from "../../components/budget";
import { ConfirmDialog, TransactionsForm } from "../../components/common";
import {
  DepositForm,
  ConfirmCarryOverDialog,
  TransferToGoalDialog,
  GoalsForm,
  DepositDialog,
} from "../../components/goals";
import { useModal } from "./modalContext";

const ModalRenderer = () => {
  const { modal, closeModal } = useModal();

  if (!modal) return null;

  switch (modal.name) {
    case "addTransaction":
      return (
        <TransactionsForm
          openDialog={true}
          handleOpenDialog={closeModal}
          {...modal.props}
        />
      );
    case "logoutConfirm":
      return (
        <ConfirmDialog
          openDialog={true}
          handleOpenDialog={closeModal}
          {...modal.props}
        />
      );

    case "deleteItem":
      return (
        <ConfirmDialog
          openDialog={true}
          handleOpenDialog={closeModal}
          {...modal.props}
        />
      );

    case "addBudget":
      return (
        <BudgetForm
          openDialog={true}
          handleOpenDialog={closeModal}
          {...modal.props}
        />
      );
    case "addGoals":
      return (
        <GoalsForm
          openDialog={true}
          handleOpenDialog={closeModal}
          {...modal.props}
        />
      );
    case "leftoverSaving":
      return (
        <TransferToGoalDialog
          openDialog={true}
          handleOpenDialog={closeModal}
          {...modal.props}
        />
      );
    case "deposit":
      return (
        <DepositDialog
          openDialog={true}
          handleOpenDialog={closeModal}
          {...modal.props}
        />
      );
    case "carryOver":
      return (
        <ConfirmCarryOverDialog
          openDialog={true}
          handleOpenDialog={closeModal}
          {...modal.props}
        />
      );

    default:
      return null;
  }
};

export default ModalRenderer;
