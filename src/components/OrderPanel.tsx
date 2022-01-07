import * as React from "react";
import { useState } from "react";
import { useAppSelector } from "../hooks";
import { selectTotal } from "../store/slices/orderSlice";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel${index}`,
  };
}

export default function OrderPanel() {
  const [value, setValue] = useState(0);
  const total = useAppSelector(selectTotal);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Order status tabs"
        >
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Shipped" {...a11yProps(1)} />
        </Tabs>
        <span>
          <p>Total orders: ${total} USD</p>
        </span>
      </Box>
      <TabPanel value={value} index={0}>
        <p>All panel.</p>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <p>Shipped panel.</p>
      </TabPanel>
    </Box>
  );
}
