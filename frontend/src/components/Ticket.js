import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { truncateText, formatPrice, formatDate, getMonthInit } from "../helper";

export default function Ticket(props) {
  const { order } = props;
  console.log("order detail====",order);
  let dateStr = new Date(order.hdate);

  return (
    <section className="custombar no-mb text-md-center bg-white">
      <div className="container">
        <div className="row product customize listview ticketlist">
          <div className="col-md-2 text-center ticketleft">
            <div className="text listitems">
              <h5 className="h5 producth5">
                <a href="">{dateStr.getDate()}</a>
              </h5>
              <p className="author-category">{getMonthInit(dateStr.getMonth())}</p>
            </div>
          </div>
          <div className="col-md-4 text-center imageholder">
            <div className="image">
              <a href="">
                <img
                  src={order.orderItems[0].image}
                  alt={order.orderItems[0].name}
                  className="rounded img-fluid"
                />
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="text listitems">
              <h5 className="h5 producth5">
                <Link className="external" to={`/order/${order._id}`}>{order.orderItems[0].name}</Link>
              </h5>
              <p className="intro">
              <i className="fa fa-clock-o" aria-hidden="true"></i>
                    {" "}<span className="event-date">
                    {formatDate(order.hdate)}
                    </span>
              </p>
              <p className="author-category"><i class="fa fa-ticket" aria-hidden="true"></i> {order.orderItems[0].name} Ticket</p>
              <p className="author-category">
                <Link className="external" to={`/order/${order._id}`}>View Order</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
