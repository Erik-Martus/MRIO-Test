import { hot } from "react-hot-loader";
import * as React from "react";
import OrderDashboard from "./components/OrderDashboard";

function App() {
  return (
    <div className="container">
      <h2>Orders</h2>
      <OrderDashboard />
    </div>
  );
}

export default hot(module)(App);
