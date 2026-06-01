import {
  getICon,
  ICON_NAMES,
  type IconName,
} from "@/presentation/shared/constants/CategoryIcons";
import style from "../index.module.css";
import { useState } from "react";

export const IconPickerField = () => {
  const getIconComponent = (name: string) => {
    const Icon = getICon(name);
    return <Icon fontSize="small" />;
  };

  const [selectedIcon, setSelectedIcon] = useState<IconName | null>(null);

  return (
    <div className="mt-4">
      <h4 className={style.label_name}>ICONO</h4>

      <section className={`${style.icon_picker_section} ${style.no_scrollbar}`}>
        {ICON_NAMES.map((iconName) => {
          const isSelected = iconName == selectedIcon;
          return (
            <button
              type="button"
              key={iconName}
              onClick={() => setSelectedIcon(iconName)}
              className={`${style.icon_button} ${isSelected ? style.icon_button_selected : style.icon_button_unselected}`}
            >
              {getIconComponent(iconName)}
            </button>
          );
        })}
      </section>
    </div>
  );
};
