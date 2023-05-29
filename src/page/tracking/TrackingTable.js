import Button from "../../component/Button";
import { useEffect, useState } from "react";
import { numberWithCommas } from "../../util/formater";
import axios from "axios";
import { useSessionContext } from "../../hooks/SessionContext/context.js";

function TrackingTable(props) {
  const { axiosHeader } = useSessionContext();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/trackings`);
      const { 
        data: { results}
      } = await response;
      setItems(results);
    }
    fetchData();
  }, []);

  const [items, setItems] = useState([]);
  const [editableRowIndex, setEditableRowIndex] = useState(-1);
  const [createRow, setCreateRow] = useState(false);
  const [trackingCompany, setTrackingCompany] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleUpdate = async (index) => {
    const updateItem = items[editableRowIndex];
    axios.put(
      `/trackings/${items[index].id}/`,
      updateItem,
      axiosHeader,
    );
  };

  const handleCreateClick = (index) => {
    const createItem = items[editableRowIndex];
    createItem.tracking_company = trackingCompany;
    createItem.tracking_number = trackingNumber;
    axios.post(
      `/trackings/`,
      createItem,
      axiosHeader,
    );
    setEditableRowIndex(-1);
    setCreateRow(false)
  };

  const handleEditClick = (index) => {
    setEditableRowIndex(index);
    setTrackingCompany(items[index].tracking_company);
    setTrackingNumber(items[index].tracking_number);
  };
  const handleSaveClick = () => {
    setEditableRowIndex(-1);
    const updatedData = [...items];
    updatedData[editableRowIndex].tracking_company = trackingCompany;
    updatedData[editableRowIndex].tracking_number = trackingNumber;
    setItems(updatedData);
    handleUpdate(editableRowIndex);
  };

  const handleAddClick = () => {
    setCreateRow(true);
    const updatedData = [...items];
    updatedData.push({
      tracking_company: "UPS",
      tracking_number: 0,
    });
    setItems(updatedData);
    setEditableRowIndex(updatedData.length - 1);
  };

  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">Tracking Number</div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">Tracking Company</div>
              </th>
              <th scope="col" class="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr class="bg-white border-b">
                <td class="px-6 py-4">
                  {editableRowIndex === index ? (
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                    />
                  ) : (
                    item.tracking_number
                  )}
                </td>
                <td class="px-6 py-4">
                  {editableRowIndex === index ? (
                    <select
                      value={trackingCompany}
                      onChange={(e) => setTrackingCompany(e.target.value)}
                    >
                      <option value="USPS">USPS</option>
                      <option value="FedEx">FedEx</option>
                      <option value="UPS">UPS</option>
                    </select>
                  ) : (
                    item.tracking_company
                  )}
                </td>
                <td class="px-6 py-4">
                  {
                    !createRow ? editableRowIndex === index ? (
                      <button onClick={handleSaveClick}>Save</button>
                    ) : (
                      <button
                        class="font-medium text-blue-600hover:underline"
                        onClick={() => handleEditClick(index)}
                      >
                        Edit
                      </button>
                    ) : (
                      editableRowIndex === index && (
                        <button onClick={handleCreateClick}>Create</button>
                      )
                    )
                  }
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cntainer p-6 flex justify-center">
        <Button text="Add" onClick={handleAddClick} />
      </div>
    </>
  );
}

export default TrackingTable;
