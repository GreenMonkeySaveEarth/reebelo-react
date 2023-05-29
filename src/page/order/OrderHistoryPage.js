import React from "react";
import History from "./History.js";
import Description from "../../component/Section.js";

function OrderHistoryPage(props) {
  const h2 = "In this page, it covers";
  const descriptions = ["be able to update order with status, e.g. processing, cancelled, delivered."];

  return (
    <div className="container mx-auto py-8">
      <Description h2={h2} descriptions={descriptions} />
      <History />
    </div>
  );
}

export default OrderHistoryPage;
