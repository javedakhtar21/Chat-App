import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "../../toast";

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
    toast.dismiss();

    if (!name || !phone) {
      toast.warning("Please fill all contact fields");
      return;
    }

    onOpenChange();
    toast.success(`${name} saved successfully`);
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
            <div className="modal-header">
              <h5 className="modal-title">New Contact</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onOpenChange}
              >x</button>
            </div>

            <div className="modal-body d-flex flex-column gap-3">
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              />

              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
              />
            </div>

            <div className="modal-footer d-flex justify-content-end">
              <Button variant="danger" size="sm" onClick={onOpenChange}>
                Cancel
              </Button>

              <Button variant="success" size="sm" onClick={onSaveContact}>
                Save contact
              </Button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
