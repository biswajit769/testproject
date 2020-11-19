import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { truncateText, formatPrice,formatDate } from "../helper";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  console.log("my order===",orderDetails);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <>
    <div id="heading-breadcrumbs">
  <div className="container">
    <div className="row d-flex align-items-center flex-wrap">
      <div className="col-md-7">
        <h1 className="h2">Order #{order._id}</h1>
      </div>
      <div className="col-md-5">
        <ul className="breadcrumb d-flex justify-content-end">
          <li className="breadcrumb-item"><a href="index.html">Home</a></li>
          <li className="breadcrumb-item"><a href="/orderhistory">My Orders</a></li>
          <li className="breadcrumb-item active">Order #{order._id}</li>
        </ul>
      </div>
    </div>
  </div>
</div>
<div id="content">
  <div className="container">
    <div className="row bar">
      <div id="customer-order" className="col-lg-9">
  <p className="lead">Order #{order._id} was placed on <strong>{order.createdAt.substring(0, 10)}</strong> and is currently <strong>{order.isPaid ? (
                              <>
                                <span>Ticket Has Mailed</span>
                              </>
                            ) : (
                              <span>Payment Pending</span>
                            )}</strong>.</p>
        <p className="lead text-muted">If you have any questions, please feel free to <a href="contact.html">contact us</a>, our customer service center is working for you 24/7.</p>
        <div className="box">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th colSpan={2} className="border-top-0">Ticket</th>
                  <th className="border-top-0">Quantity</th>
                  <th className="border-top-0">Unit price</th>
                  <th className="border-top-0">Discount</th>
                  <th className="border-top-0">Total</th>
                </tr>
              </thead>
              <tbody>
              {order.orderItems.map((item) => (
                <tr key={item._id}>
                  <td><a href="#"><img src={item.image}
                            alt={item.name} className="img-fluid" /></a></td>
                            <td><Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link></td>
                          <td>{item.qty}</td>
                          <td>{formatPrice(item.price)}</td>
              <td>{formatPrice(0)}</td>
              <td>{formatPrice(item.qty * item.price)}</td>
                </tr>
              ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={5} className="text-right">Order subtotal</th>
                  <th>{formatPrice(order.itemsPrice)}</th>
                </tr>
                <tr>
                  <th colSpan={5} className="text-right">Tax</th>
                  <th>{formatPrice(order.taxPrice)}</th>
                </tr>
                <tr>
                  <th colSpan={5} className="text-right">Total</th>
                  <th>{formatPrice(order.totalPrice)}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div className="col-lg-3 mt-4 mt-lg-0">
        {/* CUSTOMER MENU */}
        <div className="panel panel-default sidebar-menu">
          <div className="panel-heading">
            <h3 className="h4 panel-title">Customer section</h3>
          </div>
          <div className="panel-body">
            <ul className="nav nav-pills flex-column text-sm">
              <li className="nav-item"><a href="customer-orders.html" className="nav-link active"><i className="fa fa-list" /> My orders</a></li>
              <li className="nav-item"><a href="customer-wishlist.html" className="nav-link"><i className="fa fa-heart" /> My wishlist</a></li>
              <li className="nav-item"><a href="customer-account.html" className="nav-link"><i className="fa fa-user" /> My account</a></li>
              <li className="nav-item"><a href="index.html" className="nav-link"><i className="fa fa-sign-out" /> Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
