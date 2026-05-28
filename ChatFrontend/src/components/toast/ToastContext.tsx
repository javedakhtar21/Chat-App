import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ToastContainer } from "./ToastContainer";

export type ToastVariant =
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "primary"
  | "secondary";

export type ToastOptions = {
  autoDismiss?: boolean;
  delay?: number;
};

export type ToastMessage = {
  id: string;
  message: string;
  type: ToastVariant;
  autoDismiss: boolean;
  delay: number;
};

const DEFAULT_DELAY = 5000;

type ToastDispatcher = (
  message: string,
  type?: ToastVariant,
  options?: ToastOptions,
) => void;

type ToastApi = {
  show: ToastDispatcher;
  dismiss: () => void;
  success: (message: string, options?: ToastOptions) => void;
  danger: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  primary: (message: string, options?: ToastOptions) => void;
  secondary: (message: string, options?: ToastOptions) => void;
};

let showToastHandler: ToastDispatcher | undefined;
let dismissToastHandler: (() => void) | undefined;

const dispatchToast: ToastDispatcher = (message, type = "info", options) => {
  showToastHandler?.(message, type, options);
};

export const toast: ToastApi = {
  show: dispatchToast,
  dismiss: () => {
    dismissToastHandler?.();
  },
  success: (message, options) => dispatchToast(message, "success", options),
  danger: (message, options) => dispatchToast(message, "danger", options),
  error: (message, options) => dispatchToast(message, "danger", options),
  warning: (message, options) => dispatchToast(message, "warning", options),
  info: (message, options) => dispatchToast(message, "info", options),
  primary: (message, options) => dispatchToast(message, "primary", options),
  secondary: (message, options) => dispatchToast(message, "secondary", options),
};

type ToastProviderProps = {
  children: ReactNode;
};

const createToastId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  }, []);

  const dismissToast = useCallback(() => {
    setToasts([]);
  }, []);

  const showToast = useCallback(
    (
      message: string,
      type: ToastVariant = "info",
      options: ToastOptions = {},
    ) => {
      const toast: ToastMessage = {
        id: createToastId(),
        message,
        type,
        autoDismiss: options.autoDismiss ?? true,
        delay: options.delay ?? DEFAULT_DELAY,
      };

      setToasts((currentToasts) => [...currentToasts, toast]);
    },
    [],
  );

  useEffect(() => {
    showToastHandler = showToast;
    dismissToastHandler = dismissToast;

    return () => {
      if (showToastHandler === showToast) {
        showToastHandler = undefined;
      }

      if (dismissToastHandler === dismissToast) {
        dismissToastHandler = undefined;
      }
    };
  }, [dismissToast, showToast]);

  return (
    <>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  );
};
