import Button from "../../component/Button";
import { useEffect, useState } from "react";
import { numberWithCommas } from "../../util/formater";
import axios from "axios";
import { useSessionContext } from "../../hooks/SessionContext/context.js";

function InventoryTable(props) {
  const { axiosHeader } = useSessionContext();
  console.log('axiosHeader', axiosHeader)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/inventorys`);
      const data = await response.json();
      setItems(data.results);
    }
    fetchData();
  }, []);

  const [items, setItems] = useState([]);
  const [editableRowIndex, setEditableRowIndex] = useState(-1);
  const [createRow, setCreateRow] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [quantityInput, setQuantityInput] = useState(0);
  const [priceInput, setPriceInput] = useState(0);

  const handleUpdate = async (index) => {
    const updateItem = items[editableRowIndex];
    axios.put(
      `/inventorys/${items[index].id}/`,
      updateItem,
      axiosHeader,
    );
  };
  const handleCreateClick = (index) => {
    const createItem = items[editableRowIndex];
    createItem.name = nameInput;
    createItem.quantity = quantityInput;
    createItem.price = priceInput;
    axios.post(
      `/inventorys/`,
      createItem,
      axiosHeader
    );
    setEditableRowIndex(-1);
    setCreateRow(false)
  };

  const handleEditClick = (index) => {
    setEditableRowIndex(index);
    setNameInput(items[index].name);
    setQuantityInput(items[index].quantity);
    setPriceInput(items[index].price);
  };
  const handleSaveClick = () => {
    setEditableRowIndex(-1);
    const updatedData = [...items];
    updatedData[editableRowIndex].name = nameInput;
    updatedData[editableRowIndex].quantity = quantityInput;
    updatedData[editableRowIndex].price = priceInput;
    setItems(updatedData);
    handleUpdate(editableRowIndex);
  };

  const handleAddClick = () => {
    setCreateRow(true);
    const updatedData = [...items];
    updatedData.push({
      name: "",
      quantity: 0,
      price: 0,
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
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">Quantity</div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">Price</div>
              </th>
              <th scope="col" class="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr class="bg-white border-b  ">
                <td
                  // scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {editableRowIndex === index ? (
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td class="px-6 py-4">
                  {editableRowIndex === index ? (
                    <input
                      type="number"
                      value={quantityInput}
                      onChange={(e) => setQuantityInput(Number(e.target.value))}
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td class="px-6 py-4">
                  {editableRowIndex === index ? (
                    <input
                      type="number"
                      value={priceInput}
                      onChange={(e) => setPriceInput(Number(e.target.value))}
                    />
                  ) : (
                    "$" + numberWithCommas(item.price)
                  )}
                </td>
                <td class="px-6 py-4">
                  {
                    !createRow ? (
                      editableRowIndex === index ? (
                        <button onClick={handleSaveClick}>Save</button>
                      ) : (
                        <button
                          class="font-medium text-blue-600hover:underline"
                          onClick={() => handleEditClick(index)}
                        >
                          Edit
                        </button>
                      )
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

export default InventoryTable;
