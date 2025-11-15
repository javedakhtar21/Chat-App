import React, { useState } from "react";
import { Toastify } from "../../ui/Toast";

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
      Toastify.showAlert("danger","Please fill all fields");
      return;
    }

    console.log("Saving Contact:", { name, phone });

    onOpenChange(); // close modal
    Toastify.showAlert("info", `${name} Saved Successfully!`, 3000);
  };

  return (
    <>
      <style>{`
        .center-modal {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .new-contact-option:hover {
          background-color: #5E40F2 !important;
          color: white !important;
        }

        .closeBtn:hover {
          color: red !important;
        }
      `}</style>

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
                className="btn-close closeBtn"
                onClick={onOpenChange}
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body d-flex flex-column gap-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="tel"
                className="form-control"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Footer */}
            <div className="modal-footer d-flex justify-content-end">
              <button className="btn btn-secondary" onClick={onOpenChange}>
                Cancel
              </button>

              <button className="btn btn-success" onClick={onSaveContact}>
                Save Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
