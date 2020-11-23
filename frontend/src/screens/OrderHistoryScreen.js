import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { truncateText, formatPrice, formatDate } from "../helper";
import Ticket from "../components/Ticket";
import { Link } from "react-router-dom";

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
              <div className="col-md-9">
              {orders.map((order) => (
                <Ticket key={order._id}
                order={order}></Ticket>
              ))}
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
                        <Link className="nav-link active" to={`/orderhistory`}>My orders</Link>
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
