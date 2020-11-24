import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin, socialMediaSignin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login';

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
  
  const responseGoogle = (res) => {
    if(res.error){
      const googleerror = res.error;
    }
    const googleresponse = {
      name: res.profileObj.name,
      email: res.profileObj.email,
      token: res.googleId,
      image: res.profileObj.imageUrl,
      providerid: "google",
      accesstoken:res.accessToken
    };
    dispatch(signin(res.profileObj.email,res.googleId,googleresponse));
  };

  const responseFacebook = (res) =>{
    const facebookresponse = {
      name: res.name,
      email: res.email,
      token: res.userID,
      image: res.picture.data.url,
      providerid: "facebook",
      accesstoken:res.accessToken
    };
    dispatch(signin(res.email,res.userID,facebookresponse));
  }

  const componentClicked = (res) =>{
    console.log("facebook clicked",res);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password,{}));
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
                    <GoogleLogin
                      clientId="536856120798-ukvkr4sc1m69psq26mi14q0nhmb3vq35.apps.googleusercontent.com"
                      buttonText="Login with Google"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                    ></GoogleLogin>
                  </div>
                  <div className="social-buttons">
                    <FacebookLogin
                      appId="4985844028100127"
                      autoLoad={false}
                      fields="name,email,picture"
                      onClick={componentClicked}
                      callback={responseFacebook}
                    />
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
