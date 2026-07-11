import { useState } from "react";
import { FormButton, SelectInput, Text } from "../common";

const PreferredCurrency = () => {
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "EGP",
  );

  return (
    <div className="bg-primary mt-4 rounded-md p-5">
      <Text
        tagElement="h3"
        i18nKey="profile.preferences"
        className="text-accent mb-3 text-2xl font-semibold"
      />

        <SelectInput
          variant="currency"
          value={currency}
          onSelect={setCurrency}
        />
    </div>
  );
};

export default PreferredCurrency;
