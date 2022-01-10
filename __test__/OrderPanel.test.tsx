import "@testing-library/jest-dom/extend-expect";

import { fireEvent, render } from "@testing-library/react";
import * as React from "react";

import OrderPanel from "../src/components/OrderPanel";
import type { PurchaseOrder } from "../src/types";
import data from "./testData.json";

const mockData: PurchaseOrder[] = data;

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
