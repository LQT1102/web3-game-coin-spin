"use client";
import React, { createContext, useReducer, useContext, ReactNode } from "react";

type LoadingState = {
  loadingCount: number;
  message: string;
  isLoading: boolean;
};

type LoadingAction = { type: "SHOW"; message?: string } | { type: "HIDE" } | { type: "RESET" };

const LoadingContext = createContext<
  | {
      state: LoadingState;
      showLoading: (message?: string) => void;
      hideLoading: () => void;
      resetLoading: () => void;
    }
  | undefined
>(undefined);

const initialState: LoadingState = {
  loadingCount: 0,
  message: "",
  isLoading: false,
};

// Reducer
const loadingReducer = (state: LoadingState, action: LoadingAction): LoadingState => {
  switch (action.type) {
    case "SHOW": {
      const newCount = state.loadingCount + 1;
      return { ...state, loadingCount: newCount, message: action.message || "", isLoading: !!newCount };
    }
    case "HIDE": {
      const newCount = Math.max(0, state.loadingCount - 1);
      return { ...state, loadingCount: newCount, isLoading: !!newCount };
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

// Provider
interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(loadingReducer, initialState);

  const showLoading = (message?: string): void => {
    dispatch({ type: "SHOW", message });
  };

  const hideLoading = (): void => {
    dispatch({ type: "HIDE" });
  };

  const resetLoading = (): void => {
    dispatch({ type: "RESET" });
  };

  return (
    <LoadingContext.Provider value={{ state, showLoading, hideLoading, resetLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook
const useAppLoading = (): {
  state: LoadingState;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  resetLoading: () => void;
} => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export { LoadingProvider, useAppLoading };
