import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Socket } from "socket.io-client";
import { authService } from "../features/auth";
import { toast } from "../components/toast";
import { customSocket } from "../socket";

interface SocketContextValue {
  socket: Socket;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const SocketContext = createContext<SocketContextValue | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(customSocket.connected);

  const connect = useCallback(() => {
    const token = authService.getToken();

    if (!token) {
      return;
    }

    customSocket.auth = {
      token: token,
    };
    customSocket.connect();
  }, []);

  const disconnect = useCallback(() => {
    customSocket.disconnect();
  }, []);

  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);
    const handleConnectError = (error: Error) => {
      toast.error(error.message || "Socket connection failed");
    };

    customSocket.on("connect", handleConnect);
    customSocket.on("disconnect", handleDisconnect);
    customSocket.on("connect_error", handleConnectError);

    if (authService.getToken()) {
      connect();
    }

    return () => {
      customSocket.off("connect", handleConnect);
      customSocket.off("disconnect", handleDisconnect);
      customSocket.off("connect_error", handleConnectError);
    };
  }, [connect]);

  const value = useMemo(
    () => ({
      socket: customSocket,
      isConnected,
      connect,
      disconnect,
    }),
    [isConnected, connect, disconnect],
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }

  return context;
};
