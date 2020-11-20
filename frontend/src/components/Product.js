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
          <span className="indiatalks-homepage-event-item-price">
            <div className="indiatalks-homepage-htm-price-scope"><span><span>{formatPrice(product.price)}</span></span></div>
          </span>
        </div>

        <div className="text">
          <h5 className="h5 producth5 prod-title">
            <a href={`/product/${product._id}`}>
              {product.name}
            </a>
          </h5>
          <p className="intro">{formatDate(product.hdate)}</p>
          <p className="author-category">
            By <a href="#">{product.hostname}</a>
          </p>
          <div className="button-container">
          <span class="badge badge-primary product-card">Event Series</span>
          <span class="badge badge-success drop-in-container"><i class="fa fa-check" aria-hidden="true"></i>Drop-in</span>
          </div>
        </div>
        {isNew && (
          <div className="ribbon-holder">
            <div className="ribbon new">new</div>
          </div>
        )}
      </div>
    </div>
  );
}
