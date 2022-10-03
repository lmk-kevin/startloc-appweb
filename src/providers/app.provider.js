import React, { useContext, createContext,useState,
    //  useEffect 
    } from "react";
import { pinkMain } from "../constants/colors";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [colors, setColors] = useState(pinkMain);

    const providerValues = {
        colors,
        setColors
    };
      return (
        <AppContext.Provider value={providerValues}>{children}</AppContext.Provider>
      );
    };
    
    const useApp = () => {
      const app = useContext(AppContext);
      if (app === null) {
        throw new Error("useApp is null");
      }
    
      return app;
    };
    
    export { AppProvider, useApp };