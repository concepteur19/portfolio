import React, { useState, ChangeEvent, CSSProperties } from "react";

type InputProps = {
  type?: string;
  style?: CSSProperties;
  className?: string;
  name?: string;
  placeholder?: string;
};

const Input: React.FC<InputProps> = ({
  type = "text",
  style,
  className = "",
  name,
  placeholder,
}) => {
  const [inputText, setInputText] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  return (
    <div className="input-contact">
      <input
        type={type}
        style={style}
        className={className}
        name={name}
        value={inputText}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
