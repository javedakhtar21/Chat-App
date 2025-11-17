import React from "react";
import {
  FaEnvelopeOpenText,
  FaHeart,
  FaAddressBook,
  FaUserAltSlash,
  FaUsers,
  FaRegStickyNote,
} from "react-icons/fa";

interface IFilterChatModalProps {
  open: boolean;
  onOpenChange: () => void;
}

export const FilterChatModal: React.FC<IFilterChatModalProps> = ({
  open,
  onOpenChange,
}) => {
  const cssOfOptions = `
  filter-option 
  btn 
  text-start 
  d-flex 
  justify-content-start
  align-items-center 
  gap-2 
  py-1 
  w-100
`;

  // ✅ Each filter has its OWN function (Future safe)
  const handleUnread = () => {
    console.log("Apply Unread Filter");
    // alert("Unread filter applied");
    onOpenChange();
  };

  const handleFavorites = () => {
    console.log("Apply Favorites Filter");
    // alert("Favorites filter applied");
    onOpenChange();
  };

  const handleContacts = () => {
    console.log("Apply Contacts Filter");
    // alert("Contacts filter applied");
    onOpenChange();
  };

  const handleNonContacts = () => {
    console.log("Apply Non-Contacts Filter");
    // alert("Non-contacts filter applied");
    onOpenChange();
  };

  const handleGroups = () => {
    console.log("Apply Groups Filter");
    // alert("Groups filter applied")/;
    onOpenChange();
  };

  const handleDrafts = () => {
    console.log("Apply Drafts Filter");
    // alert("Drafts filter applied");
    onOpenChange();
  };

  // ✅ Config array storing label + icon + handler
  const filterOptions = [
    {
      label: "Unread",
      icon: <FaEnvelopeOpenText size={14} />,
      onClick: handleUnread,
    },
    {
      label: "Favorites",
      icon: <FaHeart size={14} />,
      onClick: handleFavorites,
    },
    {
      label: "Contacts",
      icon: <FaAddressBook size={14} />,
      onClick: handleContacts,
    },
    {
      label: "Non-contacts",
      icon: <FaUserAltSlash size={14} />,
      onClick: handleNonContacts,
    },
    { label: "Groups", icon: <FaUsers size={14} />, onClick: handleGroups },
    {
      label: "Drafts",
      icon: <FaRegStickyNote size={14} />,
      onClick: handleDrafts,
    },
  ];

  return (
    <>
      <style>{`
        .filter-option {
          cursor: pointer;
          border-radius: 6px;
          padding: 6px 10px;
          font-size: 14px;
        }

        .filter-option:hover {
          background-color: #5E40F2 !important;
          color: white !important;
        }

        .filter-option:hover svg {
          color: white !important;
        }

        /* Stable Shake */
        .filter-option {
          position: relative;
        }
        .filter-option:hover {
          animation: shakeEffect 0.25s ease-in-out;
        }

        @keyframes shakeEffect {
          0% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          50% { transform: translateX(2px); }
          75% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div
        className={`modal fade ${open ? "show d-block" : ""}`}
        tabIndex={-1}
        role="dialog"
      >
        <div
          className="modal-dialog position-absolute"
          role="document"
          style={{
            top: "100px",
            left: "535px",
            width: "180px",
            maxWidth: "260px",
          }}
        >
          <div
            className="modal-content"
            style={{ height: "280px", fontSize: "8px" }}
          >
            <div className="modal-header py-2">
              <h6 className="modal-title">Filter chats by</h6>
              <button
                type="button"
                className="btn-close closeBtn"
                onClick={onOpenChange}
              >
                x
              </button>
            </div>

            {/* BODY */}
            <div className="modal-body d-flex flex-column gap-1 w-100">
              {filterOptions.map((opt, index) => (
                <span
                  key={index}
                  className={cssOfOptions}
                  onClick={opt.onClick}
                >
                  {opt.icon} {opt.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
