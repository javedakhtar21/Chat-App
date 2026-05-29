import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FaSignOutAlt } from "react-icons/fa";

interface ILogoutConfirmModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
}

/**
 * Reusable logout confirmation modal.
 * - Closes on Cancel, backdrop click, or Escape (react-bootstrap handles focus
 *   trapping, keyboard nav, and ARIA: role=dialog / aria-modal).
 * - `onConfirm` should invoke the caller's existing logout logic (unchanged).
 */
const LogoutConfirmModal: React.FC<ILogoutConfirmModalProps> = ({
  show,
  onHide,
  onConfirm,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={true}
      aria-labelledby="logout-confirm-title"
      contentClassName="border-0 shadow rounded-4"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title id="logout-confirm-title" className="fw-bold h5">
          Confirm Logout
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-muted">
        Are you sure you want to log out?
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          variant="outline-secondary"
          className="rounded-3"
          onClick={onHide}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          className="rounded-3 shadow-sm d-inline-flex align-items-center gap-2"
          onClick={onConfirm}
        >
          <FaSignOutAlt />
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutConfirmModal;
