function Description(props) {
  const title =
    "This is the work of Case Study Full Stack Developer at Reebelo";
  const subtitle =
    "We would like to invite you to a small case study. Feel free to make assumptions if you need to. We'd like to see from you a web application working with the technologies you would use if you were to create a baseline product and order management system.";

  return (
    <div className="container mx-auto py-8">
      <p class="mb-3 text-gray-500 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 first-letter:mr-3 first-letter:float-left">
        {title}
      </p>
      <p class="text-gray-500">{subtitle}</p>

      <h2 class="mb-2 text-lg">What is covered here</h2>
      <ol class="space-y-1 text-gray-500 list-disc list-inside">
        <li>
          <a className="text-blue-400" href="/inventory" target="_blank">
            /inventory
          </a>
          <ol>
            <li>
              be able to create/update products with price and stock quantity.
            </li>
          </ol>
        </li>
        <li>
          <a className="text-blue-400" href="/set_order" target="_blank">
            /set order
          </a>
          <ol>
            <li>be able to create order with product and quantity</li>
          </ol>
        </li>
        <li>
          <a className="text-blue-400" href="/order" target="_blank">
            /order
          </a>
          <ol>
            <li>
              be able to update order with shipping information, e.g. tracking
              company, tracking number
            </li>
            
          </ol>
        </li>
        <li>
          <a className="text-blue-400" href="/order_history" target="_blank">
            /order history
          </a>
          <ol>
            <li>  
              be able to update order with status, e.g. processing, cancelled,
              delivered.
            </li>
          </ol>
        </li>
        <li>
          <a className="text-blue-400" href="/tracking" target="_blank">
            /tracking
          </a>
          <ol>
            <li>  
              be able to update order with shipping information, e.g. tracking company, tracking number.
            </li>
          </ol>
        </li>
      </ol>
    </div>
  );
}

export default Description;
