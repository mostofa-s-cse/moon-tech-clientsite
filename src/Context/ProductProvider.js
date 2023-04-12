import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { actionType } from "../state/ProductState/actionType";
import {
  initialState,
  productReducer,
} from "../state/ProductState/productReducer";
const PRODUCT_CONTEXT = createContext();

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
console.log("state",state)
  useEffect(() => {
    dispatch({ type: actionType.FETCHING_START });
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: actionType.FETCHING_SUCCESS, payload: data.data })
      )
      .catch(() => {
        dispatch({ type: actionType.FETCHING_ERROR });
      });
  }, []);

  const value = {
    state,
    dispatch
  };
  return (
    <PRODUCT_CONTEXT.Provider value={value}>
      {children}
    </PRODUCT_CONTEXT.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(PRODUCT_CONTEXT);

  return context;
};

export default ProductProvider;
