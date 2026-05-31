import { useEffect } from "react";
import { HelperFunctionsClass } from "../../../Utils/HelperFunctions/HelperFunctions";
import { customSocket } from "../../../socket";
import { toast } from "../../../components/toast/index";

const useSocketConnection = () => {
  useEffect(() => {
    const handleSocketConnect = () => {
      toast.success(`Connected to chat server: ${customSocket.id}`);
    };

    const handleSocketDisconnect = () => {
      toast.warning(`Disconnected from chat server: ${customSocket.id}`);
    };

    customSocket.on("connect", handleSocketConnect);
    customSocket.on("disconnect", handleSocketDisconnect);

    const token = HelperFunctionsClass.getLocalStorageItem("token");
    if (token && !customSocket.connected) {
      customSocket.auth = { token };
      customSocket.connect();
    }

    return () => {
      customSocket.off("connect", handleSocketConnect);
      customSocket.off("disconnect", handleSocketDisconnect);
    };
  }, []);
};


export {useSocketConnection}