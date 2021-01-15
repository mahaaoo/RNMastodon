import React from "react";
import appStore from "./appStore";

export const Stores = {
  appStore,
}

export const StoresContext = React.createContext(Stores);

export const useStores = () => React.useContext(StoresContext);
