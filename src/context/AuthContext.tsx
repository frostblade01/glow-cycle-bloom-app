
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the user object
interface User {
  id: string;
  name: string;
  email: string;
  isOnboarded: boolean;
}

// Define the shape of the auth context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
}

// Create the auth context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  completeOnboarding: () => {},
});

// Export the hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// Create the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // This would normally call a backend API
    // For demo purposes, we'll just set a mock user
    setUser({
      id: "1",
      name: "Lily Johnson",
      email: email,
      isOnboarded: true, // Set to true for demo, normally would check if onboarding completed
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    // This would normally call a backend API
    // For demo purposes, we'll just set a mock user
    setUser({
      id: "1",
      name: name,
      email: email,
      isOnboarded: false, // New users need onboarding
    });
  };

  const logout = () => {
    setUser(null);
  };

  const completeOnboarding = () => {
    if (user) {
      setUser({ ...user, isOnboarded: true });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
