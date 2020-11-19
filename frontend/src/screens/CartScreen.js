import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import { truncateText, formatPrice } from "../helper";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.taxPrice;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const listingredirect = (e) =>{
    props.history.push("/");
  }

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=payment");
  };
  return (
    <>
      <div id="heading-breadcrumbs">
        <div className="container">
          <div className="row d-flex align-items-center flex-wrap">
            <div className="col-md-7">
              <h1 className="h2">Register</h1>
            </div>
            <div className="col-md-5">
              <ul className="breadcrumb d-flex justify-content-end">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">Register</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {cartItems.length === 0 ? (
        <MessageBox>
          You have not selected any Event.{" "}
          <Link to="/">Go for Event selection</Link>
        </MessageBox>
      ) : (
        <div id="content">
          <div className="container">
            <div className="row bar">
              <div className="col-lg-12">
                <p className="text-muted lead">
                  Yo have selected {cartItems.length} event(s).
                </p>
              </div>
              <div id="basket" className="col-lg-9">
                <div className="box mt-0 pb-0 no-horizontal-padding">
                  <form method="get" action="shop-checkout1.html">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th colSpan={2}>Event</th>
                            <th>Ticket Quantity</th>
                            <th>Unit price</th>
                            <th>Discount</th>
                            <th colSpan={2}>&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item) => (
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
                              <td>
                                <select
                                  value={item.qty}
                                  onChange={(e) =>
                                    dispatch(
                                      addToCart(
                                        item.product,
                                        Number(e.target.value)
                                      )
                                    )
                                  }
                                >
                                  {[...Array(item.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </select>
                              </td>
                              <td>{formatPrice(item.price)}</td>
                              <td>{formatPrice(0)}</td>
                              <td>
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeFromCartHandler(item.product)
                                  }
                                  className="btn btn-sm btn-danger"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colSpan={5}>Total</th>
                            <th colSpan={2}>{formatPrice(cartItems.reduce((a, c) => a + c.price * c.qty, 0))}</th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div className="box-footer d-flex justify-content-between align-items-center">
                      <div className="left-col">
                        <button type="button" onClick={listingredirect} className="btn btn-secondary mt-0"><i className="fa fa-chevron-left"></i>Continue event selection</button>
                      </div>
                      <div className="right-col">
                        <button
                          type="submit"
                          className="btn btn-template-outlined"
                          onClick={checkoutHandler}
                          disabled={cartItems.length === 0}
                        >
                          Proceed to checkout{" "}
                          <i className="fa fa-chevron-right" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-3">
                <div id="order-summary" className="box mt-0 mb-4 p-0">
                  <div className="box-header mt-0">
                    <h3>Order summary</h3>
                  </div>
                  <p className="text-muted">
                    Additional costs are calculated based on the
                    values you have entered.
                  </p>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>Order subtotal</td>
                          <th>{formatPrice(cart.itemsPrice)}</th>
                        </tr>
                        <tr>
                          <td>Tax</td>
                          <th>{formatPrice(cart.taxPrice)}</th>
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
      )}
    </>
  );
}
