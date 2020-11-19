import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { truncateText, formatPrice, formatDate } from "../helper";

export default function Product(props) {
  const { product, isNew } = props;
  return (
    <div>
      <div className="product customize">
        <div className="image">
          <a href={`/product/${product._id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="rounded img-fluid"
            />
          </a>
        </div>

        <div className="text">
          <h5 className="h5 producth5">
            <a href={`/product/${product._id}`}>
              {truncateText(product.name, 50)}
            </a>
          </h5>
          <p className="author-category">
            By <a href="#">{product.hostname}</a>
          </p>
          <p className="intro">{formatDate(product.hdate)}</p>
          <p className="price">{formatPrice(product.price)}</p>
        </div>
        {isNew && (
          <div className="ribbon-holder">
            <div className="ribbon new">NEW</div>
          </div>
        )}
      </div>
    </div>
  );
}
