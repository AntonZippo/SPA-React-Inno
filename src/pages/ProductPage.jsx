import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cart.slise";
import "./ProductPage.css";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  if (loading) {
    return <div className="product-loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="product-error">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-container">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
        />

        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="product-description">{product.description}</p>

          <div className="product-price-block">
            <span className="product-price">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="product-discount">
                -{product.discountPercentage}%
              </span>
            )}
          </div>

          <div className="product-details">
            <p>
              <strong>Brand:</strong> {product.brand || "—"}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Rate:</strong> ⭐ {product.rating} / 5
            </p>
            <p>
              <strong>Stock:</strong>{" "}
              {product.stock > 0 ? `${product.stock} pc.` : "Out"}
            </p>
          </div>

          <button onClick={handleAddToCart} className="buy-button">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
