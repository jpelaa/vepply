import React, { Dispatch } from "react";
import { API_STATUS, INVENTORY_TYPES } from "./static/types";

const reducer = (state: any, newState: any) => {
  return { ...state, ...newState };
};

interface AppContextInterface {
  staticLoadingStatus: string;
  userName: string;
  hasAccess: boolean;
  isUserLoggedIn: boolean;
  selectedCategory: string;
  list: any;
  pageStatus: string;
  totalCount: number;
  error: boolean;
  errorMessage: string;
}

export const initialState: AppContextInterface = {
  staticLoadingStatus:
    (localStorage.getItem("isStaticDataLoaded") && API_STATUS.done) ||
    API_STATUS.default,
  userName: "",
  hasAccess: false,
  selectedCategory: INVENTORY_TYPES.service,
  list: [],
  pageStatus: API_STATUS.default,
  totalCount: 0,
  isUserLoggedIn: false,
  error: false,
  errorMessage: "",
};

const StateContext = React.createContext<{
  state: AppContextInterface;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const StateProvider = (props: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
