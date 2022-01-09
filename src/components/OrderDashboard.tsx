import * as React from "react";
import { useState } from "react";
import { useAppSelector } from "../hooks";
import {
  selectTotal,
  selectOrders,
  selectShipped,
} from "../store/slices/orderSlice";
import { Box, Tabs, Tab } from "@mui/material";
import OrderPanel from "./OrderPanel";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2.5 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel${index}`,
  };
}

export default function OrderDashboard() {
  const [value, setValue] = useState(0);
  const total = useAppSelector(selectTotal);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Tabs
          value={value}
          sx={{ minHeight: "unset" }}
          onChange={handleTabChange}
          aria-label="Order status tabs"
        >
          <Tab
            label="All"
            sx={{
              textTransform: "none",
              p: 1.25,
              minWidth: "unset",
              minHeight: "unset",
            }}
            {...a11yProps(0)}
          />
          <Tab
            label="Shipped"
            sx={{
              textTransform: "none",
              p: 1.25,
              minWidth: "unset",
              minHeight: "unset",
            }}
            {...a11yProps(1)}
          />
        </Tabs>
        <div className="order_total">
          Total orders: <span className="order_total-amount">${total}</span>{" "}
          <span className="order_total-currency">USD</span>
        </div>
      </Box>
      <TabPanel value={value} index={0}>
        <OrderPanel orders={useAppSelector(selectOrders)} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrderPanel orders={useAppSelector(selectShipped)} />
      </TabPanel>
    </Box>
  );
}
