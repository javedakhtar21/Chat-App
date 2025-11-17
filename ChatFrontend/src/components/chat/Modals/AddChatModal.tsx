import React, { useState } from "react";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
import { NewContactModal } from "./AddNewContactModal";

interface INewChatModalProps {
  open: boolean;
  onOpenChange: () => void;
}

export const NewChatModal: React.FC<INewChatModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [openNewContact, setOpenNewContact] = useState(false);

  return (
    <>
      <style>{`
        .newchat-option {
          cursor: pointer;
          border-radius: 6px;
          padding: 8px 10px;
          font-size: 14px;
        }

        .newchat-option:hover {
          background-color: #5E40F2 !important;
          color: white !important;
        }

        .newchat-option:hover svg {
          color: white !important;
        }

        /* Stable Shake */
        .newchat-option {
          position: relative;
        }
        .newchat-option:hover {
          animation: shakeEffect 0.25s ease-in-out;
        }
      `}</style>

      {
        <NewContactModal
          open={openNewContact}
          onOpenChange={() => setOpenNewContact(false)}
        />
      }
      {/* SAME container as FilterChatModal */}
      <div
        className={`modal fade ${open ? "show d-block" : ""}`}
        tabIndex={-1}
        role="dialog"
      >
        <div
          className="modal-dialog position-absolute"
          role="document"
          style={{
            top: "90px",
            left: "410px",
            width: "300px", // Wider like WhatsApp New Chat panel
            maxWidth: "350px",
          }}
        >
          <div
            className="modal-content"
            style={{
              height: "420px",
              fontSize: "12px",
              overflowY: "auto",
            }}
          >
            {/* HEADER */}
            <div className="modal-header py-2">
              <h6 className="modal-title">New Chat</h6>
              <button
                type="button"
                className="btn-close closeBtn"
                onClick={onOpenChange}
              >x</button>
            </div>

            {/* SEARCH BAR */}
            <div className="p-2">
              <input
                type="text"
                placeholder="Search name or number"
                className="form-control"
              />
            </div>

            {/* OPTIONS */}
            <div className="modal-body d-flex flex-column gap-2">
              <span className="newchat-option d-flex align-items-center gap-2">
                <FaUserFriends size={16} /> New group
              </span>

              <span
                className="newchat-option d-flex align-items-center gap-2"
                onClick={() => {
                    setOpenNewContact(true);
                    onOpenChange()
                }}
              >
                <FaUserPlus size={16} /> New contact
              </span>

              <hr />

              <small className="text-muted">Frequently contacted</small>

              {/* Dummy items (You will replace later with real data) */}
              <div className="newchat-option d-flex align-items-center gap-2">
                <img
                  src="https://i.pravatar.cc/35"
                  width={30}
                  height={30}
                  style={{ borderRadius: "50%" }}
                />
                Javed
              </div>

              <div className="newchat-option d-flex align-items-center gap-2">
                <img
                  src="https://i.pravatar.cc/36"
                  width={30}
                  height={30}
                  style={{ borderRadius: "50%" }}
                />
                Mahtab Aalam
              </div>

              <div className="newchat-option d-flex align-items-center gap-2">
                <img
                  src="https://i.pravatar.cc/38"
                  width={30}
                  height={30}
                  style={{ borderRadius: "50%" }}
                />
                Muskan
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
