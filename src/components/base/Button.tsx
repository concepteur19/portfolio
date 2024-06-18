import React, { CSSProperties, MouseEventHandler, ReactNode } from 'react';

type ButtonProps = {
  btnText: string;
  className?: string;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  btnText,
  className = '',
  onMouseEnter,
  onMouseLeave,
  style,
  type = 'button',
  onClick,
  icon,
}) => {
  return (
    <button
      className={`button-component ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      type={type}
      onClick={onClick}
    >
      {btnText}
      {icon}
    </button>
  );
};

export default Button;
