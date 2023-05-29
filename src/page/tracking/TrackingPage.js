import TrackingTable from "./TrackingTable.js";
import styles from "./styles.js";
import Description from "../../component/Section.js";

function TrackingPage() {
  const h2 = "In this page, it covers";
  const descriptions = ["be able to update order with shipping information, e.g. tracking company, tracking number."];

  return (
    <div className="container mx-auto py-6">
      <h1 className={styles.h1}>Tracking</h1>
      <Description h2={h2} descriptions={descriptions} />
      <TrackingTable />
    </div>
  );
}

export default TrackingPage;
