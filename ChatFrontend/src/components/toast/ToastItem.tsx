import Toast from "react-bootstrap/Toast";
import type { ToastMessage, ToastVariant } from "./ToastContext";

const darkTextVariants = new Set<ToastVariant>(["warning", "info"]);

type ToastItemProps = {
  toast: ToastMessage;
  onClose: (id: string) => void;
};

export const ToastItem = ({ toast, onClose }: ToastItemProps) => {
  const useDarkText = darkTextVariants.has(toast.type);
  const textClassName = useDarkText ? "text-dark" : "text-white";
  const closeButtonClassName = useDarkText ? "btn-close" : "btn-close btn-close-white";

  return (
    <Toast
      show
      autohide={toast.autoDismiss}
      delay={toast.delay}
      onClose={() => onClose(toast.id)}
      bg={toast.type}
      className={`border-0 shadow ${textClassName}`}
      role="alert"
    >
      <Toast.Body className="d-flex align-items-start justify-content-between gap-3">
        <span>{toast.message}</span>
        <button
          type="button"
          className={closeButtonClassName}
          aria-label="Close"
          onClick={() => onClose(toast.id)}
        />
      </Toast.Body>
    </Toast>
  );
};
