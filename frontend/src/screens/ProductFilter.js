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
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  //const category = sectiontype;
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchParentCategory, setSearchParentCategory] = useState("");
  const [searchTaggedCategory, setSearchTaggedCategory] = useState("");
  const [searchPrice, setSearchPrice] = useState("");
  const [searchByDate, setSearchByDate] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const { loading, error, products } = productList;
  let newerror = '';
  if(products && products.length===0){
    newerror = 'No Event Found';
  }
  useEffect(() => {
    if(!searchParentCategory){
      setSearchParentCategory(sectiontype);
    }
    dispatch(listProducts(searchTaggedCategory, "", "", searchParentCategory,"","",searchPrice));

    return () => {
      //
    };
  }, [searchTaggedCategory,searchParentCategory,searchPrice,searchByDate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts('',searchKeyword));
  };

  const setEventCategory = (e) => {
    const selectedVal = (e.target.value === 'all')?'':btoa(e.target.value);
    setSearchTaggedCategory(selectedVal);
  }
  
  const setEventParentCategory = (e) =>{
    const selectedVal = (e.target.value === 'all')?'':e.target.value;
    setSearchParentCategory(selectedVal);
  }

  const setEventDate = (e) =>{
    const selectedVal = (e.target.value === 'all')?'':e.target.value;
    setSearchByDate(selectedVal);
  }

  const setEventPrice = (e) => {
    const selectedVal = (e.target.value === 'all')?'':e.target.value;
    setSearchPrice(selectedVal)
  }
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
                          <input type="radio" name="eventdate" value="all" onChange={setEventDate}/> Any date
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="radio" name="eventdate" value="today" onChange={setEventDate}/> Today
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="radio" name="eventdate" value="tomorrow" onChange={setEventDate}/> Tomorrow
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="radio" name="eventdate" value="weekend" onChange={setEventDate}/> This weekend
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
                          <input type="radio" name="eventcategories" value="all" onChange={setEventCategory}/> All
                        </label>
                      </div>
                      {eventCategories &&
                        eventCategories.map((category, index) => (
                          <div className="checkbox" key={index}>
                            <label>
                              <input type="radio" name="eventcategories" value={category.title} onChange={setEventCategory}/> {category.title}
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
                          <input type="radio" name="ticketprice" value="all" onChange={setEventPrice}/> All tickets (free and paid)
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="radio" name="ticketprice" value="free" onChange={setEventPrice}/> Free
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="radio" name="ticketprice" value="paid" onChange={setEventPrice}/> Paid
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
                          <input type="radio" value="all" name="parentcategories" onChange={setEventParentCategory}/> All
                        </label>
                      </div>
                      {parentCategories &&
                        parentCategories.map((category, index) => (
                          <div className="checkbox" key={index}>
                            <label>
                              <input type="radio" value={category.title} name="parentcategories" onChange={setEventParentCategory}/> {category.title}
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
                <>
                  {newerror && (
                    <MessageBox variant="danger">{newerror}</MessageBox>
                  )}
                  <div className="form-group has-search">
                    <form onSubmit={submitHandler}>
                    <span className="fa fa-search form-control-feedback" />
                    <input
                      type="text"
                      className="form-control shadow bg-white rounded searchbar"
                      placeholder="Search"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    </form>
                  </div>
                  {products.map((product) => (
                    <ProductWithFilter
                      key={product._id}
                      product={product}
                    ></ProductWithFilter>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
