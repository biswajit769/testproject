import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { truncateText, formatPrice } from "../helper";
import { createOrder } from "../actions/orderActions";
//import razorpay from '../components/RazorPay';

const RECEIPT_ID = 'rcptid_11';
const CURRENCY = 'INR';
const SECRET_KEY = 'rzp_test_eFGdVzlMuucOUS'
const MERCHANT_NAME = 'IndiaTalks Pvt Ltd.'
const API_HOST = 'https://subscrip.rkprd.com/api/v1';

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const { shippingAddress } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  //const { cartItems, shipping, payment } = cart;
  if (!shippingAddress.address) {
    //props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const dispatch = useDispatch();
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  if(cart && cart.cartItems.length > 0){
    cart.hostId = cart.cartItems[0].hostuserid;
    cart.hdate = cart.cartItems[0].hdate;
  }
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(0);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.taxPrice;
  const responseHandler = (response) => {
    //props.history.push("/orderplaced");
    //success scenario.
    if(response.razorpay_payment_id && response.razorpay_order_id && response.razorpay_signature){
      verifyOrderStatus(userInfo.email,response,30)
      .then(isValidOrder => {
        if(isValidOrder.status === 'Success'){
          cart.isPaid = true;
          dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
          props.history.push("/orderplaced");
        }else{

        }
      })
    }else if(response.error !== undefined){
    //error scenario
    }

  };

  let header = new Headers({
    'Content-Type': 'application/json'
});

  const addScriptDynamic = (billamount,orderid,billdescription) => {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = function () {
      callFunctionFromScript(billamount,orderid,billdescription);
    };
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    head.appendChild(script);
  };

  async function verifyOrderStatus(emailId, orderitem, days) {
    let _data = {
      user: emailId,
      days: parseInt(days),
      razorpay_payment_id: orderitem.razorpay_payment_id,
      razorpay_order_id: orderitem.razorpay_order_id,
      razorpay_signature: orderitem.razorpay_signature,
    };
    const orderstatus = await fetch(`${API_HOST}/verify`, {
      method: "POST",
      body: JSON.stringify(_data),
      headers: header,
      mode: "cors",
    }); // Execution stops here until fetch promise is fulfilled.
    const cnforderstatus = await orderstatus.json();
    return cnforderstatus; // equivalent of resolving the getGithubUser promise with user value.
  }

  async function getOrderDetail(amount,emailId){
    let _data = {
        user: emailId,
        amount: amount
    }
    const orderResponse = await fetch(`${API_HOST}/create`, {
        method: "POST",
        body: JSON.stringify(_data),
        headers: header,
        mode: 'cors'
    }); // Execution stops here until fetch promise is fulfilled.
    const orderDetail = await orderResponse.json();
    return orderDetail; // equivalent of resolving the getGithubUser promise with user value.*/
}

  function callFunctionFromScript(billamount,orderid,billdescription) {
    let options = {
      key: SECRET_KEY,
      amount: billamount, // Example: 2000 paise = INR 20
      name: MERCHANT_NAME,
      description: billdescription,
      order_id: orderid,
      image: "img/logo.png", // COMPANY LOGO
      handler: responseHandler,
      prefill: {
        name: userInfo.name, // pass customer name
        email: userInfo.email, // customer email
        contact: "+919123456780", //customer phone no.
      },
      notes: {
        address: "address", //customer address
      },
      theme: {
        color: "#4fbfa8", // screen color
      },
    };
    let propay = new window.Razorpay(options);
    propay.open();
    propay.on("payment.failed", responseHandler);
  }
  //cart.totalPrice = cart.itemsPrice;
  const submitHandler = (e) => {
    e.preventDefault();
    //addScriptDynamic();
    const billamount = cart.totalPrice;
    let billdescription = "Purchase the event ticket";
    if(cart.cartItems.length>0){
      billdescription = cart.cartItems[0].name;
    }
    //dispatch(createOrder({ ...cart, orderItems: cart.cartItems })); // remove this line
    getOrderDetail(billamount,userInfo.email)
    .then((orderItem)=>{
      addScriptDynamic(billamount,orderItem.id,billdescription);
    })
    //let propay = new Razorpay(options);
    //propay.open();

    //dispatch(savePaymentMethod(paymentMethod));
    //props.history.push("/placeorder");
    //dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  const submitHandler1 = (e) => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  }
  const listingredirect = (e) => {
    props.history.push("/");
  };
  return (
    <>
      <div id="heading-breadcrumbs">
        <div className="container">
          <div className="row d-flex align-items-center flex-wrap">
            <div className="col-md-7">
              <h1 className="h2">Checkout - Payment Mehod</h1>
            </div>
            <div className="col-md-5">
              <ul className="breadcrumb d-flex justify-content-end">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">
                  Checkout - Payment Mehod
                </li>
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
                <form onSubmit={submitHandler}>
                  <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                      <a href="shop-checkout3.html" className="nav-link active">
                        <i className="fa fa-money" />
                        <br />
                        Payment Method
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link disabled">
                        <i className="fa fa-eye" />
                        <br />
                        Order Review
                      </a>
                    </li>
                  </ul>
                  <div className="content">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="box payment-method">
                          <h4>Razorpay</h4>
                          <p>Easy to pay.</p>
                          <div className="box-footer text-center">
                            <input
                              type="radio"
                              id="razorpay"
                              value="Razorpay"
                              name="paymentMethod"
                              required
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        &nbsp;
                      </div>
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
                        Continue event selection
                      </button>
                    </div>
                    <div className="right-col">
                      <button type="submit" className="btn btn-template-main" disabled={cart.cartItems.length === 0}>
                        Checkout
                        <i className="fa fa-chevron-right" />
                      </button>
                    </div>
                  </div>
                </form>
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
    </>
  );
}
