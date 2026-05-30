import { useEffect } from "react";
import "./App.css";
import { customSocket } from "./socket";
import { routes } from "./routes";
import { RouterProvider } from "react-router-dom";
// import { HelperFunctionsClass } from "./Utils/HelperFunctions/HelperFunctions";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "./components/toast";
import { HelperFunctionsClass } from "./Utils/HelperFunctions/HelperFunctions";

function App() {
  const handleSocketConnect = () => {
    debugger;
    toast.info(`Connected to chat server: ${customSocket.id}`);
  };

  const handleSocketDisconnect = () => {
    debugger;
    toast.warning(`Disconnected from chat server: ${customSocket.id}`);
  };

  useEffect(() => {
    const token = HelperFunctionsClass.getLocalStorageItem("token");

    // Agar user already logged in hai (page refresh karne par), toh hi connect karein
    if (token) {
      customSocket.auth = { token };
      customSocket.connect();
    }

    customSocket.on("connect", handleSocketConnect);
    customSocket.on("disconnect", handleSocketDisconnect);

    return () => {
      customSocket.off("connect", handleSocketConnect);
      customSocket.off("disconnect", handleSocketDisconnect);
    };
  }, []);

  return <RouterProvider router={routes} />;
}

export default App;
