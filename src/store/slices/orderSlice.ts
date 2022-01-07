import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Order {
  order_number: number;
  customer: {
    first_name: string;
    last_name: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      zip: string;
    };
  };
  order_details: {
    value: number;
    date: string;
  };
  shipping_details: {
    date: string;
  };
  status: string;
}

const initialState: object[] = [
  {
    order_number: 100000,
    customer: {
      first_name: "John",
      last_name: "Doe",
      address: {
        line1: "123 Main Street",
        line2: "",
        city: "Boston",
        state: "MA",
        zip: "02215",
      },
    },
    order_details: {
      value: 137.11,
      date: "Mon Feb 01 2021 00:00:00 GMT+0000 (GMT)",
    },
    shipping_details: {
      date: "Wed Feb 03 2021 00:00:00 GMT+0000 (GMT)",
    },
    status: "open",
  },
  {
    order_number: 100005,
    customer: {
      first_name: "Mary",
      last_name: "Smith",
      address: {
        line1: "555 Broadway",
        line2: "",
        city: "New York",
        state: "NY",
        zip: "12345",
      },
    },
    order_details: {
      value: 157.12,
      date: "Sun Mar 01 2021 00:00:00 GMT+0000 (GMT)",
    },
    shipping_details: {
      date: "Tue Mar 03 2021 00:00:00 GMT+0000 (GMT)",
    },
    status: "shipped",
  },
  {
    order_number: 1000101,
    customer: {
      first_name: "Dakota",
      last_name: "Finley",
      address: {
        line1: "999 South Bend Road",
        line2: "",
        city: "Charleston",
        state: "MSC",
        zip: "38672",
      },
    },
    order_details: {
      value: 98.99,
      date: "Tue Jan 10 2021 00:00:00 GMT+0000 (GMT)",
    },
    shipping_details: {
      date: "Wed Jan 13 2021 00:00:00 GMT+0000 (GMT)",
    },
    status: "cancelled",
  },
];

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
});

export const selectTotal = (state: RootState) => {
  let total = 0.0;
  state.orders.forEach((order: Order) => (total += order.order_details.value));
  return total;
};

export default orderSlice.reducer;
