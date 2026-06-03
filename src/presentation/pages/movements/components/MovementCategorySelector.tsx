import { FormHelperText } from "@mui/material";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { getICon } from "@/presentation/shared/constants/CategoryIcons";
import { useGetCategories } from "../../categories/hooks/useCategory";
import { CreateCategoryModal } from "../../categories/components/CreateCategoryModal";

interface CategoryFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

export const MovementCategorySelector = <T extends FieldValues>({
  name,
  control,
}: CategoryFieldProps<T>) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { data: categories } = useGetCategories();

  const getIconComponent = (name: string) => {
    const Icon = getICon(name);
    return <Icon fontSize="small" />;
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div className="space-y-1 pt-5">
            <p className="text-[12px] leading-6 tracking-wide font-medium text-text-on-surface-variant">
              CATEGORÍA
            </p>

            <section
              className={`flex flex-wrap gap-x-4 gap-y-3 overflow-x-auto overflow-y-hidden py-2`}
            >
              {categories?.map((category) => {
                const isSelected = category.id === field.value;
                return (
                  <button
                    key={category.id}
                    type="button"
                    className="flex flex-col items-center gap-2 min-w-16 sm:min-w-16 group w-18 shrink-0 "
                    onClick={() => field.onChange(category.id)}
                  >
                    <section className="relative">
                      <div
                        className={` w-14 h-14 rounded-full flex items-center justify-center text-[14px] font-bold p-0.5 ${isSelected ? "bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "bg-white/5"}`}
                      >
                        <span
                          style={
                            isSelected
                              ? { color: "#000000" }
                              : { color: category.bg_color }
                          }
                        >
                          {getIconComponent(category.icon)}
                        </span>
                      </div>
                    </section>
                    <section>
                      <p
                        className={`text-[11px] text-center leading-tights ${isSelected ? "text-white font-semibold " : "text-text-on-surface-variant"}`}
                      >
                        {category.name}
                      </p>
                    </section>
                  </button>
                );
              })}
              {/*crear categoria*/}
              <section>
                <button
                  className="flex flex-col items-center gap-2 min-w-16 sm:min-w-16  w-18 shrink-0 "
                  onClick={() => setIsCreateOpen(true)}
                  type="button"
                >
                  <div className=" flex items-center justify-center w-13 h-13 rounded-full border border-dashed  border-white/20 bg-white/5 ">
                    <AddIcon
                      fontSize="small"
                      className="text-text-on-surface-variant"
                    />
                  </div>
                  <p className="text-[12px] font-medium text-text-on-surface-variant">
                    Nueva categoria
                  </p>
                </button>
              </section>
            </section>
            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
          </div>
        )}
      />
      <CreateCategoryModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </>
  );
};
