import React from "react";
import { Routes, Route } from 'react-router-dom';
import InventoryPage from "./page/inventory/Inventory.js";

import Home from "./component/Home.js";
import { SessionContextProvider} from './hooks/SessionContext/context.js'
import NavBar from "./component/NavBar.js";
import SetOrderPage from "./page/order/SetOrderPage.js";
import OrderHistoryPage from "./page/order/OrderHistoryPage.js";
import TrackingPage from "./page/tracking/TrackingPage.js";

function App() {
  return (
    <div className="App">
      <SessionContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/set_order" element={<SetOrderPage />} />
          <Route path="/order_history" element={<OrderHistoryPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
        </Routes>
      </SessionContextProvider>
    </div>
  );
}

export default App;
