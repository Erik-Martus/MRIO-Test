import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { PurchaseOrder } from "../../types";
import orderData from "../../data/data.json";

const initialState: PurchaseOrder[] = orderData;

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {}, // Reducer logic for interacting with order items.
});

// Get total value of all orders.
export const selectTotal = (state: RootState) => {
  let total = 0.0;
  state.orders.forEach(
    (order: PurchaseOrder) => (total += order.order_details.value)
  );
  return total;
};
// Get all orders.
export const selectOrders = (state: RootState) => state.orders;
// Get only orders with a "shipped" status.
export const selectShipped = (state: RootState) =>
  state.orders.filter((order: PurchaseOrder) => order.status === "shipped");

export default orderSlice.reducer;
