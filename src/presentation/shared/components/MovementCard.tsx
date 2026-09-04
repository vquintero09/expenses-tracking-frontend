import type { IMovementItem } from "@domain/accounts/account.interface";
import { CATEGORY_COLORS } from "../constants/CategoryColors";
import { getICon } from "../constants/CategoryIcons";
import dayjs from "dayjs";

interface IMovementProp {
  movement: IMovementItem;
}

const getColorHex = (colorName: string): string => {
  return CATEGORY_COLORS.find((c) => c.name === colorName)?.hex ?? "#64748B";
};

const getIconComponent = (iconName: string) => {
  const Icon = getICon(iconName);
  return <Icon fontSize="small" />;
};

export const MovementCard = ({ movement }: IMovementProp) => {
  const color = getColorHex(movement.category.bg_color);
  const icon = getIconComponent(movement.category.icon);
  const isIncome = movement.movement_type === "income";

  return (
    <div className="flex items-center gap-3 p-3 bg-card border border-outline-variant rounded-2xl">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}20`, color: color }}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-white truncate">
          {movement.description}
        </p>
        <p className="text-[12px] text-text-on-surface-variant truncate">
          {movement.category.name}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p
          className={
            isIncome
              ? "text-[14px] font-bold text-emerald-400"
              : "text-[14px] font-bold text-white"
          }
        >
          {isIncome ? "+" : ""}${movement.amount.toLocaleString("es-MX")}
        </p>
        <p className="text-[12px] text-text-on-surface-variant mt-0.5">
          {dayjs(movement.date).format("DD/MM/YYYY")}
        </p>
      </div>
    </div>
  );
};
