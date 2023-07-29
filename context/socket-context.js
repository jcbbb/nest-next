"use client";

import { debounce } from "@/utils";
import { createContext, useCallback, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();
const socket = io(process.env.NEXT_PUBLIC_WS_URI, {
  auth: {
    token: typeof window !== "undefined" ? localStorage.getItem("access_token") : ""
  }
});

export function SocketProvider({ children }) {
  const emitDeb = useCallback(debounce(socket.emit.bind(socket), 500));
  return <SocketContext.Provider value={{ socket, emitDeb }}>{children}</SocketContext.Provider>
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be within SocketProvider")
  }

  return context;
}
