import React, { useEffect, useState } from "react";

import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import HeaderBanner from "../components/HeaderBanner";
import EventSection from "../components/EventSection";
import { Link } from "react-router-dom";
import ProductWithFilter from "../components/ProductWithFilter";
import {
  truncateText,
  formatPrice,
  eventCategories,
  parentCategories,
} from "../helper";

export default function ProductFilter(props) {
  const sectiontype = props.match.params.sectiontype;
  //console.log("section type====", sectiontype);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const category = sectiontype;
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);
  return (
    <>
      <div id="heading-breadcrumbs">
        <div className="container">
          <div className="row d-flex align-items-center flex-wrap">
            <div className="col-md-7">
              <h1 className="h2">Filter</h1>
            </div>
            <div className="col-md-5">
              <ul className="breadcrumb d-flex justify-content-end">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">Filter</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="content">
        <div className="container">
          <div className="row bar">
            <div className="col-md-3 customfilter">
              {/* MENUS AND FILTERS*/}
              <div className="panel panel-default sidebar-menu">
                <div className="panel-heading d-flex align-items-center justify-content-between">
                  <h5 className="h5 panel-title">Date</h5>
                </div>
                <div className="panel-body">
                  <form>
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input type="radio" /> Any date
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="radio" /> Today
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="radio" /> Tomorrow
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="radio" /> This weekend
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="panel panel-default sidebar-menu">
                <div className="panel-heading d-flex align-items-center justify-content-between">
                  <h5 className="h5 panel-title">Categories</h5>
                </div>
                <div className="panel-body">
                  <form>
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input type="radio" /> All
                        </label>
                      </div>
                      {eventCategories &&
                        eventCategories.map((category) => (
                          <div className="checkbox">
                            <label>
                              <input type="radio" /> {category.title}
                            </label>
                          </div>
                        ))}
                    </div>
                  </form>
                </div>
              </div>
              <div className="panel panel-default sidebar-menu">
                <div className="panel-heading d-flex align-items-center justify-content-between">
                  <h5 className="h5 panel-title">Price</h5>
                </div>
                <div className="panel-body">
                  <form>
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input type="radio" /> All tickets (free and paid)
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="radio" /> Free
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="radio" /> Paid
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="panel panel-default sidebar-menu">
                <div className="panel-heading d-flex align-items-center justify-content-between">
                  <h5 className="h5 panel-title">Type</h5>
                </div>
                <div className="panel-body">
                  <form>
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <input type="radio" /> All
                        </label>
                      </div>
                      {parentCategories &&
                        parentCategories.map((category) => (
                          <div className="checkbox">
                            <label>
                              <input type="radio" /> {category.title}
                            </label>
                          </div>
                        ))}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-9">
                {loading ? (
                  <LoadingBox></LoadingBox>
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                  products.map((product) => (
                    <ProductWithFilter
                      key={product._id}
                      product={product}
                    ></ProductWithFilter>
                  ))
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
