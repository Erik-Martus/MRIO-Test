import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    orders: orderReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
