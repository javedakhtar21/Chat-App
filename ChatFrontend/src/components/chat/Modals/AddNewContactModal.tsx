import React, { useState } from "react";
import { Toastify } from "../../ui/TToast";
import Button from "../../ui/Button/TButton";
import Input from "../../ui/Input/TInput";

interface INewContactModalProps {
  open: boolean;
  onOpenChange: () => void;
}

export const NewContactModal: React.FC<INewContactModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const onSaveContact = () => {
    if (!name || !phone) {
      Toastify.showAlert("danger", "Please fill all fields");
      return;
    }

    console.log("Saving Contact:", { name, phone });

    onOpenChange(); // close modal
    Toastify.showAlert("info", `${name} Saved Successfully!`, 3000);
  };

  return (
    <>
      <div
        className={`modal fade ${open ? "show d-block" : ""}`}
        tabIndex={-1}
        role="dialog"
        style={{ background: "rgba(0,0,0,0.5)" }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <div className="modal-content p-3">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">New Contact</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onOpenChange}
              >x</button>
            </div>

            {/* Body */}
            <div className="modal-body d-flex flex-column gap-3">
              <Input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={setName}
                variant="default"
              />

              <Input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={setPhone}
                variant="default"

              />
            </div>

            {/* Footer */}
            <div className="modal-footer d-flex justify-content-end">
              <Button variant="danger" size="md" onClick={onOpenChange}>
                Cancel
              </Button>

              <Button variant="success" size="md" onClick={onSaveContact}>
                Save contact
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
