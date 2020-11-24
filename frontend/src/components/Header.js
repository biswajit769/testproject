import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
import { getNameInitial } from "../helper";

export default function Header(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  const signoutHandler = () => {
    dispatch(signout());
  };
  useEffect(() => {
    if (userInfo) {
      //props.history.push(redirect);
    }
  }, [props.history, userInfo]);
  return (
    <>
      {/* Top bar*/}
      <div className="top-bar">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-md-6 d-md-block d-none">
              <p>Contact us on +912 777 555 333 or info@rkprd.com.</p>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-md-end justify-content-between">
                <ul className="list-inline contact-info d-block d-md-none">
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fa fa-phone" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fa fa-envelope" />
                    </a>
                  </li>
                </ul>
                {!userInfo ? (
                  <>
                    <div className="login"></div>
                  </>
                ) : (
                  <div className="login"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Top bar end*/}
      {/* Login Modal*/}
      <div
        id="login-modal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="login-modalLabel"
        aria-hidden="true"
        className="modal fade"
      >
        <div role="document" className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 id="login-modalLabel" className="modal-title">
                Customer Login
              </h4>
              <button
                type="button"
                data-dismiss="modal"
                aria-label="Close"
                className="close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <div className="modal-body">
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <input
                    id="email_modal"
                    type="text"
                    placeholder="email"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    id="password_modal"
                    type="password"
                    placeholder="password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <p className="text-center">
                  <button className="btn btn-template-outlined" type="submit">
                    <i className="fa fa-sign-in" /> Log in
                  </button>
                </p>
              </form>
              <p className="text-center text-muted">Not registered yet?</p>
              <p className="text-center text-muted">
                <a href="customer-register.html">
                  <strong>Register now</strong>
                </a>
                ! It is easy and done in 1&nbsp;minute and gives you access to
                special discounts and much more!
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Login modal end*/}
      {/* Navbar Start*/}
      <header className="nav-holder make-sticky">
        <div id="navbar" role="navigation" className="navbar navbar-expand-lg">
          <div className="container">
            <a href="/" className="navbar-brand home">
              <img
                src="/img/logo.png"
                alt="IndiaTalks"
                className="d-none d-md-inline-block"
              />
              <img
                src="/img/logo-small.png"
                alt="IndiaTalks"
                className="d-inline-block d-md-none"
              />
              <span className="sr-only">IndiaTalks - go to homepage</span>
            </a>
            <button
              type="button"
              data-toggle="collapse"
              data-target="#navigation"
              className="navbar-toggler btn-template-outlined"
            >
              <span className="sr-only">Toggle navigation</span>
              <i className="fa fa-align-justify" />
            </button>
            <div id="navigation" className="navbar-collapse collapse">
              {!userInfo && (
                <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item dropdown">
                    <Link to="/signin">Sign In</Link>
                  </li>
                  <li className="nav-item dropdown menu-large">
                    <Link to="/register">Sign up</Link>
                  </li>
                </ul>
              )}
              {userInfo && !userInfo.isAdmin && (
                <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item dropdown">
                    <Link to="/">All Events</Link>
                  </li>
                  <li className="nav-item dropdown menu-large">
                    <a href="#" data-toggle="dropdown">
                      Favorites
                    </a>
                  </li>
                  <li className="nav-item dropdown menu-large">
                    <Link to="/orderhistory">Tickets</Link>
                  </li>

                  <li className="nav-item dropdown">
                    <a
                      href="#"
                      data-toggle="dropdown"
                      className="dropdown-toggle"
                    >
                      <span className="badge badge-danger">
                        <i className="fa fa-user-circle-o" aria-hidden="true"></i>{" "}
                        {userInfo.name}
                      </span>{" "}
                      <b className="caret"></b>
                    </a>
                    <ul className="dropdown-menu">
                      {userInfo && userInfo.isHost && (
                        <>
                          <li className="dropdown-item">
                            <Link to="/eventslist" className="nav-link">
                              Host An Event
                            </Link>
                          </li>
                          <li className="dropdown-item">
                            <Link to="/hostorderhistory" className="nav-link">
                              Orders
                            </Link>
                          </li>
                        </>
                      )}
                      <li className="dropdown-item">
                        <Link
                          to="#signout"
                          className="nav-link"
                          onClick={signoutHandler}
                        >
                          Sign Out
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              )}
              {userInfo && userInfo.isAdmin && (
                <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item dropdown menu-large">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item dropdown menu-large">
                    <Link to="/productlist">Events</Link>
                  </li>
                  <li className="nav-item dropdown menu-large">
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li className="nav-item dropdown menu-large">
                    <Link to="/userlist">Users</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      href="javascript: void(0)"
                      data-toggle="dropdown"
                      className="dropdown-toggle"
                    >
                      <span className="badge badge-warning">
                        <i className="fa fa-user-circle-o" aria-hidden="true"></i>{" "}
                        {userInfo.name}
                      </span>{" "}
                      <b className="caret"></b>
                    </a>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item">
                        <Link
                          to="#signout"
                          className="nav-link"
                          onClick={signoutHandler}
                        >
                          Sign Out
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              )}
            </div>
            <div id="search" className="collapse clearfix">
              <form role="search" className="navbar-form">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search"
                    className="form-control"
                  />
                  <span className="input-group-btn">
                    <button type="submit" className="btn btn-template-main">
                      <i className="fa fa-search" />
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
