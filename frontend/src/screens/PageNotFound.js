import React, { useEffect } from "react";

import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import HeaderBanner from "../components/HeaderBanner";
import EventSection from "../components/EventSection";
import { Link } from "react-router-dom";
import ProductWithFilter from "../components/ProductWithFilter";
import { truncateText, formatPrice } from "../helper";

export default function PageNotFound(props) {
  const sectiontype = props.match.params.sectiontype;
  console.log("section type====", sectiontype);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <>
      <div id="heading-breadcrumbs">
        <div className="container">
          <div className="row d-flex align-items-center flex-wrap">
            <div className="col-md-7">
              <h1 className="h2">404 Page Not Found</h1>
            </div>
            <div className="col-md-5">
              <ul className="breadcrumb d-flex justify-content-end">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">404 Page Not Found</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="content">
        <div className="container">
          <div className="row bar">
            {/* LEFT COLUMN _________________________________________________________*/}
            <div className="col-lg-9">
              <p>The event is not found</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
