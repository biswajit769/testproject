import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import SocialButton from "../components/SocialButton";

export default function SigninScreen(props) {
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
  const handleSocialLogin = (user) => {
    console.log(user);
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  const onLogoutSuccess = () => {};

  const onLogoutFailure = (err) => {};

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <>
      <div id="heading-breadcrumbs">
        <div className="container">
          <div className="row d-flex align-items-center flex-wrap">
            <div className="col-md-7"></div>
            <div className="col-md-5">
              <ul className="breadcrumb d-flex justify-content-end">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">Login</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="box">
                <h2 className="text-uppercase">Login</h2>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="text"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-template-outlined">
                      <i className="fa fa-sign-in" /> Log in
                    </button>
                  </div>
                </form>
              </div>
              <div className="box">
                <div className="text-center">
                  <h5 className="text-uppercase">Or</h5>
                  <div className="social-buttons">
                    <SocialButton
                      provider="google"
                      appId="536856120798-rbn12413eseaplk39uj9tgc3akujpo0s.apps.googleusercontent.com"
                      onLoginSuccess={handleSocialLogin}
                      onLoginFailure={handleSocialLoginFailure}
                      onLogoutSuccess={onLogoutSuccess}
                      onLogoutFailure={onLogoutFailure}
                      className="btn btn-google "
                    >
                      <i className="fa fa-google rightpad" />
                      Login with Google
                    </SocialButton>
                  </div>
                  <div className="social-buttons">
                    <SocialButton
                      provider="facebook"
                      appId="4985844028100127"
                      onLoginSuccess={handleSocialLogin}
                      onLoginFailure={handleSocialLoginFailure}
                      onLogoutSuccess={onLogoutSuccess}
                      className="btn btn-facebook"
                    >
                      <i className="fa fa-facebook rightpad" />
                      Login with Facebook
                    </SocialButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
