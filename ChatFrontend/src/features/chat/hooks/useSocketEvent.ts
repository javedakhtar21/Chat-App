import { useEffect } from "react";
import { customSocket } from "../../../socket";

const useSocketEvent = (event: string, handler: (...args: any[]) => void) => {
  useEffect(() => {
    customSocket.on(event, handler);

    return () => {
      customSocket.off(event, handler);
    };
  }, [event, handler]);
};

export { useSocketEvent };
