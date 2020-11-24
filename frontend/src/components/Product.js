import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { truncateText, formatPrice, formatDate } from "../helper";

export default function Product(props) {
  const { product, isNew } = props;
  const date1 = new Date().setHours(0, 0, 0, 0);
  const date2 = new Date(product.hdate).setHours(0, 0, 0, 0);
  const productprice =
    product.avalabilityCounter && product.avalabilityCounter > 0
      ? date1 > date2
        ? "Sold Out"
        : formatPrice(product.price)
      : "Sold Out";
  const sellingSoon = product.avalabilityCounter < 3 ? true : false;
  const datecheck = date1 > date2;
  console.log("date check====",datecheck);
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
            <div className="indiatalks-homepage-htm-price-scope">
              <span>
                <span>{productprice}</span>
              </span>
            </div>
          </span>
        </div>

        <div className="text">
          <h5 className="h5 producth5 prod-title">
            <a href={`/product/${product._id}`}>{product.name}</a>
          </h5>
          <p className="intro">{formatDate(product.hdate)}</p>
          <p className="author-category">
            By <a href="#">{product.hostname}</a>
          </p>
          {(productprice !== 'Sold Out') && (
            <div className="button-container">
              <span className="badge badge-primary product-card">
                Event Series
              </span>
              <span className="badge badge-success drop-in-container">
                <i className="fa fa-check" aria-hidden="true"></i>Drop-in
              </span>
            </div>
          )}
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
