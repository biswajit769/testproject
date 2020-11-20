import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { truncateText, formatPrice, formatDate } from "../helper";

export default function ProductWithFilter(props) {
  const { product } = props;
  return (
    <section className="custombar no-mb text-md-center bg-white">
      <div className="container">
        <div className="row product customize listview">
          <div className="col-md-5 text-center">
          <div className="image">
          <a href={`/product/${product._id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="rounded img-fluid"
            />
          </a>
          <span className="indiatalks-homepage-event-item-price listview">
            <div className="indiatalks-homepage-htm-price-scope listview"><span><span>{formatPrice(product.price)}</span></span></div>
          </span>
          </div>
            
          </div>
          <div className="col-md-7">
          <div className="text listitems">
          <h5 className="h5 producth5">
            <a href={`/product/${product._id}`}>
              {product.name}
            </a>
          </h5>
          <p className="intro">{formatDate(product.hdate)}</p>
          <p className="author-category">
            By <a href="#">{product.hostname}</a>
          </p>
          <p className="lead mb-small customsize">{product.shortdescription}</p>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}
