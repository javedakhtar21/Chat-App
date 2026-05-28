import type { ToastMessage } from "./ToastContext";
import { ToastItem } from "./ToastItem";

type ToastContainerProps = {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
};

export const ToastContainer = ({ toasts, onClose }: ToastContainerProps) => {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1080 }}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
};
