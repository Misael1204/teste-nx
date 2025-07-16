import React, { useState } from "react";
import { InputHTMLAttributes } from "react";
import { formatReal } from "app/utils/money";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: (value: any) => void;
  label: string;
  columnClasses?: string;
  currency?: boolean;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  onChange,
  label,
  columnClasses = "",
  id,
  currency,
  error,
  ...inputProps
}: InputProps) => {
  const [internalValue, setInternalValue] = useState<string>("");

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (currency) {
      value = formatReal(value);
      setInternalValue(value);
      if (onChange) onChange(value); 
    } else {
      setInternalValue(value);
      if (onChange) onChange(value); 
    }
  };

  return (
    <div className={`${columnClasses} mb-3`}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        className="form-control"
        id={id}
        {...inputProps}
        value={internalValue}
        onChange={onInputChange}
      />
    </div>
  );
};