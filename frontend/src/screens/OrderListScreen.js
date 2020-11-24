import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, listOrders } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELETE_RESET } from "../constants/orderConstants";
import { truncateText, formatPrice, formatDate } from "../helper";

export default function OrderListScreen(props) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders());
  }, [dispatch, successDelete]);
  const deleteHandler = (order) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(order._id));
    }
  };
  return (
    <>
      <div id="heading-breadcrumbs">
        <div className="container">
          <div className="row d-flex align-items-center flex-wrap">
            <div className="col-md-7">
              <h1 className="h2">Orders</h1>
            </div>
            <div className="col-md-5">
              <ul className="breadcrumb d-flex justify-content-end">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">Orders</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div id="content">
          <div className="container">
            <div className="row bar mb-0">
              <div id="customer-orders" className="col-md-12">
                <div className="box mt-0 mb-lg-0">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Order</th>
                          <th>User</th>
                          <th>Date</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order._id}>
                            <th># {order._id}</th>
                            <td>{order.user && order.user.name?(
                  <span>{order.user.name}</span>
                ):'No user name'}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{formatPrice(order.totalPrice)}</td>
                            <td>
                              {order.isPaid ? (
                                <>
                                  <span className="badge badge-success">
                                    Paid
                                  </span>
                                </>
                              ) : (
                                <span className="badge badge-info">
                                  Payment Pending
                                </span>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
