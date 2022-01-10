import * as React from "react";
import { useState } from "react";
import * as moment from "moment";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  Paper,
  Checkbox,
  IconButton,
} from "@mui/material";
import Chip from "./Chip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { PurchaseOrder } from "../types";
import { visuallyHidden } from "@mui/utils";

interface OrderPanelProps {
  orders: object[];
}

export default function OrderPanel(props: OrderPanelProps) {
  const { orders } = props;

  interface Data {
    order_number: string;
    order_date: string;
    status: string;
    status_date: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      zip: string;
    };
    address_full: string;
    value: number;
  }

  function createData(
    order_number: string,
    order_date: string,
    status: string,
    status_date: string,
    address: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      zip: string;
    },
    address_full: string,
    value: number
  ): Data {
    return {
      order_number,
      order_date,
      status,
      status_date,
      address,
      address_full,
      value,
    };
  }

  const rows: object[] = [];
  function createRows() {
    orders.forEach((order: PurchaseOrder) => {
      rows.push(
        createData(
          order.order_number.toString(),
          moment.utc(new Date(order.order_details.date)).format("MMM. D, YYYY"),
          order.status,
          moment
            .utc(new Date(order.shipping_details.date))
            .format("D/MMM/YYYY")
            .toUpperCase(),
          {
            line1: order.customer.address.line1,
            line2: order.customer.address.line2,
            city: order.customer.address.city,
            state: order.customer.address.state,
            zip: order.customer.address.zip,
          },
          Object.values(order.customer.address).join(" "), // Address combined to string for purpose of sorting
          order.order_details.value
        )
      );
    });
  }
  createRows();

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  type Order = "asc" | "desc";

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  interface HeadCell {
    disablePadding: boolean;
    id: string;
    order_key: keyof Data;
    label: string;
    align_right: boolean;
  }

  const headCells: readonly HeadCell[] = [
    {
      id: "col_orderNumber",
      order_key: "order_number",
      align_right: false,
      disablePadding: true,
      label: "Order Number & Date",
    },
    {
      id: "col_status",
      order_key: "status",
      align_right: false,
      disablePadding: false,
      label: "Shipping Status",
    },
    {
      id: "col_address",
      order_key: "address_full",
      align_right: false,
      disablePadding: false,
      label: "Customer Address",
    },
    {
      id: "col_value",
      order_key: "value",
      align_right: true,
      disablePadding: false,
      label: "Order Value",
    },
  ];

  interface OrderTableProps {
    numSelected: number;
    onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof Data
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

  function OrderTableHead(props: OrderTableProps) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;

    const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead>
        <TableRow sx={{ height: "2.8125rem" }}>
          <TableCell sx={{ width: "6.5rem", p: "0", pl: "0.5rem" }}>
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all orders" }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              padding="none"
              align={headCell.align_right ? "right" : "left"}
              sortDirection={orderBy === headCell.order_key ? order : false}
            >
              <TableSortLabel
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  lineHeight: "125%",
                  letterSpacing: "0.0375rem",
                  textTransform: "uppercase",
                  color: "#6E6893",
                }}
                active={orderBy === headCell.order_key}
                direction={orderBy === headCell.order_key ? order : "asc"}
                onClick={createSortHandler(headCell.order_key)}
                data-testid={headCell.id}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell
            align="right"
            sx={{ width: "9.375rem", p: "0", pr: "0.75rem" }}
          >
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }

  function OrderTable() {
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof Data>("order_number");
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof Data
    ) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };

    const handleSelectAllClick = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (event.target.checked) {
        const newSelected = rows.map((n: Data) => n.order_number);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };

    const handleClick = (
      event: React.MouseEvent<unknown>,
      order_number: string
    ) => {
      const selectedIndex = selected.indexOf(order_number);
      let newSelected: readonly string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, order_number);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const isSelected = (order_number: string) =>
      selected.indexOf(order_number) !== -1;

    return (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="orderTable"
              size="medium"
            >
              <OrderTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody data-testid="order_tableBody">
                {rows
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: Data, index) => {
                    const isItemSelected = isSelected(row.order_number);
                    const labelId = `order-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        sx={{ backgroundColor: "#FFF", height: "3.75rem" }}
                        onClick={(event) =>
                          handleClick(event, row.order_number)
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.order_number}
                        selected={isItemSelected}
                        data-testid={`order_${row.order_number}`}
                      >
                        <TableCell sx={{ p: "0", pl: "0.5rem" }}>
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <Typography
                            sx={{ fontSize: "0.875rem", fontWeight: "500" }}
                          >
                            # {row.order_number}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.875rem", color: "#6e6893" }}
                          >
                            Ordered: {row.order_date}
                          </Typography>
                        </TableCell>
                        <TableCell padding="none">
                          <Chip
                            label={row.status}
                            variant={
                              row.status === "open"
                                ? "success"
                                : row.status === "cancelled"
                                ? "error"
                                : "primary"
                            }
                          />
                          <Typography
                            sx={{ fontSize: "0.75rem", color: "#6e6893" }}
                          >
                            Updated: {row.status_date}
                          </Typography>
                        </TableCell>
                        <TableCell padding="none">
                          <Typography sx={{ fontSize: "0.75rem" }}>
                            {`${row.address.line1} ${
                              row.address.line2 ? "," + row.address.line2 : ""
                            }`}
                            <br />
                            {`${row.address.city}, ${row.address.state} ${row.address.zip}`}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" padding="none">
                          <Typography
                            sx={{ fontSize: "0.875rem", fontWeight: "500" }}
                          >
                            ${row.value}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.75rem", color: "#6e6893" }}
                          >
                            USD
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ p: "0", pr: "0.75rem" }}>
                          <IconButton>
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{ color: "#6e6893" }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    );
  }

  return <OrderTable />;
}
