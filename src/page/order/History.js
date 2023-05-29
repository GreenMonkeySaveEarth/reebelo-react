import React, { useEffect, useState } from "react";
import styles from "./styles.js";
import axios from "axios";
import { useSessionContext } from "../../hooks/SessionContext/context.js";

function History(props) {
  const { axiosHeader } = useSessionContext();
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/orders/`);
      const {
        data: { results },
      } = await response;
      setItems(results);
    }
    fetchData();
  }, []);

  const [items, setItems] = useState([]);
  const [editableRowIndex, setEditableRowIndex] = useState(-1);
  const [trackingId, setTrackingId] = useState("");
  const [trackingCompany, setTrackingCompany] = useState(0);
  const [status, setStatus] = useState(0);

  const handleUpdate = async (index) => {
    const updateItem = items[editableRowIndex];
    axios.put(`/orders/${items[index].id}/`, updateItem, axiosHeader);
  };
  const handleEditClick = (index) => {
    setEditableRowIndex(index);
    setTrackingId(items[index].trackingId);
    setTrackingCompany(items[index].trackingCompany);
    setStatus(items[index].status);
  };
  const handleSaveClick = () => {
    // Tmp save the data, instead it should send a request to the backend to store in the DB.
    setEditableRowIndex(-1);
    // Perform save logic here
    const updatedData = [...items];
    updatedData[editableRowIndex].trackingId = trackingId;
    updatedData[editableRowIndex].trackingCompany = trackingCompany;
    updatedData[editableRowIndex].status = status;
    setItems(updatedData);
    handleUpdate(editableRowIndex);
  };

  return (
    <div>
      <h1 className={styles.h1}>Order History</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-2">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Tracking ID</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Status</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr className="bg-white border-b">
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {item.id}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {item.product}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {item.address}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {item.tracking}
                </td>
                <td className="px-6 py-4">
                  {editableRowIndex === index ? (
                    <select
                      className={styles.select}
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="processing">Processing</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  ) : (
                    item.status
                  )}
                </td>
                <td className="px-6 py-4">
                  {editableRowIndex === index ? (
                    <button onClick={handleSaveClick}>Save</button>
                  ) : (
                    <button
                      className="font-medium text-blue-600hover:underline"
                      onClick={() => handleEditClick(index)}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
