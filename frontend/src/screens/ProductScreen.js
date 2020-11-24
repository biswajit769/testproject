import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";


import {
  truncateText,
  formatPrice,
  productAvailabilityStatus,
  formatDate,
} from "../helper";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div id="heading-breadcrumbs">
            <div className="container">
              <div className="row d-flex align-items-center flex-wrap">
                <div className="col-md-7">&nbsp;</div>
                <div className="col-md-5">
                  <ul className="breadcrumb d-flex justify-content-end">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active">
                      {truncateText(product.name, 50)}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div id="content">
            <div className="container">
              <div className="row bar">
                {/* LEFT COLUMN _________________________________________________________*/}
                <div className="col-lg-9">
                  <div className="heading">
                    <h2>{truncateText(product.name, 200)}</h2>
                  </div>
                  <div className="text-sm event-detail-host">
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <span className="event-host">{product.hostname}</span>
                  </div>
                  <div className="text-sm event-heading">
                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                    <span className="event-date">
                      {formatDate(product.hdate)}
                    </span>
                  </div>
                  <p className="goToDescription">
                    <a href="#details" className="scroll-to text-uppercase">
                      Scroll to Event details, host
                    </a>
                  </p>
                  <div id="productMain" className="row">
                    <div className="col-sm-6">
                      <div data-slider-id={1} className="shop-detail-carousel">
                        <div>
                          {" "}
                          <img
                            src={product.image}
                            alt={product.name}
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="box bs-select">
                        <form>
                          {product.countInStock > 0 && (
                            <div className="sizes">
                              <h5>Choose Quantity</h5>
                              <select
                              className="bs-select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          )}
                          <p className="price">{formatPrice(product.price)}</p>
                          <p className="text-center">
                            <button
                              type="submit"
                              className="btn btn-template-outlined"
                              onClick={addToCartHandler}
                            >
                              <i className="fa fa-ticket" /> Register
                            </button>
                            <button
                              type="submit"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Add to wishlist"
                              className="btn btn-default"
                            >
                              <i className="fa fa-heart-o" />
                            </button>
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div id="details" className="box mb-4 mt-4">
                    <h6>{product.shortdescription}</h6>
                    <h4>About this event</h4>
                    <p>{product.description}</p>
                  </div>
                  <div
                    id="hostdetail"
                    className="box mb-4 mt-4 bg-primary no-mb color-white"
                  >
                    <p />
                    <h4>Your Host</h4>
                    <p><i className="fa fa-user-circle-o" aria-hidden="true"></i><span className="footer-host-detail">{product.hostname}</span></p>
                  </div>
                  <div
                    id="product-social"
                    className="box social text-center mb-5 mt-5"
                  >
                    <h4 className="heading-light">Show it to your friends</h4>
                    <ul className="social list-inline">
                      <li className="list-inline-item">
                        <a
                          href="#"
                          data-animate-hover="pulse"
                          className="external facebook"
                        >
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="#"
                          data-animate-hover="pulse"
                          className="external gplus"
                        >
                          <i className="fa fa-google-plus" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="#"
                          data-animate-hover="pulse"
                          className="external twitter"
                        >
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="#"
                          data-animate-hover="pulse"
                          className="email"
                        >
                          <i className="fa fa-envelope" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="panel panel-default sidebar-menu nav nav-pills">
                    <div className="panel-heading">
                      <h6 className="h6 panel-title">Category & Tag</h6>
                    </div>
                    <div className="panel-body">
                      {product.ecategoryids.map((eventDetail,index) => (
                        <span className="badge badge-secondary" key={index}>
                          {eventDetail}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="panel panel-default sidebar-menu">
                    <div className="panel-heading d-flex align-items-center justify-content-between">
                      <h6 className="h6 panel-title">
                        Ticket Cancellation Policy
                      </h6>
                    </div>
                    <div className="panel-body">
                      <p>{product.ticketCancellationPolicy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
