import React from "react";

export interface ActionButton {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface AccountLayoutFormModalProps {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children?: React.ReactNode;
  primaryAction?: ActionButton | null;
  secondaryAction?: ActionButton | null;
}

export const AccountLayoutFormModal = ({
  open,
  title,
  subtitle,
  onClose,
  children,
  primaryAction = null,
  secondaryAction = null,
}: AccountLayoutFormModalProps) => {
  if (!open) return null;

  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg overflow-hidden">
        <header className="px-6 py-5 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {title || "Formulario"}
          </h2>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </header>

        <section className="p-6">{children}</section>

        <footer className="px-6 py-4 border-t flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Cancelar
          </button>

          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="px-4 py-2 bg-white border text-gray-700 rounded-md hover:bg-gray-50"
            >
              {secondaryAction.label}
            </button>
          )}

          {primaryAction && (
            <button
              type="button"
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700"
            >
              {primaryAction.label}
            </button>
          )}
        </footer>
      </div>
    </main>
  );
};

export default AccountLayoutFormModal;
