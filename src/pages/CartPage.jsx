import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeItem, clearCart } from "../store/cart.slise";
import "./CartPage.css";

function CartPage() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.title} />
            <div className="cart-item-info">
              <strong>{item.title}</strong>
              <p>${item.price}</p>
            </div>
            <button
              onClick={() => dispatch(removeItem(item.id))}
              className="remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-actions">
        <button onClick={() => dispatch(clearCart())} className="clear-btn">
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default CartPage;
