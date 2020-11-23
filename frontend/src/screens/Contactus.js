import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin, socialMediaSignin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function Contactus(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oauthlogin, setOauthlogin] = useState({
    logged: false,
    user: {},
    currentProvider: "",
  });

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const responseGoogle = (res) => {
    console.log("google reponse", res);
    if (res.error) {
      const googleerror = res.error;
    }
    const googleresponse = {
      name: res.profileObj.name,
      email: res.profileObj.email,
      token: res.googleId,
      image: res.profileObj.imageUrl,
      providerid: "google",
      accesstoken: res.accessToken,
    };
    dispatch(signin(res.profileObj.email, res.googleId, googleresponse));
  };

  const responseFacebook = (res) => {
    const facebookresponse = {
      name: res.name,
      email: res.email,
      token: res.userID,
      image: res.picture.data.url,
      providerid: "facebook",
      accesstoken: res.accessToken,
    };
    dispatch(signin(res.email, res.userID, facebookresponse));
  };

  const componentClicked = (res) => {
    console.log("facebook clicked", res);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password, {}));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <>
      <div id="heading-breadcrumbs" className="brder-top-0 border-bottom-0">
        <div className="container">
          <div className="row d-flex align-items-center flex-wrap">
            <div className="col-md-7">
              <h1 className="h2">Contact</h1>
            </div>
            <div className="col-md-5">
              <ul className="breadcrumb d-flex justify-content-end">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="content">
        <div id="contact" className="container">
          <div className="row">
            <div className="col-lg-8">
              <section className="bar">
                <div className="heading">
                  <h2>We are here to help you</h2>
                </div>
                <p className="lead">
                We operate in an industry built on trust. This can only be achieved through communication and experienced support.
                </p>
                <p className="text-sm">
                  Please feel free to contact us, our customer service center is
                  working for you 24/7.
                </p>
                <div className="heading">
                  <h3>Contact form</h3>
                </div>
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="firstname">Firstname</label>
                        <input
                          id="firstname"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="lastname">Lastname</label>
                        <input
                          id="lastname"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                          id="subject"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                          id="message"
                          className="form-control"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-template-outlined"
                      >
                        <i className="fa fa-envelope-o" /> Send message
                      </button>
                    </div>
                  </div>
                </form>
              </section>
            </div>
            <div className="col-lg-4">
              <section className="bar mb-0">
                <h3 className="text-uppercase">Address</h3>
                <p className="text-sm">
                  INDIATALKS PVT LTD
                  <br />
                  FUTURA, MAGARPATTA RD
                  <br />
                  PUNE, MAHARASHTRA
                  <br />
                  411028
                  <br />
                  <strong>India</strong>
                </p>
                <h3 className="text-uppercase">Call center</h3>
                <p className="text-muted text-sm">
                  This number is toll free if calling from Great Britain
                  otherwise we advise you to use the electronic form of
                  communication.
                </p>
                <p>
                  <strong>+91 123 456 789</strong>
                </p>
                <h3 className="text-uppercase">Electronic support</h3>
                <p className="text-muted text-sm">
                  Please feel free to write an email to us or to use our
                  electronic ticketing system.
                </p>
                <ul className="text-sm">
                  <li>
                    <strong>
                      <a href="mailto:">info@rkprd.com</a>
                    </strong>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
