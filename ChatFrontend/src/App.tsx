import { useEffect } from "react";
import "./App.css";
import { customSocket } from "./socket";
import { routes } from "./routes";
import { RouterProvider } from "react-router-dom";
// import { HelperFunctionsClass } from "./Utils/HelperFunctions/HelperFunctions";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  useEffect(() => {
    customSocket.on("welcome", (dataFromBackend) => {
      console.log("Connected:", dataFromBackend);
    });

    // customSocket.on("recMsg", (dataFromBackend) => {
    //   console.log("Message from backend:", dataFromBackend);
    // });

    return () => {
      customSocket.off("welcome");
      // customSocket.off("recMsg");
    };
  }, []);
  return <RouterProvider router={routes} />;
}

export default App;
