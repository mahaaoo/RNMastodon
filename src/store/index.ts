import React from "react";
import appStore from "./appStore";
import accountStore from "./accountStore";

export const Stores = {
  appStore,
  accountStore,
}

export const StoresContext = React.createContext(Stores);

export const useStores = () => React.useContext(StoresContext);
