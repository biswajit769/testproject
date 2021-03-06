import React from "react";
import { Link } from "react-router-dom";
export default function Header(props) {
  return (
    <footer className="main-footer newbar bg-gray mb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <h4 className="h6">About Us</h4>
              <p>
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas.
              </p>
              <hr />
              <h4 className="h6">Join Our Monthly Newsletter</h4>
              <form>
                <div className="input-group">
                  <input type="text" className="form-control" />
                  <div className="input-group-append">
                    <button type="button" className="btn btn-secondary">
                      <i className="fa fa-send" />
                    </button>
                  </div>
                </div>
              </form>
              <hr className="d-block d-lg-none" />
            </div>
            <div className="col-lg-3">
              <h4 className="h6">Blog</h4>
              <ul className="list-unstyled footer-blog-list">
                <li className="d-flex align-items-center">
                  <div className="image">
                    <img
                      src="/img/detailsquare.jpg"
                      alt="..."
                      className="img-fluid"
                    />
                  </div>
                  <div className="text">
                    <h5 className="mb-0">
                      {" "}
                      <a href="post.html">Blog post name</a>
                    </h5>
                  </div>
                </li>
                <li className="d-flex align-items-center">
                  <div className="image">
                    <img
                      src="/img/detailsquare.jpg"
                      alt="..."
                      className="img-fluid"
                    />
                  </div>
                  <div className="text">
                    <h5 className="mb-0">
                      {" "}
                      <a href="post.html">Blog post name</a>
                    </h5>
                  </div>
                </li>
                <li className="d-flex align-items-center">
                  <div className="image">
                    <img
                      src="/img/detailsquare.jpg"
                      alt="..."
                      className="img-fluid"
                    />
                  </div>
                  <div className="text">
                    <h5 className="mb-0">
                      {" "}
                      <a href="post.html">Very very long blog post name</a>
                    </h5>
                  </div>
                </li>
              </ul>
              <hr className="d-block d-lg-none" />
            </div>
            <div className="col-lg-3">
              <h4 className="h6">Contact</h4>
              <p className="text-uppercase">
                <strong>IndiaTalks Pvt Ltd.</strong>
                <br />
                Futura, Magarpatta Rd <br />
                Pune, Maharashtra <br />
                411028 <br />
                India <br />
              </p>
              <Link className="btn btn-template-main" to="/contact">Go to contact page</Link>
              <hr className="d-block d-lg-none" />
            </div>
            <div className="col-lg-3">
              <ul className="list-inline photo-stream">
                <li className="list-inline-item">
                  <a href="#">
                    <img
                      src="/img/detailsquare.jpg"
                      alt="..."
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <img
                      src="/img/detailsquare2.jpg"
                      alt="..."
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <img
                      src="/img/detailsquare3.jpg"
                      alt="..."
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <img
                      src="/img/detailsquare3.jpg"
                      alt="..."
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <img
                      src="/img/detailsquare2.jpg"
                      alt="..."
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <img
                      src="/img/detailsquare.jpg"
                      alt="..."
                      className="img-fluid"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyrights">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 text-center-md">
                <p>© 2020. rkprd.com</p>
              </div>
              <div className="col-lg-8 text-right text-center-md">
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}
