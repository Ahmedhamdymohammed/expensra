import { useState, memo } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { arSA } from "react-day-picker/locale";
import { useTranslation } from "react-i18next";
import { Input } from "./index";
import { useOutsideClick } from "../../hooks";
import { MdOutlineCalendarMonth } from "../../assets/icons/icons";

const DatePickerInput = ({
  i18nKey = "dates.date",
  placeholderKey = "selectDate",
  disableNavigation = true,
  value,
  onChange,
  error,
  ...props
}) => {
  const { i18n } = useTranslation();
  const locale = i18n.language === "ar" ? arSA : undefined;

  const [open, setOpen] = useState(false);
  const ref = useOutsideClick(() => setOpen(false));

  const formattedValue = value ? format(value, "dd/MM/yyyy") : "";
  return (
    <div className="relative flex-1" ref={ref}>
      <Input
        id="transaction_date"
        readOnly
        i18nKey={i18nKey}
        placeholderKey={`dates.${placeholderKey}`}
        value={formattedValue}
        onClick={() => setOpen((prev) => !prev)}
        error={error}
        {...props}
      >
        <MdOutlineCalendarMonth />
      </Input>

      {/* Calendar */}
      {open && (
        <div className="absolute top-1 right-0 z-50">
          <DayPicker
            mode="single"
            selected={value}
            disableNavigation={disableNavigation}
            onSelect={(selected) => {
              onChange(selected);
              setOpen(false);
            }}
            locale={locale}
            startMonth={new Date()}
            className="bg-muted text-secondary flex-between w-fit flex-col gap-3 rounded-2xl px-5 py-3 text-sm"
            classNames={{
              selected: "bg-accent rounded-full",
              today: `${!value && "text-white bg-accent rounded-full"}`,
              day: "p-2",
              day_button: "text-sm w-5 h-5 font-normal cursor-pointer",
              range_start: "bg-accent text-white rounded-full",
              range_middle: "bg-primary text-accent",
              range_end: "bg-accent text-white rounded-full",
              chevron: `${
                i18n.language === "ar" ? "rotate-180" : ""
              } fill-(--accent)`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default memo(DatePickerInput);
