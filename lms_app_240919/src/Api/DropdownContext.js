// DropdownContext.js
import React, { createContext, useState, useContext } from "react";

const DropdownContext = createContext();

export function DropdownProvider({ children }) {
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);

  const toggleCommunityDropdown = () => {
    setIsCommunityDropdownOpen((prev) => !prev);
  };

  return (
    <DropdownContext.Provider
      value={{ isCommunityDropdownOpen, toggleCommunityDropdown }}
    >
      {children}
    </DropdownContext.Provider>
  );
}

export function useDropdown() {
  return useContext(DropdownContext);
}
