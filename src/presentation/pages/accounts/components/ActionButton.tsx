import type { ReactNode } from "react";
import styles from "../index.module.css";

type ActionButtonProps = {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
};

export const ActionButton = ({
  label,
  icon,
  onClick,
  disabled = false,
  className = "",
  iconClassName = "",
  labelClassName = "",
}: ActionButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${styles.action_button_container} ${className}`.trim()}
    >
      <span className={`${styles.action_button_icon} ${iconClassName}`.trim()}>
        {icon}
      </span>
      <span
        className={`${styles.action_button_label} ${labelClassName}`.trim()}
      >
        {label}
      </span>
    </button>
  );
};
