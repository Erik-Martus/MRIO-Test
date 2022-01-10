import "@testing-library/jest-dom/extend-expect";

import { fireEvent, render } from "@testing-library/react";
import * as React from "react";

import OrderPanel from "../src/components/OrderPanel";
import type { PurchaseOrder } from "../src/types";

// Example data used for testing. NOTE: The data is identical to data.json, it is included in this file under the assumption that in a real world scenario, the data used in the component would be pulled from a database or other external source.
const mockData: PurchaseOrder[] = [
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
        state: "SC",
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

describe("Purchase order table", () => {
  // Check that component renders with expected active sort order
  it("Renders default state", () => {
    const { getByTestId } = render(<OrderPanel orders={mockData} />);

    const orderNumber = getByTestId("col_orderNumber");
    const status = getByTestId("col_status");
    const address = getByTestId("col_address");
    const value = getByTestId("col_value");

    expect(orderNumber).toHaveClass("Mui-active");
    expect(orderNumber.parentElement).toHaveAttribute("aria-sort", "ascending");
    expect(status).not.toHaveClass("Mui-active");
    expect(address).not.toHaveClass("Mui-active");
    expect(value).not.toHaveClass("Mui-active");
  });

  // Check that rows correctly sort in ascending and descending numerical order based on order number
  it("Changes sorting by order number", () => {
    const { getByTestId } = render(<OrderPanel orders={mockData} />);

    const colHeading = getByTestId("col_orderNumber");
    const tableBody = getByTestId("order_tableBody");
    const order_01 = getByTestId("order_100000");
    const order_02 = getByTestId("order_100005");
    const order_03 = getByTestId("order_1000101");

    fireEvent.click(colHeading);
    expect(colHeading.parentElement).toHaveAttribute("aria-sort", "descending");
    expect(tableBody.childNodes[0]).toBe(order_03);
    expect(tableBody.childNodes[1]).toBe(order_02);
    expect(tableBody.childNodes[2]).toBe(order_01);
    fireEvent.click(colHeading);
    expect(colHeading.parentElement).toHaveAttribute("aria-sort", "ascending");
    expect(tableBody.childNodes[0]).toBe(order_01);
    expect(tableBody.childNodes[1]).toBe(order_02);
    expect(tableBody.childNodes[2]).toBe(order_03);
  });

  // Check that rows correctly sort in ascending and descending alphabetical order based on status
  it("Changes sorting by status", () => {
    const { getByTestId } = render(<OrderPanel orders={mockData} />);

    const colHeading = getByTestId("col_status");
    const prevColHeading = getByTestId("col_orderNumber");
    const tableBody = getByTestId("order_tableBody");
    const order_01 = getByTestId("order_100000");
    const order_02 = getByTestId("order_100005");
    const order_03 = getByTestId("order_1000101");

    fireEvent.click(colHeading);
    expect(colHeading.parentElement).toHaveAttribute("aria-sort", "ascending");
    expect(colHeading).toHaveClass("Mui-active");
    expect(prevColHeading).not.toHaveClass("Mui-active");
    expect(tableBody.childNodes[0]).toBe(order_03);
    expect(tableBody.childNodes[1]).toBe(order_01);
    expect(tableBody.childNodes[2]).toBe(order_02);
    fireEvent.click(colHeading);
    expect(colHeading.parentElement).toHaveAttribute("aria-sort", "descending");
    expect(tableBody.childNodes[0]).toBe(order_02);
    expect(tableBody.childNodes[1]).toBe(order_01);
    expect(tableBody.childNodes[2]).toBe(order_03);
  });

  // Check that rows correctly sort in ascending and descending alphabetical order based on address
  it("Changes sorting by address", () => {
    const { getByTestId } = render(<OrderPanel orders={mockData} />);

    const colHeading = getByTestId("col_address");
    const prevColHeading = getByTestId("col_orderNumber");
    const tableBody = getByTestId("order_tableBody");
    const order_01 = getByTestId("order_100000");
    const order_02 = getByTestId("order_100005");
    const order_03 = getByTestId("order_1000101");

    fireEvent.click(colHeading);
    expect(colHeading.parentElement).toHaveAttribute("aria-sort", "ascending");
    expect(colHeading).toHaveClass("Mui-active");
    expect(prevColHeading).not.toHaveClass("Mui-active");
    expect(tableBody.childNodes[0]).toBe(order_01);
    expect(tableBody.childNodes[1]).toBe(order_02);
    expect(tableBody.childNodes[2]).toBe(order_03);
    fireEvent.click(colHeading);
    expect(colHeading.parentElement).toHaveAttribute("aria-sort", "descending");
    expect(tableBody.childNodes[0]).toBe(order_03);
    expect(tableBody.childNodes[1]).toBe(order_02);
    expect(tableBody.childNodes[2]).toBe(order_01);
  });

  // Check that rows correctly sort in ascending and descending numerical order based on order value
  it("Changes sorting by value", () => {
    const { getByTestId } = render(<OrderPanel orders={mockData} />);

    const colHeading = getByTestId("col_value");
    const prevColHeading = getByTestId("col_orderNumber");
    const tableBody = getByTestId("order_tableBody");
    const order_01 = getByTestId("order_100000");
    const order_02 = getByTestId("order_100005");
    const order_03 = getByTestId("order_1000101");

    fireEvent.click(colHeading);
    expect(colHeading.parentElement).toHaveAttribute("aria-sort", "ascending");
    expect(colHeading).toHaveClass("Mui-active");
    expect(prevColHeading).not.toHaveClass("Mui-active");
    expect(tableBody.childNodes[0]).toBe(order_03);
    expect(tableBody.childNodes[1]).toBe(order_01);
    expect(tableBody.childNodes[2]).toBe(order_02);
    fireEvent.click(colHeading);
    expect(colHeading.parentElement).toHaveAttribute("aria-sort", "descending");
    expect(tableBody.childNodes[0]).toBe(order_02);
    expect(tableBody.childNodes[1]).toBe(order_01);
    expect(tableBody.childNodes[2]).toBe(order_03);
  });
});
