import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { truncateText, formatPrice } from "../helper";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  //cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  cart.totalPrice = cart.itemsPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  const listingredirect = (e) =>{
    props.history.push("/payment");
  }
  return (
    <>
      <div id="heading-breadcrumbs">
        <div className="container">
          <div className="row d-flex align-items-center flex-wrap">
            <div className="col-md-7">
              <h1 className="h2">Checkout - Order Review</h1>
            </div>
            <div className="col-md-5">
              <ul className="breadcrumb d-flex justify-content-end">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">Checkout - Order Review</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="content">
        <div className="container">
          <div className="row">
            <div id="checkout" className="col-lg-9">
              <div className="box">
                <form method="get" action="shop-checkout4.html">
                  <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                      <a href="shop-checkout3.html" className="nav-link">
                        <i className="fa fa-money" />
                        <br />
                        Payment Method
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="shop-checkout4.html" className="nav-link active">
                        <i className="fa fa-eye" />
                        <br />
                        Order Review
                      </a>
                    </li>
                  </ul>
                </form>
                <div className="content">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th colSpan={2}>Event</th>
                          <th>Ticket Quantity</th>
                          <th>Unit price</th>
                          <th>Discount</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.cartItems.map((item) => (
                          <tr>
                            <td>
                              <img
                                src={item.image}
                                alt={item.name}
                                className="img-fluid"
                              ></img>
                            </td>
                            <td>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </td>
                            <td>{item.qty}</td>
                            <td>{formatPrice(item.price)}</td>
                            <td>{formatPrice(0)}</td>
                            <td>{formatPrice(item.qty * item.price)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colSpan={5}>Total</th>
                          <th>{formatPrice(cart.totalPrice)}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div className="box-footer d-flex flex-wrap align-items-center justify-content-between">
                  <div className="left-col">
                    <button
                      type="button"
                      onClick={listingredirect}
                      className="btn btn-secondary mt-0"
                    >
                      <i className="fa fa-chevron-left" />
                      Back to payment method
                    </button>
                  </div>
                  <div className="right-col">
                    <button
                      type="submit"
                      className="btn btn-template-main"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Place the order
                      <i className="fa fa-chevron-right" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div id="order-summary" className="box mb-4 p-0">
                <div className="box-header mt-0">
                  <h3>Order summary</h3>
                </div>
                <p className="text-muted text-small">
                  Additional costs are calculated based on the values you have
                  entered.
                </p>
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Order subtotal</td>
                        <th>{formatPrice(cart.totalPrice)}</th>
                      </tr>
                      <tr>
                        <td>Tax</td>
                        <th>{formatPrice(0)}</th>
                      </tr>
                      <tr className="total">
                        <td>Total</td>
                        <th>{formatPrice(cart.totalPrice)}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
