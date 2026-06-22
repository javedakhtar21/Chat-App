const ChatPanel = ({
  selectedUser,
  getInitials,
  handleMsgBox,
  msg,
  handleSendMsg,
}: any) => {
  const chatUser = selectedUser?.user ?? selectedUser;

  return (
    <div className="flex-grow-1 d-flex flex-column">
      {chatUser ? (
        <>
          {/* Chat Header */}
          <div className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center me-2"
                style={{ width: "40px", height: "40px" }}
              >
                {getInitials(chatUser.firstName, chatUser.lastName)}
              </div>
              <div>
                <h6 className="mb-0">
                  {chatUser.firstName} {chatUser.lastName}
                </h6>
                <small className="text-muted">{chatUser.email}</small>
              </div>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-grow-1 p-3 bg-white">
            <div className="d-flex flex-column gap-4 justify-content-between align-items-start">
              {/* <p>Chat with {selectedUser.firstName}</p> */}
              {/* <small>Chat functionality coming soon...</small> */}

              <input
                onChange={handleMsgBox}
                type="text"
                placeholder="type msg to send"
                className="form-control"
                name="msgbox"
                value={msg}
              />
              <button className="btn btn-primary" onClick={handleSendMsg}>
                Send
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-grow-1 d-flex align-items-center justify-content-center bg-light">
          <div className="text-center text-muted">
            <h5>Welcome to Talksy</h5>
            <p>Select a user to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
};


export default ChatPanel;