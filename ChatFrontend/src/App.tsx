import { useEffect } from "react";
import "./App.css";
// import LogoBar from "./components/logobar/LogoBar";
// import Dashboard from "./components/user-dashboard/Dashboard";
import { socket } from "./socket";
// import  RegisterPage  from "./pages/RegisterPage";
import { routes } from "./routes";
import { RouterProvider } from "react-router-dom";
// import { HelperFunctionsClass } from "./Utils/HelperFunctions/HelperFunctions";
// index.tsx or App.tsx
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  useEffect(() => {
    socket.connect();

    // socket.on("welcome", (dataFromBackend) => {
    //   console.log("Connected:", dataFromBackend);

    //   socket.emit("sendMsg", {
    //     msg: "Hello from frontend",
    //     timestamp: HelperFunctionsClass.getDateAndTime(),
    //   });
    // });

    // socket.on("recMsg", (dataFromBackend) => {
    //   console.log("Message from backend:", dataFromBackend);
    // });

    return () => {
      socket.disconnect();
    };
  }, []);

  // return (
  //   <div className="d-flex flex-column vh-100">
  //     <LogoBar />
  //     <div
  //       className="container-fluid d-flex flex-row flex-grow-1 overflow-hidden p-2 gap-3"
  //       style={{ minHeight: 0 }}
  //     >
  //       {/* Left Sidebar */}
  //       <div className="h-100 overflow-auto border" style={{ width: "15%" }}>
  //         <h2>Talksy - a chat app</h2>
  //       </div>

  //       {/* Middle Dashboard */}
  //       <div className="h-100 overflow-auto" style={{ width: "25%" }}>
  //         <Dashboard />
  //       </div>

  //       {/* Main Chat Area */}
  //       <div
  //         className="h-100 overflow-auto shadow d-flex flex-column justify-content-center align-items-center text-center"
  //         style={{ width: "60%", color: "#5E40F2" }}
  //       >
  //         <h4>Talksy - A real time chat app</h4>
  //         <p>Send or receive messages securely</p>
  //       </div>
  //     </div>
  //   </div>
  // );

  return <RouterProvider router={routes} />;
}

export default App;
