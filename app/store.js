import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { authReducer } from "./store/authSlice";

export const store = configureStore({
  reducer: { auth: authReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
export default store