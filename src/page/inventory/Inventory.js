import InventoryTable from "./InventoryTable";
import styles from "./styles.js";
import Description from "../../component/Section.js";

function InventoryPage() {
  const h2 = "In this page, it covers";
  const descriptions = ["be able to create/update products with price and stock quantity."];

  return (
    <div className="container mx-auto py-6">
      <h1 className={styles.h1}>Inventory</h1>
      <Description h2={h2} descriptions={descriptions} />
      <InventoryTable />
    </div>
  );
}

export default InventoryPage;
