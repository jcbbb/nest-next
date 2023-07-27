"use client";

import { createContext, useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { redirect } from "next/navigation";

const GET_ME = gql`query GetMe {
  me {
    username
  }
}`

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { data, error, loading } = useQuery(GET_ME);
  if (loading) return <p>Loading...</p>

  if (error) return redirect("/auth/login")

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be within AuthProvider")
  }

  return context;
}
