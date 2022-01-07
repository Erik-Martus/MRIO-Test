import { hot } from "react-hot-loader";
import * as React from "react";
import OrderPanel from "./components/OrderPanel";

function App() {
  return (
    <div className="container">
      <h2>Orders</h2>
      <OrderPanel />
    </div>
  );
}

export default hot(module)(App);
