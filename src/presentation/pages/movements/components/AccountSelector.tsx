import AddIcon from "@mui/icons-material/Add";
import { FormHelperText } from "@mui/material";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface AccountFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

const mockAccounts = [
  {
    id: "1",
    uuid: "ff1ca7d8-88f4-45e9-a3b7-d34829655bd3",
    name: "BBVA",
    balance: 5000,
  },
  {
    id: "2",
    uuid: "ff1ca7d8-88f4-45e9-a3b7-d34829655bd1",
    name: "Revolut",
    balance: 10000,
  },
  {
    id: "3",
    uuid: "ff1ca7d8-88f4-45e9-a3b7-d34829655bd2",
    name: "CASH",
    balance: 2000,
  },
  {
    id: "4",
    uuid: "ff1ca7d8-88f4-45e9-a3b7-d34829655bd4",
    name: "Santander",
    balance: 3000,
  },
  {
    id: "5",
    uuid: "ff1ca7d8-88f4-45e9-a3b7-d34829655bd5",
    name: "Banorte",
    balance: 4000,
  },
];

export const AccountSelector = <T extends FieldValues>({
  name,
  control,
}: AccountFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-1 pt-5">
          <p className="text-[12px] leading-6 tracking-wide font-medium text-text-on-surface-variant">
            CUENTA DE ORIGEN
          </p>

          <div className="flex">
            <section
              className="flex gap-4 w-max overflow-x-auto  py-2 -mx-2  mask-r-from-75% flex-1"
              style={{ scrollbarWidth: "none" }}
            >
              {mockAccounts.map((account) => {
                const isSelected = account.uuid === field.value;

                return (
                  <button
                    key={account.id}
                    type="button"
                    className={`flex flex-col items-center gap-3 min-w-16 sm:min-w-16 group`}
                    onClick={() => field.onChange(account.uuid)}
                  >
                    <section className="relative">
                      <div
                        className={`border-2  w-13 h-13 rounded-full flex items-center justify-center text-[14px] font-bold  p-0.5 ${isSelected ? "shadow-[0_0_15px_rgba(255,255,255,0.3)] border-white bg-[#004481]" : "bg-black"}`}
                      >
                        <span className="text-white">
                          {account.name.charAt(0)}
                        </span>
                      </div>
                    </section>

                    <section className="text-center">
                      <p className="text-[11px] font-semibold truncate leading-tight text-white uppercase">
                        {account.name}
                      </p>
                      <p className="text-[12px] font-medium text-gray-500 uppercase">
                        ${account.balance.toLocaleString("es-MX")}
                      </p>
                    </section>
                  </button>
                );
              })}
            </section>

            <section className="flex justify-center gap-3 min-w-22.5 pl-2 py-2 ">
              <button className="flex flex-col gap-2 items-center ">
                <div className=" flex items-center justify-center w-13 h-13 rounded-full border border-dashed  border-white/20 bg-white/5 ">
                  <AddIcon
                    fontSize="small"
                    className="text-text-on-surface-variant"
                  />
                </div>
                <p className="text-[12px] font-medium text-text-on-surface-variant uppercase">
                  Nueva
                </p>
              </button>
            </section>
          </div>
          <FormHelperText error>{fieldState.error?.message}</FormHelperText>
          <div className="h-px mt-3 bg-white/10 w-full" />
        </div>
      )}
    />
  );
};
