import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { truncateText, formatPrice,formatDate } from "../helper";

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <>
      <div id="heading-breadcrumbs">
        <div className="container">
          <div className="row d-flex align-items-center flex-wrap">
            <div className="col-md-7">
              <h1 className="h2">My Tickets</h1>
            </div>
            <div className="col-md-5">
              <ul className="breadcrumb d-flex justify-content-end">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">My Tickets</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div id="content">
        <div className="container">
          <div className="row bar mb-0">
            <div id="customer-orders" className="col-md-9">
              <p className="text-muted lead">
                If you have any questions, please feel free to{" "}
                <a href="contact.html">contact us</a>, our customer service
                center is working for you 24/7.
              </p>
              <div className="box mt-0 mb-lg-0">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Ticket Id</th>
                        <th>Date of Purchase</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createdAt.substring(0, 10)}</td>
                          <td>{formatPrice(order.totalPrice)}</td>
                          <td>
                            {order.isPaid ? (
                              <>
                                <span className="badge badge-success">
                                  {order.paidAt.substring(0, 10)}
                                </span>
                              </>
                            ) : (
                              <span className="badge badge-info">Payment Pending</span>
                            )}
                          </td>
                          <td>
                            <button
                    type="button"
                    className="btn btn-template-outlined btn-sm"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    View
                  </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-4 mt-md-0">
              {/* CUSTOMER MENU */}
              <div className="panel panel-default sidebar-menu">
                <div className="panel-heading">
                  <h3 className="h4 panel-title">Customer section</h3>
                </div>
                <div className="panel-body">
                  <ul className="nav nav-pills flex-column text-sm">
                    <li className="nav-item">
                      <a
                        href="customer-orders.html"
                        className="nav-link active"
                      >
                        <i className="fa fa-list" /> My orders
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="customer-wishlist.html" className="nav-link">
                        <i className="fa fa-heart" /> My wishlist
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="customer-account.html" className="nav-link">
                        <i className="fa fa-user" /> My account
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="index.html" className="nav-link">
                        <i className="fa fa-sign-out" /> Logout
                      </a>
                    </li>
                  </ul>
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
