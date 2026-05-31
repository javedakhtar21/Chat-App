import "./App.css";
import { routes } from "./routes";
import { RouterProvider } from "react-router-dom";
// import { HelperFunctionsClass } from "./Utils/HelperFunctions/HelperFunctions";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSocketConnection } from "./features/chat/hooks/useSocketConnection";

function App() {
  useSocketConnection();
  return <RouterProvider router={routes} />;
}

export default App;
