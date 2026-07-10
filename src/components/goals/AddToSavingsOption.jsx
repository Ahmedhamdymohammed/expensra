import { OptionCard } from "./index";
import { MdOutlineSavings } from "../../assets/icons/icons";
import { useModal } from "../../context";

const AddToSavingsOption = () => {
  const { openModal } = useModal();

  return (
    <OptionCard
      icon={<MdOutlineSavings />}
      title="goals.savingsText"
      buttonText="goals.savingsButton"
      color="pink"
      onClick={() => openModal("leftoverSaving")}
    />
  );
};

export default AddToSavingsOption;
