import { Controller } from "react-hook-form";

import {
  DatePickerInput,
  Input,
  SelectInput,
  FormButton,
  Text,
} from "../common";
import { useBudgetForm } from "../../hooks";
import { MdAttachMoney, MdOutlineCategory } from "../../assets/icons/icons";

const BudgetForm = () => {
  const { form, isAdding, isEditing, isEdit, onCancel, onSubmit } =
    useBudgetForm();
  const {
    control,
    register,
    formState: { errors, isDirty },
  } = form;

  return (
    <div className="flex-center text-primary bg-primary border-default m-0 h-full w-full rounded-2xl p-5 shadow-2xl">
      <div className="flex-1">
        <Text
          tagElement="h5"
          i18nKey="budget.addBudget"
          className="text-accent text-2xl font-semibold"
        />
        <form onSubmit={onSubmit}>
          <div className="flex-between flex-col items-stretch sm:flex-row sm:gap-4">
            <Input
              id="category_name"
              disabled={isEdit}
              register={register}
              i18nKey="budget.categoryName"
              placeholderKey="categories.categoryPlaceholder"
              error={errors?.category_name}
            >
              <MdOutlineCategory />
            </Input>
            <Input
              id="limit_amount"
              register={register}
              i18nKey="budget.limitAmount"
              placeholderKey="goals.targetAmountPlaceholder"
              error={errors?.limit_amount}
              rules={{
                required: "auth.requiredField",
                min: { value: 1, message: "expenses.amountMin" },
              }}
            >
              <MdAttachMoney />
            </Input>
          </div>
          <div className="flex-between flex-col items-stretch sm:flex-row sm:gap-4">
            <Controller
              control={control}
              name="start_date"
              rules={{ required: "dates.selectDate" }}
              render={({ field }) => (
                <DatePickerInput
                  i18nKey="dates.startDate"
                  placeholderKey="startDatePlaceholder"
                  disabled={isEdit}
                  value={field.value}
                  onChange={field.onChange}
                  disableNavigation={false}
                  error={errors?.start_date}
                />
              )}
            />

            <Controller
              control={control}
              name="end_date"
              rules={{ required: "dates.selectDate" }}
              render={({ field }) => (
                <DatePickerInput
                  i18nKey="dates.endDate"
                  placeholderKey="endDatePlaceholder"
                  value={field.value}
                  onChange={field.onChange}
                  disableNavigation={false}
                  error={errors?.end_date}
                />
              )}
            />
          </div>

          <div className="flex-between m-auto mt-6 max-w-2xl">
            {(isDirty || isEdit) && (
              <FormButton
                type="button"
                i18nKey="common.cancel"
                className="bg-transparent text-(--accent) hover:font-semibold"
                onClick={onCancel}
              />
            )}

            <FormButton
              type="submit"
              i18nKey={isEdit ? "common.edit" : "common.addBudget"}
              isPending={isAdding || isEditing}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetForm;
