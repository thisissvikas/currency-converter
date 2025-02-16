import React from "react";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currencies: string[];
}

const CurrencyDropdown: React.FC<Props> = ({ label, value, onChange, currencies }) => {
  return (
    <div className="mt-4">
      <label className="text-gray-600 text-sm">{label}</label>
      <select
        className="w-full border p-2 rounded mt-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyDropdown;
