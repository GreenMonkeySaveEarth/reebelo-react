import Form from "./Form.js";
import styles from "./styles.js";
import Description from "../../component/Section.js";

function NewOrder(props) {
    const h2 = 'In this page, it covers';
    const descriptions = [
        'be able to create order with product and quantity'
    ];
    return (
        <div>
            <h1 className={styles.h1}>Set Order</h1>
            <Description h2={h2} descriptions={descriptions}/>
            <Form />
        </div>
        
    )
    
}


export default NewOrder;