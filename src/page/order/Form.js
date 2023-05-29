import React, { useState } from "react";

import styles from "./styles.js";
import axios from "axios";
import { useSessionContext } from "../../hooks/SessionContext/context.js";

const Form = () => {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [address, setAddress] = useState("");
  const [orderStatus, setOrderStatus] = useState("processing");
  const { axiosHeader } = useSessionContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newValue = {
      product: product,
      quantity: quantity,
      address: address,
      status: orderStatus,
    };
    axios.post("/orders/", newValue, axiosHeader).then((response) => {
      setProduct("");
      setQuantity(0);
      setAddress("");
      setOrderStatus("processing");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative z-0 w-full mb-6 group">
        <label className={styles.label}>Product</label>
        <input
          className={styles.input}
          type="text"
          value={product}
          placeholder="Product Name"
          onChange={(e) => setProduct(e.target.value)}
        />
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <label className={styles.label}>Quantity</label>
        <input
          className={styles.input}
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 0))}
        />
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <label className={styles.label}>Address</label>
        <input
          className={styles.input}
          placeholder="123 Main St SF CA 94110"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <label className={styles.label}>Order Status</label>
        <select
          className={styles.select}
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value)}
        >
          <option value="processing">Processing</option>
          <option value="cancelled">Cancelled</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
