import { useEffect } from "react";
import "./App.css";
import { customSocket } from "./socket";
import { routes } from "./routes";
import { RouterProvider } from "react-router-dom";
// import { HelperFunctionsClass } from "./Utils/HelperFunctions/HelperFunctions";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "./components/toast";

function App() {
  useEffect(() => {
    customSocket.on("welcome", () => {
      toast.info("Connected to chat server");
    });

    return () => {
      customSocket.off("welcome");
    };
  }, []);

  return <RouterProvider router={routes} />;
}

export default App;
