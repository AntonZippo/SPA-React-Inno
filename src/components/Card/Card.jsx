import react from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/cart.slise";

function Card({ product }) {
  const dispatch = useDispatch();

  if (!product) {
    return <div className="card">No Data</div>;
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem(product));
  };

  return (
    <div className="card-wrapper">
      <Link to={`/product/${product.id}`} className="card-link">
        <div className="card">
          {product.thumbnail && (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="card-image"
            />
          )}

          <div className="card-content">
            <h3 className="card-title">{product.title}</h3>
            <p className="card-description">{product.description}</p>

            <div className="card-footer">
              <span className="card-price">${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="card-discount">
                  -{product.discountPercentage}%
                </span>
              )}
            </div>

            <div className="card-rating">⭐ {product.rating} / 5</div>
          </div>
        </div>
      </Link>

      <button onClick={handleAddToCart} className="card-add-to-cart">
        Add to cart
      </button>
    </div>
  );
}

export default Card;
