"use client";

import { createContext, useState } from "react";

export const HoverContext = createContext({});

export default function HoverProvider({ children }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <HoverContext.Provider value={{ hoveredCategory, setHoveredCategory }}>
      {children}
    </HoverContext.Provider>
  );
}
