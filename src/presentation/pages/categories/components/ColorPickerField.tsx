import { CATEGORY_COLORS } from "@/presentation/shared/constants/CategoryColors";
import style from "../index.module.css";
import { useState } from "react";

export const ColorPickerField = () => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  return (
    <div className="mt-5">
      <p className={style.label_name}>COLOR</p>

      <section className={`${style.picker_section} ${style.no_scrollbar}`}>
        {CATEGORY_COLORS.map((color) => {
          const isSelected = selectedIcon == color.name;
          return (
            <button
              type="button"
              key={color.name}
              title={color.name}
              style={{ backgroundColor: color.hex }}
              onClick={() => setSelectedIcon(color.name)}
              className={`${style.color_button} ${isSelected ? style.color_button_selected : ""}`}
            />
          );
        })}
      </section>
    </div>
  );
};
