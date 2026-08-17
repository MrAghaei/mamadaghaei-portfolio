import React, { createContext, useContext } from "react";
import { useLocalizedPortfolio } from "../hooks/useLocalizedPortfolio";

type PortfolioContextValue = ReturnType<typeof useLocalizedPortfolio>;

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const portfolio = useLocalizedPortfolio();
  return (
    <PortfolioContext.Provider value={portfolio}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextValue => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return context;
};
