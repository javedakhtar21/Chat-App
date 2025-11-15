import "./App.css";
import LogoBar from "./components/logobar/LogoBar";
import Dashboard from "./components/user-dashboard/Dashboard";
        
function App() {
  
  return (
    <div className="d-flex flex-column vh-100">
      <LogoBar />
      <div className="container-fluid d-flex flex-row flex-grow-1 overflow-hidden p-2 gap-3" style={{ minHeight: 0 }}>
        {/* Left Sidebar */}
        <div className="h-100 overflow-auto border" style={{ width: "15%" }}>
          <h2>Talksy - a chat app</h2>
        </div>

        {/* Middle Dashboard */}
        <div className="h-100 overflow-auto" style={{ width: "25%" }}>
          <Dashboard />
        </div>

        {/* Main Chat Area */}
        <div
          className="h-100 overflow-auto shadow d-flex flex-column justify-content-center align-items-center text-center"
          style={{ width: "60%", color: "#5E40F2" }}
        >
          <h4>Talksy - A real time chat app</h4>
          <p>Send or receive messages securely</p>
        </div>
      </div>
    </div>
  );
}

export default App;