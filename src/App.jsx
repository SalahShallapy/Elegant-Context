import Product from "./components/Product.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import CartContextProvidor from "./store/shopping-cart-context.jsx";

function App() {
  return (
    <CartContextProvidor>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvidor>
  );
}

export default App;
